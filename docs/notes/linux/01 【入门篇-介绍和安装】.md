# 01 【入门篇-介绍和安装】

## 1.Linux课程介绍

### 1.1 学习方向

* linux运维工程师： 维护linux的服务器（一般大型企业）
* linux嵌入式工程师： linux做驱动开发，或者linux的嵌入式
* linux下开发项目
  ![学习方向](https://i0.hdslb.com/bfs/album/08c3b1b814156e29bf4e53e0b59f4961a9f0bc41.jpg)

### 1.2 应用领域

* 个人桌面
* 服务器应用
  * 免费，稳定，高效
* 侵入式应用
  * 机顶盒，手机，数字电视，智能家居等

### 1.3 学习进阶

1. 学习基本指令
   * 文件操作指令
   * 编辑工具
   * 用户管理
2. linux系统配置
   * 环境变量，网络配置，服务配置
3. linux环境下搭建开发环境
   * 大数据 JavaEE Python 等
4. 编写shell脚本，对Linux服务器维护
5. 安全设置，防止攻击，保证服务器正常运行，系统调优
6. 深入理解Linux，对内核有研究，掌握大型网站架构、熟悉各环节部署方法

## 2.Linux介绍及安装

### 2.1 Linux介绍

* Linux 是一款免费，开源，安全，高效，稳定，处理高斌发很强悍的操作系统
* Linux创始人——linux（林纳斯）
* Linux主要发行版本

![发行版本](https://i0.hdslb.com/bfs/album/810e414ba869dd66f88b92a607e46ba32df68a10.jpg)

### 2.2 Unix与Linux的关系

**Unix来源**

![unix来源](https://i0.hdslb.com/bfs/album/3e6990c8adb641d8ec6d9a617fc0eb37ab505715.jpg)

**Linux来源**

![Linux来源](https://i0.hdslb.com/bfs/album/d46ae88ce01f8cc54b1775c7a10378cb3d8fed6e.jpg)

**Linux与Unix关系**

![Linux与Unix关系](https://i0.hdslb.com/bfs/album/dd8ce4f9ca7bebf60a2681d69d80bcee4db33279.jpg)

**Linux与Windows关系**

![Linux与Windows关系](https://i0.hdslb.com/bfs/album/9ce17216d979da5d1afacd8669750a3815b8d787.jpg)

### 2.3 CentOS的安装

#### 2.3.1 无脑安装vmware workstation

<img src="https://i0.hdslb.com/bfs/album/439efd46a01d9dc2f79669b4c4a655142b43b6df.png" alt="image-20211112085949513" style="zoom: 67%;" />

#### 2.3.2 编辑vmware workstation 的虚拟网卡 

##### 2.3.2.1 进行便捷的远程开发需要满足的两个条件

![image-20211112090629524](https://i0.hdslb.com/bfs/album/8ec4fc0bd23e569c057782ccd3680dfab82d7ee2.png)

##### 2.3.2.2 三种类型的网卡的含义

**1) 桥接模式：虚拟机电脑在网络环境中的地位和宿主环境（开发电脑）是一样的，虚拟机可以上网，但是ip地址会变来变去，因为虚拟机的ip地址是由DHCP动态分配的**

**2) NAT模式：开发电脑（宿主环境）会通过虚拟网卡构建一个局域网，虚拟机电脑作为局域网中一个成员，由于局域网受开发电脑的控制，因此虚拟机电脑的ip地址可以是固定的，局域网中的成员（虚拟机）可以通过开发电脑（宿主环境）间接的连到外面的互联网**

**3）仅主机模式：虚拟机相当于黑户，完全和外界隔绝，因此不能上网**

![image-20211112092206452](https://i0.hdslb.com/bfs/album/49ac3fa86025844928494ca67958e16a83c2d607.png)



##### 2.3.2.3 规划局域网

##### 网段         192.168.10.xx

##### 子网掩码  255.255.255.0

##### 网关         192.168.10.2

##### 2.3.2.4 编辑虚拟网卡（大家使用10的网段，而不是使用图片中的19网段）

> 大家使用10的网段，而不是使用图片中的19网段

1. 以管理员身份打开vmware workstation

![image-20211112093605466](https://i0.hdslb.com/bfs/album/55e14e9ccb1c9cc2f79bb77c23d05fe10e470f50.png)

2. 打开VMware Workstation 编辑虚拟网卡
3. 打开VMware Workstation 编辑虚拟网卡

![](https://i0.hdslb.com/bfs/album/f0356e47a4d2a7d8a53b298b0125efaccda79bb4.png)

4. （做了第1步就不需要再做第3步）由于需要管理员权限才能修改网络配置，我们点击更改设置

![](https://i0.hdslb.com/bfs/album/112a4c4e2c6e928a191f2df2e0869e1169ee06de.png)

5. 仅保留NAT模式的虚拟网卡，并参照图片完成设置

![](https://i0.hdslb.com/bfs/album/dea824b77e46505f9f21da65e30a2617cd5f71f8.png)

6. 设置网关

![](https://i0.hdslb.com/bfs/album/aa333ee41fb6258018130ab5c3721cb6c0b412c1.png)

7. 点击确定生效

![](https://i0.hdslb.com/bfs/album/d08e96203db9cedb7f70ad9a5ec371c77e330fa4.png)

8. 直接使用windows查看虚拟网卡设置生效情况，如果没有正常生效的部分，需要我们手动修改，然后点击确定生效

![](https://i0.hdslb.com/bfs/album/09851836beeb1a97cc6c4f93f9c31c9caa06f834.png)

#### 2.3.3 安装centos的linux操作系统 

##### 2.3.3.1  创建一个虚拟机（虚拟电脑）

![image-20211112101126528](https://i0.hdslb.com/bfs/album/327bd63f00e7ea4cd0fc4702b07290d28b1a9998.png)



![image-20211112101207152](https://i0.hdslb.com/bfs/album/0e97c3b98bb8f16f9d28197228aa67d7bb322da1.png)

![image-20211112101419743](https://i0.hdslb.com/bfs/album/05c1e097d8a58ffa0718fd616b7b2b7ef80f4adb.png)

![image-20211112101633715](https://i0.hdslb.com/bfs/album/ec6bd1daafdd330d8170e41a5564dcc39cb2d514.png)

![image-20211112101910920](https://i0.hdslb.com/bfs/album/fb753f20a21ffaea28caa615a959f52a0050d757.png)

![image-20211112102039077](https://i0.hdslb.com/bfs/album/1450560a7fc552e7328d66f6dfc9b7f0e1d714d6.png)

![image-20211112102252690](https://i0.hdslb.com/bfs/album/2be2c87928f931e121fe073507ebc6d57038e948.png)

![image-20211112102338211](https://i0.hdslb.com/bfs/album/1db17867aca2be6b0ca891356c3a3f38a540c6eb.png)

##### 2.3.3.2 在虚拟机上安装centos的操作系统

![image-20211112102422321](https://i0.hdslb.com/bfs/album/cefa59adabbed2bfdb3c0d1101e5bf2611a16d74.png)

![image-20211112102523270](https://i0.hdslb.com/bfs/album/c11688ec2c99957d2c9b093e88a9ac15e9a8eef3.png)

![image-20211112102943673](https://i0.hdslb.com/bfs/album/f71ad0c435f08954acb8a7a76a59566d4e5aea54.png)



![image-20211112103018047](https://i0.hdslb.com/bfs/album/fd9b7d92cafa61c0b55568bd20ebbaa0e9b96c70.png)



![image-20211112103124685](https://i0.hdslb.com/bfs/album/80df58dff80c4bde862fd7a9b53b7250a43b38c3.png)

![image-20211112103316020](https://i0.hdslb.com/bfs/album/31167e2a0ca9b00f4e403bc93c473f858c53a5bb.png)

![image-20211112103402101](https://i0.hdslb.com/bfs/album/207a4689064acd44c452d351fa128c6913a7f940.png)

![image-20211112103428107](https://i0.hdslb.com/bfs/album/1031c8ca689bea9bc940b874f29ea6a97d942720.png)

![image-20211112152234468](https://i0.hdslb.com/bfs/album/dba8970f77a6334823236f5f93ddeaa89c035085.png)

![image-20211112103624114](https://i0.hdslb.com/bfs/album/7f4bd9b8c3f4372f53b0526c7d6a1e399d4d4902.png)

![image-20211112103706278](https://i0.hdslb.com/bfs/album/85a1f9c8023b7f7a952c1d346a5cafdfcc062150.png)



![image-20211112103733703](https://i0.hdslb.com/bfs/album/dc549197a1fed76ff0ceca28c88b26f9736046f9.png)

![image-20211112104318911](https://i0.hdslb.com/bfs/album/610ce3d9ba79d61662b2163ca2040444874812c3.png)

![image-20211112104520575](https://i0.hdslb.com/bfs/album/f8ba300fcfd03e9f5147392b6a258b83e1483b4b.png)

![image-20211112104549330](https://i0.hdslb.com/bfs/album/1efe220ba6fb8c0bd79187350964dbcc7be39217.png)

![image-20211112104611613](https://i0.hdslb.com/bfs/album/db41a79086008bfbfc183e73173e2599cfc0a3de.png)



![image-20211112105044673](https://i0.hdslb.com/bfs/album/8b887fbd050ea6598335b12d6e7b01d41a1f436e.png)

![image-20211112105126584](https://i0.hdslb.com/bfs/album/a4be3a272635f5aa0869cec1046b0d8f136d4866.png)

![image-20211112104647373](https://i0.hdslb.com/bfs/album/68e27a837c01d40e96d75c34ea10dc3166e0d3f4.png)

![image-20211112110654155](https://i0.hdslb.com/bfs/album/e71a1714c4866266136f123f9fd33b61602f53ed.png)

![image-20211112111741098](https://i0.hdslb.com/bfs/album/f1909a9859a12e23cd87e1c6278e4228a10a523a.png)



## 3.Linux基本目录机构

### 3.1 基本介绍

* Linux的文件系统采用级层式子的树状目录结构，
* 最上层是根目录“/”
* **Linux世界里，一切皆文件。**
  ![目录结构](https://i0.hdslb.com/bfs/album/9b6a7fb1fdb9796228fec46327ff0b69953ccaf0.jpg)

### 3.2 目录用途

* `/bin：` 是Binary的缩写，这个目录存放着最经常使用的命令。
* /sbin：s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。
* `/home：`存放普通用户的主目录，在Linux中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。
* `/root：`该目录为系统管理员，也称作超级权限者的用户主目录。
* /lib：系统开机所需要最基本的动态连接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。
* /lost+found：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
* /etc：所有的系统管理所需要的配置文件和子目录my.conf。
* `/usr/local`：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。
* `/boot：`存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
* /proc：这个目录是一个虚拟的目录，它是系统内存的映射，访问这个目录来获取系统信息。
* /srv：service的缩写，该目录存放一些服务启动之后需要提供的数据。
* /sys：这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统sysfs。
* /tmp：这个目录是用来存放一些临时文件的。
* /dev：类似windows的设备管理器，把所有的硬件用文件的形式存储。
* `/media：`linux系统会自动识别一些设备，例如U盘光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
* `/mnt：`系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将外部的存储挂载在/mnt/上，然后进入该目录就可以查看里面的内容了。
* `/opt：`这是给主机额外安装软件所摆放的目录，如安装ORACLE数据库就可放到该目录下。默认为空。
* /usr/local：这是另一个给主机额外安装软件所安装的目录，一般是通过编译源码的方式安装的程序。
* `/var：`这个目录中存放着在不断扩充着的东西，习惯将经常被修改的目录放在这个目录下，包括各种日志文件。
* /selinux：SELinux是一种安全子系统，它能控制程序只能访问特定文件。

### 3.3 总结

1. Linux的目录中有且只有一个根目录。
2. Linux的各个目录存放的内容是规划好，不用乱放文件。
3. Linux是以文件的形式管理我们的设备，因此linux系统，一切皆为文件。
4. Linux的各个文件目录下存放什么内容，必须有一个认识。

