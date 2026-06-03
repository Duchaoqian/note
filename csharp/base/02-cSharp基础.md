# 02-C# 基础

C#（读作 "C Sharp"）是微软推出的一种现代、面向对象的编程语言，运行于 .NET 平台之上。它结合了 C++ 的强大功能和 Visual Basic 的易用性，广泛应用于桌面应用、Web 应用、游戏开发（Unity）、云计算等领域。

---

## 一、.NET 与 C# 的关系

|概念|说明|
|-|-|
|**C#**|编程语言，编写代码的语法规范|
|**.NET**|程序运行平台，提供运行时环境和类库|
|**CLR**|公共语言运行时，负责编译和执行 C# 代码|
|**BCL**|基类库，提供大量内置类型和功能|

C# 代码的编译和执行过程：

```
C# 源代码 (.cs)
    ↓  C# 编译器 (csc.exe)
IL 中间语言 (.dll / .exe)
    ↓  CLR (JIT 编译)
机器码
    ↓  执行
程序输出
```

---

## 二、第一个 C# 程序

### 1. 创建项目

使用 Visual Studio 创建 C# 控制台应用：

1. 打开 Visual Studio → 创建新项目
2. 选择 "控制台应用 (.NET)" 模板
3. 配置项目名称、位置和解决方案名称
4. 点击 "创建"

### 2. 程序结构

```csharp
using System;                      // 引入命名空间
using System.Collections.Generic;

namespace MyApp                    // 定义命名空间
{
    internal class Program        // 定义类
    {
        static void Main(string[] args)  // 主方法——程序入口
        {
            // 在控制台输出文本
            Console.WriteLine("Hello, World!");

            // 等待用户输入，防止控制台关闭
            Console.ReadLine();
        }
    }
}
```

### 程序各部分说明

|部分|说明|是否必需|
|-|-|-|
|`using System;`|引入命名空间，使用其中的类|一般需要|
|`namespace MyApp`|组织代码的容器|推荐|
|`class Program`|类定义，C# 所有代码都存在于类中|必需|
|`static void Main()`|程序入口点，从这里开始执行|必需|
|`Console.WriteLine()`|控制台输出方法|按需使用|
|`Console.ReadLine()`|控制台输入方法|按需使用|

### 3. Console 输入输出

```csharp
// 输出（带换行）
Console.WriteLine("Hello World");

// 输出（不换行）
Console.Write("Hello ");
Console.Write("World");  // 输出：Hello World

// 格式化输出
string name = "张三";
int age = 25;
Console.WriteLine($"我叫{name}，今年{age}岁");  // 字符串插值
Console.WriteLine("我叫{0}，今年{1}岁", name, age);  // 占位符

// 输入
string input = Console.ReadLine();      // 读取一行文本
int key = Console.Read();               // 读取单个字符的 ASCII 码
ConsoleKeyInfo keyInfo = Console.ReadKey();  // 读取按键（不按回车）
Console.ReadKey(true);                  // 读取按键但不显示在控制台

// 控制台外观
Console.Title = "我的程序";              // 设置标题
Console.ForegroundColor = ConsoleColor.Green;  // 设置前景色
Console.BackgroundColor = ConsoleColor.Black;  // 设置背景色
Console.Beep();                         // 发出蜂鸣声
```

---

## 三、注释

注释用于解释代码，不会被编译执行。C# 有三种注释类型：

```csharp
// 1. 单行注释：以 // 开头，到行尾结束
int a = 10;  // 这是单行注释

/*
   2. 多行注释：以 /* 开始，以 *​/ 结束
   可以跨越多行
   常用于注释掉大段代码
*/

/// 3. XML 文档注释：以 /// 开头，自动生成文档
/// <summary>
/// 这个方法用于计算两个数的和
/// </summary>
/// <param name="x">第一个数</param>
/// <param name="y">第二个数</param>
/// <returns>两个数的和</returns>
static int Add(int x, int y)
{
    return x + y;
}
```

### XML 文档注释常用标签

|标签|用途|
|-|-|
|`<summary>`|方法/类摘要说明|
|`<param name="">`|参数说明|
|`<returns>`|返回值说明|
|`<exception>`|可能抛出的异常|
|`<remarks>`|补充说明|
|`<example>`|使用示例|

---

## 四、命名规范

C# 中有几种常用的命名规范：

|规范|规则|示例|适用场景|
|-|-|-|-|
|**PascalCase**|每个单词首字母大写|`MaxValue`, `GetUserInfo`|类名、方法名、属性名、命名空间|
|**camelCase**|首单词小写，后续单词首字母大写|`userName`, `totalCount`|局部变量、方法参数|
|**\_camelCase**|下划线 + camelCase|`_userName`, `_connectionString`|私有字段|
|**SCREAMING_CASE**|全大写，下划线分隔|`MAX_RETRY_COUNT`|常量（非强制）|

```csharp
public class UserManager          // 类名：PascalCase
{
    private string _userName;     // 私有字段：_camelCase
    public string UserName        // 属性：PascalCase
    {
        get { return _userName; }
    }

    public void GetUserInfo()     // 方法：PascalCase
    { }

    public void SetName(string userName)  // 参数：camelCase
    {
        string temp = userName.ToUpper(); // 局部变量：camelCase
    }

    private const int MaxRetryCount = 3;  // 常量：PascalCase
}
```

---

## 五、var 隐式类型

`var` 并非数据类型，而是让编译器根据初始值**推断**变量类型的关键字。

```csharp
// 编译器推断为 int 类型
var a = 10;         // int
var b = 3.14;       // double
var c = "Hello";    // string
var d = new List<int>();  // List<int>
var e = new { Name = "张三", Age = 25 };  // 匿名类型

// var 的规则
var f = 10;
// f = "string";    // ❌ 错误：f 是 int 类型，不能赋值为 string
// var g;           // ❌ 错误：必须初始化，编译器才能推断类型
// var h = null;    // ❌ 错误：不能推断为 null

// var 的适用场景
// ✅ 当类型名称很长时
var dict = new Dictionary<string, List<int>>();
// 等价于
Dictionary<string, List<int>> dict2 = new Dictionary<string, List<int>>();

// ✅ LINQ 查询结果（匿名类型必须用 var）
var query = students.Where(s => s.Score > 60)
                    .Select(s => new { s.Name, s.Score });

// ⚠️ 不推荐用 var 的场景
// var x = GetData();  // 当返回类型不明确时，应显式声明类型
```

### var 的使用建议

|场景|推荐|
|-|-|
|右侧明显能看出类型|`var dict = new Dictionary<int, string>();` ✅|
|LINQ 查询返回匿名类型|`var result = ...` ✅（必须用 var）|
|类型名称极长|`var dict = new Dictionary<int, Dictionary<string, List<int>>>();` ✅|
|方法返回值不明确时|`int count = GetCount();` ✅（避免用 var）|

---

## 六、Main 方法的多种形式

```csharp
// 无返回值，无参数
static void Main() { }

// 无返回值，带命令行参数
static void Main(string[] args) { }

// 有返回值，无参数
static int Main() { return 0; }

// 有返回值，带命令行参数
static int Main(string[] args) { return 0; }

// 异步入口点（C# 7.1+）
static async Task Main() { }
static async Task<int> Main() { }
static async Task Main(string[] args) { }
static async Task<int> Main(string[] args) { }
```

---

## 七、关键字与标识符

### 关键字

关键字是 C# 预定义的保留标识符，有特殊含义。

```csharp
// 类型关键字：int, string, bool, double, char, etc.
// 控制关键字：if, else, for, while, switch, etc.
// 修饰符：public, private, static, virtual, etc.
// 其他：class, namespace, using, return, etc.
```

### 标识符命名规则

|规则|说明|示例|
|-|-|-|
|只能包含字母、数字、下划线|不能包含空格、特殊字符|`userName` ✅, `user-name` ❌|
|不能以数字开头|必须以字母或下划线开头|`name1` ✅, `1name` ❌|
|不能与关键字重名|用 @ 前缀可绕过|`@class` ✅（不推荐）|
|区分大小写|`name` 和 `Name` 不同|—|

---

## 八、常用的 Visual Studio 快捷键

|快捷键|功能|
|-|-|
|`Ctrl + K, Ctrl + C`|注释选中代码|
|`Ctrl + K, Ctrl + U`|取消注释|
|`Ctrl + K, Ctrl + D`|格式化整个文档|
|`Ctrl + K, Ctrl + F`|格式化选中代码|
|`F12`|转到定义|
|`Ctrl + F12`|转到实现|
|`Ctrl + -`|后退到上一个位置|
|`Ctrl + Shift + -`|前进到下一个位置|
|`F5`|启动调试|
|`Ctrl + F5`|不调试运行|
|`F9`|设置/取消断点|
|`F10`|逐过程调试|
|`F11`|逐语句调试|
|`Ctrl + Z`|撤销|
|`Ctrl + Shift + Z`|重做|
|`Ctrl + Space`|触发智能提示|
|`Ctrl + R, Ctrl + R`|重命名（重构）|
|`Ctrl + M, Ctrl + M`|折叠/展开代码块|
|`Ctrl + Shift + B`|生成解决方案|

---

## 核心知识点总结

### 基础概念速查

|概念|说明|
|-|-|
|**命名空间（namespace）**|组织代码的容器，避免命名冲突|
|**类（class）**|C# 的基本代码单元，所有代码都存在于类中|
|**方法（method）**|封装了可执行的代码块|
|**Main 方法**|程序的入口点（只能有一个）|
|**Console 类**|控制台输入输出的核心类|
|**var 关键字**|隐式类型，编译器根据初始值推断类型|

### 注意事项

1. **C# 区分大小写**——`Console.WriteLine` 不能写成 `console.writeline`
2. **Main 方法首字母大写**——C# 中方法是 PascalCase，与 Java 不同
3. **每条语句以分号结尾**——忘记分号会导致编译错误
4. **代码块用花括号包裹**——`{ }` 表示代码块
5. **var 不是动态类型**——类型在编译时就已确定，不能在运行时改变
6. **良好的命名规范**提高代码可读性——团队开发时应统一规范
