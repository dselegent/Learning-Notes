---
article: false
title: Cloudflare
icon: proxy
order: 4
---

官方文档：[Cloudflare Docs](https://developers.cloudflare.com/)

Cloudflare 云端代理后，能帮加速国内访问国外网站的速度。比如，notion 的个人博客用 Cloudflare 代理，原本速度很慢，使用 Cloudflare 后加速明显。

但 Cloudflare 免费计划不支持单独子域名托管，需要完整域名托管。

## 反向代理

Cloudflare Workers 反向代理不适合 google 和 cloudflare cdn 网站，其他网站大都可以。

### 镜像整个网站

```javascript
// 替换成你想镜像的站点
const upstream = "www.youtube.com";

// 如果那个站点有专门的移动适配站点，否则保持和上面一致
const upstream_mobile = "www.youtube.com";

// 你希望禁止哪些国家访问
const blocked_region = ["RU"];

// 禁止自访问
const blocked_ip_address = ["0.0.0.0", "127.0.0.1"];

// 替换成你想镜像的站点
const replace_dict = {
  $upstream: "$custom_domain",
  "//www.youtube.com": "",
};

//以下内容都不用动
addEventListener("fetch", (event) => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  const region = request.headers.get("cf-ipcountry").toUpperCase();
  const ip_address = request.headers.get("cf-connecting-ip");
  const user_agent = request.headers.get("user-agent");

  let response = null;
  let url = new URL(request.url);
  let url_host = url.host;

  if (url.protocol == "http:") {
    url.protocol = "https:";
    response = Response.redirect(url.href);
    return response;
  }

  if (await device_status(user_agent)) {
    upstream_domain = upstream;
  } else {
    upstream_domain = upstream_mobile;
  }

  url.host = upstream_domain;

  if (blocked_region.includes(region)) {
    response = new Response(
      "Access denied: WorkersProxy is not available in your region yet.",
      {
        status: 403,
      }
    );
  } else if (blocked_ip_address.includes(ip_address)) {
    response = new Response(
      "Access denied: Your IP address is blocked by WorkersProxy.",
      {
        status: 403,
      }
    );
  } else {
    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set("Host", upstream_domain);
    new_request_headers.set("Referer", url.href);

    let original_response = await fetch(url.href, {
      method: method,
      headers: new_request_headers,
    });

    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set("access-control-allow-origin", "*");
    new_response_headers.set("access-control-allow-credentials", true);
    new_response_headers.delete("content-security-policy");
    new_response_headers.delete("content-security-policy-report-only");
    new_response_headers.delete("clear-site-data");

    const content_type = new_response_headers.get("content-type");
    if (content_type.includes("text/html") && content_type.includes("UTF-8")) {
      original_text = await replace_response_text(
        original_response_clone,
        upstream_domain,
        url_host
      );
    } else {
      original_text = original_response_clone.body;
    }

    response = new Response(original_text, {
      status,
      headers: new_response_headers,
    });
  }
  return response;
}

async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text();

  var i, j;
  for (i in replace_dict) {
    j = replace_dict[i];
    if (i == "$upstream") {
      i = upstream_domain;
    } else if (i == "$custom_domain") {
      i = host_name;
    }

    if (j == "$upstream") {
      j = upstream_domain;
    } else if (j == "$custom_domain") {
      j = host_name;
    }

    let re = new RegExp(i, "g");
    text = text.replace(re, j);
  }
  return text;
}

async function device_status(user_agent_info) {
  var agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = true;
  for (var v = 0; v < agents.length; v++) {
    if (user_agent_info.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
```

### 镜像网站指定目录

```javascript
// 你要镜像的网站。
const upstream = "objectstorage.ap-seoul-1.oraclecloud.com";

// 镜像网站的目录，比如你想镜像某个网站的二级目录则填写二级目录的目录名，镜像 google 用不到，默认即可。
const upstream_path = "/test/";

// 镜像站是否有手机访问专用网址，没有则填一样的。
const upstream_mobile = "objectstorage.ap-seoul-1.oraclecloud.com";

// 屏蔽国家和地区。
const blocked_region = [""];

// 屏蔽 IP 地址。
const blocked_ip_address = ["0.0.0.0", "127.0.0.1"];

// 镜像站是否开启 HTTPS.
const https = true;

// 文本替换。填你要镜像的网站
const replace_dict = {
  $upstream: "$custom_domain",
  "//objectstorage.ap-seoul-1.oraclecloud.com": "",
};

// 以下保持默认，不要动
addEventListener("fetch", (event) => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  const region = request.headers.get("cf-ipcountry").toUpperCase();
  const ip_address = request.headers.get("cf-connecting-ip");
  const user_agent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36";

  let response = null;
  let url = new URL(request.url);
  let url_hostname = url.hostname;

  if (https == true) {
    url.protocol = "https:";
  } else {
    url.protocol = "http:";
  }

  if (await device_status(user_agent)) {
    var upstream_domain = upstream;
  } else {
    var upstream_domain = upstream_mobile;
  }

  url.host = upstream_domain;
  if (url.pathname == "/") {
    url.pathname = upstream_path;
  } else {
    url.pathname = upstream_path + url.pathname;
  }

  if (blocked_region.includes(region)) {
    response = new Response(
      "Access denied: WorkersProxy is not available in your region yet.",
      {
        status: 403,
      }
    );
  } else if (blocked_ip_address.includes(ip_address)) {
    response = new Response(
      "Access denied: Your IP address is blocked by WorkersProxy.",
      {
        status: 403,
      }
    );
  } else {
    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set("Host", url.hostname);
    new_request_headers.set("Referer", url.hostname);

    let original_response = await fetch(url.href, {
      method: method,
      headers: new_request_headers,
    });

    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set("access-control-allow-origin", "*");
    new_response_headers.set("access-control-allow-credentials", true);
    new_response_headers.delete("content-security-policy");
    new_response_headers.delete("content-security-policy-report-only");
    new_response_headers.delete("clear-site-data");

    const content_type = new_response_headers.get("content-type");
    if (content_type.includes("text/html") && content_type.includes("UTF-8")) {
      original_text = await replace_response_text(
        original_response_clone,
        upstream_domain,
        url_hostname
      );
    } else {
      original_text = original_response_clone.body;
    }

    response = new Response(original_text, {
      status,
      headers: new_response_headers,
    });
  }
  return response;
}

async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text();

  var i, j;
  for (i in replace_dict) {
    j = replace_dict[i];
    if (i == "$upstream") {
      i = upstream_domain;
    } else if (i == "$custom_domain") {
      i = host_name;
    }

    if (j == "$upstream") {
      j = upstream_domain;
    } else if (j == "$custom_domain") {
      j = host_name;
    }

    let re = new RegExp(i, "g");
    text = text.replace(re, j);
  }
  return text;
}

async function device_status(user_agent_info) {
  var agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = true;
  for (var v = 0; v < agents.length; v++) {
    if (user_agent_info.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
```

### 镜像网站带密码访问

```javascript
// 替换成你想镜像的站点
const upstream = "google.com";

// 如果那个站点有专门的移动适配站点，否则保持和上面一致
const upstream_mobile = "m.google.com";

// 密码访问

const openAuth = false;
const username = "username";
const password = "password";

// 你希望禁止哪些国家访问
const blocked_region = ["RU"];

// 禁止自访问
const blocked_ip_address = ["0.0.0.0", "127.0.0.1"];

// 替换成你想镜像的站点
const replace_dict = {
  $upstream: "$custom_domain",
  "//google.com": "",
};

function unauthorized() {
  return new Response("Unauthorized", {
    headers: {
      "WWW-Authenticate": 'Basic realm="goindex"',
      "Access-Control-Allow-Origin": "*",
    },
    status: 401,
  });
}

function parseBasicAuth(auth) {
  try {
    return atob(auth.split(" ").pop()).split(":");
  } catch (e) {
    return [];
  }
}

function doBasicAuth(request) {
  const auth = request.headers.get("Authorization");

  if (!auth || !/^Basic [A-Za-z0-9._~+/-]+=*$/i.test(auth)) {
    return false;
  }

  const [user, pass] = parseBasicAuth(auth);
  return user === username && pass === password;
}

async function fetchAndApply(request) {
  if (request.method === "OPTIONS")
    // allow preflight request
    return new Response("", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, HEAD, OPTIONS",
      },
    });

  if (openAuth && !doBasicAuth(request)) {
    return unauthorized();
  }
  const region = request.headers.get("cf-ipcountry").toUpperCase();
  const ip_address = request.headers.get("cf-connecting-ip");
  const user_agent = request.headers.get("user-agent");

  let response = null;
  let url = new URL(request.url);
  let url_host = url.host;

  if (url.protocol == "http:") {
    url.protocol = "https:";
    response = Response.redirect(url.href);
    return response;
  }

  if (await device_status(user_agent)) {
    upstream_domain = upstream;
  } else {
    upstream_domain = upstream_mobile;
  }

  url.host = upstream_domain;

  if (blocked_region.includes(region)) {
    response = new Response(
      "Access denied: WorkersProxy is not available in your region yet.",
      {
        status: 403,
      }
    );
  } else if (blocked_ip_address.includes(ip_address)) {
    response = new Response(
      "Access denied: Your IP address is blocked by WorkersProxy.",
      {
        status: 403,
      }
    );
  } else {
    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set("Host", upstream_domain);
    new_request_headers.set("Referer", url.href);

    let original_response = await fetch(url.href, {
      method: method,
      headers: new_request_headers,
    });

    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set("access-control-allow-origin", "*");
    new_response_headers.set("access-control-allow-credentials", true);
    new_response_headers.delete("content-security-policy");
    new_response_headers.delete("content-security-policy-report-only");
    new_response_headers.delete("clear-site-data");

    const content_type = new_response_headers.get("content-type");
    if (content_type.includes("text/html") && content_type.includes("UTF-8")) {
      original_text = await replace_response_text(
        original_response_clone,
        upstream_domain,
        url_host
      );
    } else {
      original_text = original_response_clone.body;
    }

    response = new Response(original_text, {
      status,
      headers: new_response_headers,
    });
  }
  return response;
}

addEventListener("fetch", (event) => {
  event.respondWith(
    fetchAndApply(event.request).catch((err) => {
      console.error(err);
      new Response(JSON.stringify(err.stack), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
  );
});

async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text();

  var i, j;
  for (i in replace_dict) {
    j = replace_dict[i];
    if (i == "$upstream") {
      i = upstream_domain;
    } else if (i == "$custom_domain") {
      i = host_name;
    }

    if (j == "$upstream") {
      j = upstream_domain;
    } else if (j == "$custom_domain") {
      j = host_name;
    }

    let re = new RegExp(i, "g");
    text = text.replace(re, j);
  }
  return text;
}

async function device_status(user_agent_info) {
  var agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = true;
  for (var v = 0; v < agents.length; v++) {
    if (user_agent_info.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
```
