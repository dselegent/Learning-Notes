# 02 【TailWind CSS 初体验】

经过上一篇 `Tailwind CSS` 的学习，现在已经安装好了，万事俱备，只欠东风。这篇文章不往后学习，先来找找**成就感!**，体验一把 `Tailwind CSS` 的案例。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../dist/output.css" />
  </head>
  <body>
    <div class="text-gray-600">
      <header class="mb-5">
        <div class="bg-gray-700 p-4 text-white">Hello world</div>
      </header>
      <main class="container mx-auto">
        <div class="text-center text-5xl">Hello TailWind CSS</div>
        <hr class="my-5" />
        <div class="flex justify-center">
          <a href="./showTwo.html" target="_blank">
            <img
              src="https://www.ziruchu.com/uploads/slideshow/2019061744096.png"
              class="shadow-lg border-2 border-sky-500 my-5 align-middle"
            />
          </a>
        </div>
      </main>
      <footer class="mt-5">
        <div class="bg-gray-300 p-4 text-black">你好，TailWind CSS。</div>
      </footer>
    </div>
  </body>
</html>
```

![image-20220816124340412](https://i0.hdslb.com/bfs/album/38c7b2d62e38832a28fd0c946911e4d313107558.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../dist/output.css" />
  </head>
  <body>
    <h1 class="text-lg font-bold tracking-widest uppercase">TailWind CSS</h1>
    <div
      class="leading-9 text-center bg-yellow-500 w-1/2 h-1/3 p-5 my-10 border-2 border-solid border-pink-500 opacity-40 shadow-2xl"
    >
      <p>hello tailwind css</p>
    </div>
    <input type="text" class="border border-pink-500 rounded-lg outline-0 focus:border-blue-500" />
    <div class="md:flex md:flex-wrap m-5">
      <div class="bg-orange-500 p-5 md:w-1/3 md:bg-red-600">Laravel</div>
      <div class="bg-blue-500 p-5 md:w-1/3">Tailwind CSS</div>
      <div class="bg-pink-500 p-5 md:w-1/3">Livewire</div>
    </div>
  </body>
</html>
```

![image-20220816124411029](https://i0.hdslb.com/bfs/album/37eda129387ca8126c42efcb0e4f58734079186b.png)

