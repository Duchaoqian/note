# 04-Lambda 表达式和委托

委托（Delegate）和 Lambda 表达式是 C# 函数式编程的基础。**委托**是方法的类型安全引用，**Lambda 表达式**是简洁的匿名函数。

---

## 一、委托（Delegate）

委托是一种引用类型，用于封装方法。可以理解为方法的"指针"，但类型安全。

### 1. 定义和使用委托

```csharp
// 定义委托（指定方法签名）
public delegate int MathOperation(int a, int b);

// 匹配的方法
public static int Add(int x, int y) => x + y;
public static int Multiply(int x, int y) => x * y;

// 使用委托
MathOperation op = Add;          // 指向 Add 方法
int result = op(3, 5);           // 调用委托
Console.WriteLine(result);       // 8

op = Multiply;                   // 指向 Multiply 方法
result = op(3, 5);
Console.WriteLine(result);       // 15

// 也可以使用 new 语法（较少用）
MathOperation op2 = new MathOperation(Add);
```

### 2. 委托作为方法参数（回调）

```csharp
// 将委托作为参数传入
public static List<T> Filter<T>(List<T> items, Func<T, bool> predicate)
{
    List<T> result = new List<T>();
    foreach (T item in items)
    {
        if (predicate(item))  // 调用委托
            result.Add(item);
    }
    return result;
}

List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };

var evens = Filter(numbers, n => n % 2 == 0);  // 偶数
var bigs = Filter(numbers, n => n > 3);         // 大于 3

Console.WriteLine(string.Join(", ", evens));  // 2, 4, 6
Console.WriteLine(string.Join(", ", bigs));   // 4, 5, 6
```

### 3. 多播委托（Multicast Delegate）

一个委托可以引用多个方法，按顺序调用。

```csharp
public delegate void Notify(string message);

public static void LogToFile(string msg)
{
    Console.WriteLine($"写入文件：{msg}");
}

public static void LogToConsole(string msg)
{
    Console.WriteLine($"控制台：{msg}");
}

public static void SendEmail(string msg)
{
    Console.WriteLine($"发送邮件：{msg}");
}

// 多播：使用 += 添加多个方法
Notify notify = LogToFile;
notify += LogToConsole;
notify += SendEmail;

notify("系统启动完成");
// 输出：
// 写入文件：系统启动完成
// 控制台：系统启动完成
// 发送邮件：系统启动完成

// 移除方法
notify -= SendEmail;

// 获取调用列表
Delegate[] callbacks = notify.GetInvocationList();
Console.WriteLine($"注册的方法数：{callbacks.Length}");  // 2
```

### 4. 事件（Event）

事件是一种特殊的委托，用于实现发布-订阅模式。

```csharp
public class Button
{
    // 声明事件——外部只能 += 或 -=，不能直接赋值或调用
    public event EventHandler? Clicked;

    public void Click()
    {
        Console.WriteLine("按钮被点击");
        Clicked?.Invoke(this, EventArgs.Empty);  // 触发事件
    }
}

// 订阅事件
Button btn = new Button();
btn.Clicked += (sender, e) => Console.WriteLine("事件处理：按钮被点击了！");
btn.Clicked += (sender, e) => Console.WriteLine("事件处理：记录点击日志");

btn.Click();
// 输出：
// 按钮被点击
// 事件处理：按钮被点击了！
// 事件处理：记录点击日志
```

### 委托 vs 事件对比

|对比项|委托|事件|
|-|-|-|
|**外部赋值**|可以 `=` 覆盖|只能 `+=` / `-=`|
|**外部调用**|可在类外部直接调用|只能在声明类内部调用|
|**接口支持**|支持|支持|
|**安全性**|低（外部可随意修改）|高（封装性好）|
|**用途**|回调、策略|发布-订阅模式|

---

## 二、系统内置委托

C# 提供了泛型委托，无需自定义。

### 1. Action 委托

无返回值，可以有 0~16 个参数。

```csharp
Action sayHello = () => Console.WriteLine("Hello");
sayHello();  // Hello

Action<string, int> printInfo = (name, age) =>
    Console.WriteLine($"{name} 今年 {age} 岁");
printInfo("张三", 25);  // 张三 今年 25 岁

// 常见用途：传递操作
void ExecuteWithLog(Action action)
{
    Console.WriteLine($"[{DateTime.Now}] 开始执行...");
    action();
    Console.WriteLine($"[{DateTime.Now}] 执行完成");
}

ExecuteWithLog(() => Console.WriteLine("业务操作"));
```

### 2. Func 委托

有返回值，最后一个类型参数是返回值类型。

```csharp
Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(3, 5));  // 8

Func<string, int> getLength = s => s.Length;
Console.WriteLine(getLength("Hello"));  // 5

// 无参数但有返回值
Func<DateTime> now = () => DateTime.Now;
Console.WriteLine(now());  // 当前时间

// 常见用途：缓存或延迟计算
Lazy<int> lazyValue = new Lazy<int>(() =>
{
    Console.WriteLine("计算中...");
    return 42;
});
Console.WriteLine(lazyValue.Value);  // 计算中... 42
```

### 3. Predicate 委托

返回 `bool`，用于条件判断。

```csharp
Predicate<int> isEven = n => n % 2 == 0;
Console.WriteLine(isEven(4));  // True
Console.WriteLine(isEven(7));  // False

// 等同于 Func<T, bool>
Func<int, bool> isEven2 = n => n % 2 == 0;

// 经典用途：List.FindAll
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
List<int> evens = numbers.FindAll(n => n % 2 == 0);
```

### Action / Func / Predicate 对比

|委托|返回值|参数数量|用途|
|-|-|-|-|
|`Action`|无|0~16 个|执行操作，不返回值|
|`Action<T>`|无|1~16 个|带参数的操作|
|`Func<T, R>`|有|0~16 个|转换或计算（最后一个类型是返回值）|
|`Predicate<T>`|`bool`|1 个|条件判断|
|`Comparison<T>`|`int`|2 个|排序比较|

```csharp
// Comparison 示例
List<string> names = new List<string> { "张三丰", "李白", "白居易" };
names.Sort((a, b) => a.Length.CompareTo(b.Length));  // 按长度排序
```

---

## 三、Lambda 表达式

Lambda 表达式是创建匿名函数的简洁语法。

### 1. 基本语法

```csharp
// 完整形式：(参数列表) => { 语句体 }
// 简洁形式：(参数) => 表达式

// 无参数
Action greet = () => Console.WriteLine("Hello");

// 一个参数（可省略括号）
Func<int, int> square = x => x * x;

// 多个参数
Func<int, int, int> add = (a, b) => a + b;

// 显式指定参数类型
Func<int, int, string> format = (int a, int b) => $"{a} + {b} = {a + b}";

// 多行语句体
Action<string> process = name =>
{
    string upper = name.ToUpper();
    string lower = name.ToLower();
    Console.WriteLine($"{upper} / {lower}");
};
```

### 2. Lambda 演变过程

```csharp
// 步骤1：普通方法
static bool IsEven(int n) => n % 2 == 0;

// 步骤2：匿名方法（C# 2.0）
Predicate<int> isEven1 = delegate (int n) { return n % 2 == 0; };

// 步骤3：Lambda 表达式（C# 3.0+）——推荐
Predicate<int> isEven2 = n => n % 2 == 0;

// 演变：从 20 行 → 1 行
// List<int> evens = numbers.FindAll(IsEven);        // 方法
// List<int> evens = numbers.FindAll(delegate(int n) { return n % 2 == 0; });  // 匿名方法
List<int> evens = numbers.FindAll(n => n % 2 == 0);  // Lambda
```

### 3. Lambda 作为 LINQ 核心

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// LINQ 方法语法依赖 Lambda
var evens = numbers.Where(n => n % 2 == 0);
var squared = numbers.Select(n => n * n);
var sorted = numbers.OrderByDescending(n => n);
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "偶数" : "奇数");
var sum = numbers.Sum();
var firstBig = numbers.FirstOrDefault(n => n > 5);
```

---

## 四、闭包（Closure）

Lambda 可以捕获其定义范围内的变量，形成闭包。

### 1. 基本闭包

```csharp
int multiplier = 10;
Func<int, int> multiplyBy = x => x * multiplier;  // 捕获外部变量

Console.WriteLine(multiplyBy(5));  // 50

multiplier = 20;  // 修改变量
Console.WriteLine(multiplyBy(5));  // 100（捕获的是引用，不是值）
```

### 2. 生成计数器

```csharp
static Func<int> CreateCounter()
{
    int count = 0;
    return () => count++;  // 捕获 count 变量
}

Func<int> counter1 = CreateCounter();
Console.WriteLine(counter1());  // 0
Console.WriteLine(counter1());  // 1
Console.WriteLine(counter1());  // 2

Func<int> counter2 = CreateCounter();  // 新的闭包，独立于 counter1
Console.WriteLine(counter2());  // 0
```

### 3. 闭包陷阱和注意事项

```csharp
// ❌ 经典闭包陷阱：捕获循环变量
List<Action> actions = new List<Action>();
for (int i = 0; i < 5; i++)
{
    actions.Add(() => Console.WriteLine(i));
}
foreach (var action in actions)
    action();  // 输出：5, 5, 5, 5, 5（全部是 5！）

// ✅ 解决方法：捕获副本
actions.Clear();
for (int i = 0; i < 5; i++)
{
    int copy = i;  // 创建循环内局部变量副本
    actions.Add(() => Console.WriteLine(copy));
}
foreach (var action in actions)
    action();  // 输出：0, 1, 2, 3, 4

// C# 5.0+ 的 foreach 已修复此问题
List<Action> actions2 = new List<Action>();
foreach (int i in new int[] { 0, 1, 2, 3, 4 })
{
    actions2.Add(() => Console.WriteLine(i));
}
foreach (var action in actions2)
    action();  // 输出：0, 1, 2, 3, 4（foreach 没有这个问题）
```

---

## 五、匿名方法

Lambda 出现之前使用的语法（C# 2.0），现在基本被 Lambda 替代。

```csharp
// 匿名方法
Func<int, int, int> add = delegate (int a, int b)
{
    return a + b;
};

// Lambda（推荐——更简洁）
Func<int, int, int> add2 = (a, b) => a + b;

// 匿名方法可以省略参数列表（Lambda 不能）
Func<int, bool> check = delegate { return true; };
```

---

## 六、表达式树（Expression Tree）

```csharp
using System.Linq.Expressions;

// Lambda 可以赋值给 Expression<TDelegate> 类型
Expression<Func<int, int, int>> addExpr = (a, b) => a + b;

// 表达式树可以在运行时检查、修改和编译
// 编译为委托
Func<int, int, int> compiledAdd = addExpr.Compile();
Console.WriteLine(compiledAdd(3, 5));  // 8

// 表达式树可以分析结构（ORM 框架用于生成 SQL）
// Console.WriteLine(addExpr);  // 输出：(a, b) => a + b
```

> **Lambda 和表达式树的区别：** 赋值给 `Func<>` 的是可执行代码，赋值给 `Expression<>` 的是数据结构（可在运行时分 析和修改）。

---

## 七、综合案例

### 案例一：排序工具

```csharp
public class Student
{
    public string Name { get; set; }
    public int Score { get; set; }
    public int Age { get; set; }

    public override string ToString() => $"{Name}: {Score}分 ({Age}岁)";
}

// 使用 Lambda 进行灵活排序
var students = new List<Student>
{
    new Student { Name = "张三", Score = 85, Age = 20 },
    new Student { Name = "李四", Score = 92, Age = 22 },
    new Student { Name = "王五", Score = 78, Age = 19 },
    new Student { Name = "赵六", Score = 92, Age = 21 },
};

// 按分数排序
students.Sort((a, b) => a.Score.CompareTo(b.Score));
Console.WriteLine("按分数升序：" + string.Join(", ", students));

// 按分数降序，同分按年龄升序
students.Sort((a, b) =>
{
    int result = b.Score.CompareTo(a.Score);  // 分数降序
    return result != 0 ? result : a.Age.CompareTo(b.Age);  // 年龄升序
});
Console.WriteLine("按分数降序、年龄升序：" + string.Join(", ", students));

// 使用 LINQ OrderBy（不改变原列表）
var sorted = students.OrderByDescending(s => s.Score)
                     .ThenBy(s => s.Age);
```

### 案例二：管道处理模式

```csharp
public static class PipelineBuilder
{
    public static Func<T, T> BuildPipeline<T>(params Func<T, T>[] steps)
    {
        return input =>
        {
            T result = input;
            foreach (var step in steps)
                result = step(result);
            return result;
        };
    }
}

// 使用
Func<string, string> pipeline = PipelineBuilder.BuildPipeline(
    s => s.Trim(),                           // 去空格
    s => s.ToUpper(),                         // 转大写
    s => s.Replace(" ", "_"),                // 空格替换为下划线
    s => $"<{s}>"                            // 加标签
);

string result = pipeline("  Hello World  ");
Console.WriteLine(result);  // <HELLO_WORLD>
```

### 案例三：事件驱动数据处理

```csharp
public class DataProcessor
{
    // 定义事件
    public event Action<string>? OnDataReceived;
    public event Action<string>? OnError;
    public event Action? OnComplete;

    public void ProcessData(IEnumerable<string> data)
    {
        foreach (var item in data)
        {
            if (string.IsNullOrEmpty(item))
            {
                OnError?.Invoke("收到空数据");
                continue;
            }
            OnDataReceived?.Invoke($"处理: {item.ToUpper()}");
        }
        OnComplete?.Invoke();
    }
}

// 使用
var processor = new DataProcessor();

processor.OnDataReceived += data => Console.WriteLine(data);
processor.OnError += error => Console.WriteLine($"错误: {error}");
processor.OnComplete += () => Console.WriteLine("处理完成");

processor.ProcessData(new[] { "apple", "", "banana", null, "cherry" });
// 输出：
// 处理: APPLE
// 错误: 收到空数据
// 处理: BANANA
// 错误: 收到空数据
// 处理: CHERRY
// 处理完成
```

### 案例四：策略模式与 Lambda

```csharp
public class PriceCalculator
{
    private Func<decimal, decimal> _discountStrategy;

    public PriceCalculator(Func<decimal, decimal> discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void SetStrategy(Func<decimal, decimal> strategy)
    {
        _discountStrategy = strategy;
    }

    public decimal Calculate(decimal originalPrice)
    {
        return _discountStrategy(originalPrice);
    }
}

// 定义各种策略
Func<decimal, decimal> noDiscount = price => price;
Func<decimal, decimal> tenPercentOff = price => price * 0.9m;
Func<decimal, decimal> halfOff = price => price * 0.5m;
Func<decimal, decimal> fullReduction = price => price >= 100 ? price - 20 : price;

// 使用
var calculator = new PriceCalculator(noDiscount);
Console.WriteLine($"无折扣：{calculator.Calculate(100):C}");    // 100

calculator.SetStrategy(tenPercentOff);
Console.WriteLine($"九折：{calculator.Calculate(100):C}");      // 90

calculator.SetStrategy(fullReduction);
Console.WriteLine($"满减：{calculator.Calculate(100):C}");      // 80
```

---

## 核心知识点总结

### 委托定义方式

|方式|语法|示例|
|-|-|-|
|自定义委托|`delegate 返回类型 名称(参数)`|`delegate int Op(int a, int b)`|
|Action|无返回值|`Action<string> print`|
|Func|有返回值|`Func<int, int, int> add`|
|Predicate|返回 bool|`Predicate<int> isEven`|

### Lambda 语法形式

|形式|语法|示例|
|-|-|-|
|表达式 Lambda|`参数 => 表达式`|`x => x * x`|
|语句 Lambda|`参数 => { 语句 }`|`x => { return x * x; }`|
|无参 Lambda|`() => 表达式`|`() => DateTime.Now`|
|显式类型|`(类型 参数) => 表达式`|`(int x) => x * x`|

### 委托 vs 接口

|对比|委托|接口|
|-|-|-|
|**用途**|回调、事件、方法引用|能力合约、多态|
|**方法数量**|通常一个方法|多个相关方法|
|**实现**|方法引用|类实现|
|**多播**|支持（+=）|不支持|
|**事件**|原生支持|可以包含事件|

### 注意事项

1. **优先使用 `Func<>` 和 `Action<>`**——避免不必要地自定义委托
2. **Lambda 捕获的是变量引用**——不是值，注意闭包行为
3. **警惕循环变量捕获**——`for` 循环中需要创建副本，`foreach` 不需要
4. **事件比委托更安全**——外部只能 `+=` / `-=`，不能覆盖或触发
5. **Lambda 不要过长**——超过 2-3 行应提取为命名方法
6. **表达式树可用于运行时分析**——ORM（如 EF Core）利用此特性生成 SQL
7. **异步 Lambda**——`Func<Task>` 或 `async (x) => await ...`
8. **避免在大型闭包中捕获大量变量**——增加内存开销
