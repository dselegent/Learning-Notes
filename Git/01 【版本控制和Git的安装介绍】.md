# 01 【版本控制和Git的安装介绍】

工程设计领域中，使用“版本控制”管理工程蓝图的设计过程。在 IT 开发中也可以使用版本控制思想管理代码的版本迭代。

## 1.目的

协同修改：支持在服务器对同一个文件多人协同地修改；
数据备份：同时保存目录及文件的当前状态与每次提交时的历史状态；
版本管理：不保存版本间的重复数据以节约存储空间；

> 为此，SVN 和 Git 分别采用增量式管理 和文件系统快照 的方式。

权限控制：对团队协作者进行权限控制（SVN 和 Git 共有）；审核团队外开发者贡献的代码（Git 独有）；
历史记录：查看修改者、修改时间、修改内容、日志信息等项目；将本地文件恢复到某一指定的历史状态；
分支管理：允许开发团队同时优雅地推进多条生产线任务，提高效率。

## 2. 工具

版本控制工具是版本控制思想的实现。

### 2.1 集中式版本控制工具

如：CVS、SVN、VSS 等。

- 仅云端库有版本历史记录，本地库仅有最新的版本；
- 无法完全避免单点故障的问题。

> 单点故障：一个主机连接多个处理节点，主节点负责分发任务，而子节点负责处理业务，当主节点发生故障时，会导致整个系统发故障。

![image-20220827211244519](https://i0.hdslb.com/bfs/album/7b0bdd27704c333af32efeced9bcb98f2ed3b889.png)

![image-20220827211204909](https://i0.hdslb.com/bfs/album/0f5f0cd17c6e8a48f0ff991aa7bc64ea0211f6c6.png)

### 2.2 分布式版本控制工具

如：Git、Mercurial、Bazaar、Darcs 等。

- 云端库和本地库都会为各个版本历史记录存档；
- 从根本上避免了单点故障。

![image-20220827211230657](https://i0.hdslb.com/bfs/album/9fceda60db8eceea9503ea8b0ff6a35fd0970a97.png)

## 3.Git 简介

### 3.2 Git：分布式版本控制系统

Git是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是一个完整的版本库，这样，工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

下图就是分布式版本控制工具管理方式：

![image-20221006131925125](https://i0.hdslb.com/bfs/album/33e8eb98bed3beea624278acba725b3d6c9889b1.png)

仓库（版本库）：相当于一个专门用来存放代码的目录。这个目录里面的所有文件都可以Git管理，每个文件的增删改查都能被Git跟踪到

### 3.2 发展史

![image-20220827211720552](https://i0.hdslb.com/bfs/album/f90f771ae3d0f2c874feae9418df19974c4424bf.png)

### 3.3 优势

- 大部分操作在本地完成，不需要联网；
- 完整性保证；
- 尽可能添加数据，而不是删除或修改数据；
- 分支操作非常快捷流畅；
- 与 Linux 命令全面兼容。

## 4.Git 软件的安装

从 https://git-scm.com/downloads 下载对应操作系统的二进制可执行文件。

> 直接下一步的过程就不介绍了

1.安装到无空格的英文路径下（这是软件安装过程中的规范，防止因程序的不健壮而引发未知错误）；

![image-20220827211905363](https://i0.hdslb.com/bfs/album/4e00c1fac6315adf8f38f0d996d4a91d92c8a1b5.png)

2.选择需要安装的组件；

![image-20220827211916721](https://i0.hdslb.com/bfs/album/682ee9b628eae1dd15042730df38fb75cea0a951.png)

3.选择 [Visual Studio Code](https://code.visualstudio.com/) 用于 Git 的默认文本编辑器；

![image-20220827212000737](https://i0.hdslb.com/bfs/album/c519001a28231c5941aad78f7f4b89bbca08ed1a.png)

4.设置在执行`git init`命令后，由 Git 自行定义新存储库的初始分支名称——`master`；

![image-20220827212024257](https://i0.hdslb.com/bfs/album/703320786d402e2f5e32a844b644343d834fd6b4.png)

5.设置PATH环境变量——保持默认；

![image-20220827212111362](https://i0.hdslb.com/bfs/album/01aec4a2ff2caef58f88b6c7fbbd22a4c11fa848.png)

6.选用内置的 OpenSSH 作为 SSH 可执行文件；

![image-20220827212130586](https://i0.hdslb.com/bfs/album/02727881e69d9626d359a0e5b3861cc5ff56e063.png)

7.选择 OpenSSL 库作为 HTTPS 传输端；

![image-20220827212142376](https://i0.hdslb.com/bfs/album/8435ebc111356ab3be7bc4d83e76621befd337ce.png)

8.使用默认配置转换文本文件中的行尾；

![image-20220827212154165](https://i0.hdslb.com/bfs/album/b6a3afb46bc1a7a04d50580c67de349149a30bfd.png)

9.使用默认配置，选用 MinTTY 作为 Git Bash 的终端；

![image-20220827212206242](https://i0.hdslb.com/bfs/album/d20c764070c38076bfd48dcddc3cf07f559b1c4f.png)

10.对于执行git pull命令后的行为保持默认；

![image-20220827212223848](https://i0.hdslb.com/bfs/album/4d6fe391e7919077107073080c80764b2fd67497.png)

11.选用默认的授权助手；

![image-20220827212233762](https://i0.hdslb.com/bfs/album/b434fe096bc937099a157a40e25296232804f0d0.png)

12.其他杂项设置；

![image-20220827212247326](https://i0.hdslb.com/bfs/album/c0b932915cc0d02c04a8ca63de4f179e70829351.png)

13.保持对实验性选项的禁用后安装 (Install)；

![image-20220827212312589](https://i0.hdslb.com/bfs/album/14eb73fb460fd69bd4381c57ccde48daa9c650cd.png)