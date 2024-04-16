# 01 【Java 语言概述】 

![image-20240415113305012](https://i0.hdslb.com/bfs/article/b54e1ec88245c3960b74dd5d2c7f86643493119651743993.png)

## 1.软件开发介绍

软件开发软件，即一系列按照特定顺序组织的计算机数据和指令的集合。软件有系统软件和应用软件之分。
人机交互方式：

- **图形化界面**(Graphical User Interface `GUI`)这种方式简单直观，使用者易于接受，容易上手操作。
- **命令行方式**(Command Line Interface` CLI`)：需要有一个控制台，输入特定的指令，让计算机完成一些操作。较为麻烦，需要记录住一些命令。

### 1.1 常用的DOS命令

- win+R：输入cmd，可以打开`dos 命令行`
- dir：列出当前目录下的文件以及文件夹
- md：创建目录
- rd：删除目录
- cd：进入指定目录
- cd..： 退回到上一级目录
- cd：退回到根目录
- del：删除文件
- exit：退出`dos 命令行`
- 补充：`echo javase>1.doc`
- 常用快捷键
  - ← →：移动光标
  - ↑↓：调阅历史操作命令
  - Delete 和 Backspace：删除字符
- 注意：在输入`dos命令`时，要是用英文输入，所有标点符号都是英文。

### 1.2 计算机语言的发展迭代史

- Q：什么是计算机语言
  A：计算机语言：人与计算机交流的方式。如果人要与计算机交流，那么就要学习计算机语言。计算机语言有很多种。如：`C 、C++、Java、PHP、Kotlin、Python、Scala`等。

第一代：机器语言

- 机器语言：指令以二进制代码形式存在。

第二代：汇编语言

- 汇编语言：使用助记符表示一条机器指令。

第三代：高级语言

- 面向过程：`C、Pascal、Fortran`
- 面向对象：`Java、JS、Python、Scala...`

> 补充（这里只做简单了解）：
>
> 面向过程：例如张三打篮球，他打篮球的全部过程(拿球、传球、投篮……)。
> 面向对象：人的对象，人的运动的动作，运动的器械这三个对象，实例化一个张三的对象，对象有一个打篮球的动作，器械是篮球。
> 面向对象能更好的在抽象的层面分析问题，在程序实现跨越极大的赋予之前的代码。这些是面向过程编程极难实现的。

## 2.Java 语言概述

### 2.1 Java 语言简史

1991年 Green项目，开发语言最初命名为Oak (橡树)

1994年，开发组意识到Oak 非常适合于互联网

1996年，发布JDK 1.0，约8.3万个网页应用Java技术来制作

1997年，发布JDK 1.1，JavaOne会议召开，创当时全球同类会议规模之最

1998年，发布JDK 1.2，同年发布企业平台J2EE

1999年，Java分成J2SE、J2EE和J2ME，JSP/Servlet技术诞生

2004年，发布里程碑式版本：**JDK 1.5，为突出此版本的重要性，更名为JDK 5.0**

2005年，J2SE -> JavaSE，J2EE -> JavaEE，J2ME -> JavaME

2009年，Oracle公司收购SUN，交易价格74亿美元

2011年，发布JDK 7.0

2014年，**发布JDK 8.0，是继JDK 5.0以来变化最大的版本**

2017年，发布JDK 9.0，最大限度实现模块化

2018年3月，发布JDK 10.0，版本号也称为18.3

2018年9月，发布JDK 11.0，版本号也称为18.9

### 2.2 Java 技术体系平台

技术体系平台：

- JavaSE(Java Standard Edition)标准版
  - 支持面向桌面级应用（如Windows下的应用程序）的Java平台，提供了完整的Java核心API，此版本以前称为J2SE。
- JavaEE(Java Enterprise Edition)企业版
  - 开发企业环境下的应用程序的一套解决方案。该技术体系中包含的技术如:Servlet 、Jsp等，主要针对于Web应用程序开发。版本以前称为J2EE。
- Java ME(Java Micro Edition)小型版
  - 支持Java程序运行在移动终端（手机、PDA）上的平台，对Java API有所精简，并加入了针对移动终端的支持，此版本以前称为J2ME。
- Java Card
  - 支持一些Java小程序（Applets）运行在小内存设备（如智能卡）上的平台

从Java的应用领域来分，Java语言的应用方向主要表现在以下几个方面：

1. 企业级应用：主要指复杂的大企业的软件系统、各种类型的网站。Java的安全机制以及它的跨平台的优势，使它在分布式系统领域开发中有广泛应用。应用领域包括金融、电信、交通、电子商务等。
2. Android平台应用：Android应用程序使用Java语言编写。Android开发水平的高低很大程度上取决于Java语言核心能力是否扎实。
3. 大数据平台开发：各类框架有Hadoop，spark，storm，flink等，就这类技术生态圈来讲，还有各种中间件如flume，kafka，sqoop等等，这些框架以及工具大多数是用Java编写而成，但提供诸如Java，scala，Python，R等各种语言API供编程。
4. 移动领域应用：主要表现在消费和嵌入式领域，是指在各种小型设备上的应用，包括手机、PDA、机顶盒、汽车通信设备等。

### 2.3 Java 主要特性

- Java语言是易学的。Java语言的语法与C语言和C++语言很接近，使得大多数程序员很容易学习和使用Java。
- Java语言是强制面向对象的。Java语言提供类、接口和继承等原语，为了简单起见，只支持类之间的单继承，但支持接口之间的多继承，并支持类与接口之间的实现机制（关键字为implements）。
- Java语言是分布式的。Java语言支持Internet应用的开发，在基本的Java应用编程接口中有一个网络应用编程接口（java net），它提供了用于网络应用编程的类库，包括URL、URLConnection、Socket、ServerSocket等。Java的RMI（远程方法激活）机制也是开发分布式应用的重要手段。
- Java语言是健壮的。Java的强类型机制、异常处理、垃圾的自动收集等是Java程序健壮性的重要保证。对指针的丢弃是Java的明智选择。
- Java语言是安全的。Java通常被用在网络环境中，为此，Java提供了一个安全机制以防恶意代码的攻击。如：安全防范机制（类ClassLoader），如分配不同的名字空间以防替代本地的同名类、字节代码检查。
- Java语言是体系结构中立的。Java程序（后缀为java的文件）在Java平台上被编译为体系结构中立的字节码格式（后缀为class的文件），然后可以在实现这个Java平台的任何系统中运行。
- Java语言是解释型的。如前所述，Java程序在Java平台上被编译为字节码格式，然后可以在实现这个Java平台的任何系统的解释器中运行。先编译后解释。
- Java是性能略高的。与那些解释型的高级脚本语言相比，Java的性能还是较优的。
- Java语言是原生支持多线程的。在Java语言中，线程是一种特殊的对象，它必须由Thread类或其子（孙）类来创建。

### 2.4 Java两种核心机制

#### Java虚拟机(Java VirtalMachine

- `JVM`是一个虚拟的计算机，具有指令集并使用不同的存储区域。负责执行指令，管理数据、内存、寄存器。
- 对于不同的平台，有不同的虚拟机。
- 只有某平台提供了对应的`JVM`，`java`程序才可在此平台运行。
  ![image-20240415140957994](https://i0.hdslb.com/bfs/article/b7f23227d7018261a4b26283f817a4c43493119651743993.png)
- Java虚拟机机制屏蔽了底层运行平台的差别，实现了“一次编译，到处运行”。
  ![image-20240415141041818](https://i0.hdslb.com/bfs/article/ef560a07ef1aca76c13b689425c60abb3493119651743993.png)

#### 垃圾收集机制(Garbage Collection)

**不再使用的内存空间应回收——垃圾回收。**

- 在C/C++等语言中，由程序员负责回收无用内存。
- Java 语言消除了程序员回收无用内存空间的责任：它提供一种系统级线程跟踪存储空间的分配情况。并在JVM空闲时，检查并释放那些可被释放的存储空间。
- 垃圾回收在Java程序运行过程中自动进行，程序员无法精确控制和干预。

## 3.Java语言的环境搭建

### 3.1 明确什么是JDK, JRE?

- JDK(Java Development Kit Java开发工具包)
  - JDK是提供给Java开发人员使用的，其中包含了java的开发工具，也**包括了JRE。**所以安装了JDK，就不用在单独安装JRE了。其中的开发工具：编译工具(javac.exe) 打包工具(jar.exe)等。
- JRE(Java Runtime Environment Java运行环境)
  - 包括Java虚拟机(JVM Java Virtual Machine)和Java程序所需的核心类库等，如果想要运行一个开发好的Java程序，计算机中只需要安装JRE即可。

**简单而言，使用JDK的开发工具完成的java程序，交给JRE去运行**

![image-20240415141845578](https://i0.hdslb.com/bfs/article/49047b48a3e9cb0b7b92c72e4f6305753493119651743993.png)

![image-20240415141928149](https://i0.hdslb.com/bfs/article/7e32d7be16d41236b42ca43fa4c0bd6a3493119651743993.png)

- **JDK = JRE + 开发工具集（例如Javac编译工具等）**
- **JRE = JVM + Java SE标准类库**

### 3.2 path环境变量的配置

- Q：为什么配置path环境变量？
  A：`path环境变量`是windows操作系统执行命令时所要搜寻的路径。配置后可以使java的开发工具（`javac.exe`，`java.exe`)在任何的文件路径下都可以执行成功。
- Q：如何配置？
  A：![image-20240415142602558](https://i0.hdslb.com/bfs/article/1f3d538a2b0052a768411e6ce8a78ad63493119651743993.png)

## 4.第一个Java程序

![image-20240415142754919](https://i0.hdslb.com/bfs/article/45718942e074e25559fd6a1d2e45ab373493119651743993.png)

1. 将代码**编写**到扩展名为`.java `的文件中。

   1. 选择最简单的编辑器：记事本。

   2. 敲入代码`class Test{}`将文件保存成`Test.java`，这个文件是存放java代码的文件，称为源文件。

   3. ```java
      public class Test {
          public static void main(String[] args) {
              System.out.println("hello world");
          }
      }    
      ```

2. 通过`java`命令对生成的`.class`文件进行运行（不需要加上`.class`后缀）。
   ![image-20240415143743265](https://i0.hdslb.com/bfs/article/ce2bb46acacdc0f45363868fe16258e13493119651743993.png)

**注意：**

1. **main 方法**：一个程序的执行需要一个起始点或者入口，所以在类中的加入`public static void main(String[] args){}`。
2. 如果源文件有做修改，需要对修改后的源文件重新编译，生成新的class文件后，再进行执行。

**总结：**

① java程序编写-编译-运行的过程

- 编写：我们将编写的java代码保存在以".java"结尾的源文件中
- 编译：使用javac.exe命令编译我们的java源文件。格式：javac 源文件名.java
- 运行：使用java.exe命令解释运行我们的字节码文件。 格式：java 类名

② 在一个java源文件中可以声明多个class。但是，只能最多有一个类声明为public的。而且要求声明为public的类的类名必须与源文件名相同。

③ 程序的入口是main()方法。格式是固定的。

④ 输出语句：

- `System.out.println()`：先输出数据，然后换行；
- `System.out.print()`：只输出数据；

⑤ 每一行执行语句都以`;`结束。

⑥ 编译的过程：编译以后，会生成一个或多个字节码文件。字节码文件的文件名与java源文件中的类名相同

## 5.注释与API文档

用于注解说明解释程序的文字就是注释，注释是一个程序员必须要具有的良好编程习惯。

- 单行注释

  - **格式：//注释文字**

- 多行注释

  - **格式：/\* 注释文字\*/**
  - **注：对于单行和多行注释，被注释的文字，不会被JVM（java虚拟机）解释执行。**

- **文档注释**

  - **格式**：

    ```java
    /**
     * @author  指定java程序的作者**
     * @version  指定源文件的版本**
     */
    ```
  - 注释内容可以被JDK提供的工具`javadoc`所解析，生成一套以网页文件形式体现的该程序的说明文档。
    命令行：`javadoc -d mydoc -author -version HelloWorld.java`

## 6.良好的编程风格

### 6.1 正确的注释和注释风格

- 使用文档注释来注释整个类或整个方法
- 如果注释方法中的某一个步骤，使用单行或多行注释。

### 6.2 正确的缩进和空白

- 使用一次tab操作，实现缩进
- 运算符两边习惯性各加一个空格。比如：2 + 4 * 5。

### 6.3 块的风格

行尾风格（Java API源码选择的风格）

```java
public class Test{
    public static void main (String args){
        System.out.print("Hello");
    }
}
```

次行风格

```java
public class Test
{
    public static void main (String args)
    {
        System.out.print("Hello");
    }
}
```

### 6.4 命名风格：

- 包名：多单词组成时所有字母都小写：`xxxyyyzzz`
- 类名、接口名：多单词组成时，所有单词的首字母大写： `XxxYyyZzz`(大驼峰式)
- 变量名、方法名：多单词组成时，第一个单词首字母小写，第二个单词开始每个单词首字母大写： `xxxYyyZzz`(小驼峰式)
- 常量名：所有字母都大写。多单词时每个单词用下划线连接： `XXX_YYY_ZZZ`

