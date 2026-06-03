# 14-集合：List 和 ArrayList

集合用于存储和管理一组数据。C# 提供了多种集合类型，`List<T>` 和 `ArrayList` 是最常用的线性表集合。

---

## 一、数组 vs 集合：为什么需要集合？

|对比项|数组（Array）|集合（List\<T>）|
|-|-|-|
|**长度**|固定，创建后不可变|动态增长，自动扩容|
|**类型安全**|是（声明时指定类型）|是（泛型）|
|**增删元素**|不方便（需创建新数组）|方便（Add/Remove/Insert）|
|**性能**|好（内存连续）|好（内部也是数组）|

```csharp
// 数组：长度固定，要添加新元素很麻烦
int[] arr = { 1, 2, 3 };
// 要添加第4个元素，必须创建新数组
int[] newArr = new int[4];
Array.Copy(arr, newArr, 3);
newArr[3] = 4;

// List<T>：直接添加即可
List<int> list = new List<int> { 1, 2, 3 };
list.Add(4);  // 简单明了
```

---

## 二、List\<T>（泛型列表）

`List<T>` 是强类型泛型集合，位于 `System.Collections.Generic` 命名空间。

### 1. 创建和初始化

```csharp
using System.Collections.Generic;

// 空列表
List<int> numbers = new List<int>();

// 指定初始容量（已知数据量时优化性能）
List<int> withCapacity = new List<int>(100);

// 集合初始化器
List<string> fruits = new List<string> { "苹果", "香蕉", "橘子" };

// 从数组或 IEnumerable 创建
int[] arr = { 1, 2, 3 };
List<int> fromArray = new List<int>(arr);

// 使用 Enumerable.Range
List<int> range = Enumerable.Range(1, 10).ToList();  // {1,2,3,...,10}
```

### 2. 常用成员速查

|成员|说明|时间复杂度|
|-|-|-|
|`Add(item)`|末尾添加元素|O(1)（大多数情况）|
|`AddRange(collection)`|批量添加|O(n)|
|`Insert(index, item)`|指定位置插入|O(n)（需要移动元素）|
|`Remove(item)`|删除第一个匹配项|O(n)|
|`RemoveAt(index)`|按索引删除|O(n)（需移动后续元素）|
|`RemoveAll(match)`|删除所有匹配项|O(n)|
|`Clear()`|清空所有元素|O(n)|
|`Contains(item)`|判断是否包含|O(n)|
|`IndexOf(item)`|查找索引|O(n)|
|`Find(predicate)`|查找第一个匹配|O(n)|
|`FindAll(predicate)`|查找全部匹配|O(n)|
|`Sort()`|排序|O(n log n)|
|`Reverse()`|反转顺序|O(n)|
|`ToArray()`|转换为数组|O(n)|
|`Count`|元素个数（属性）|O(1)|
|`Capacity`|内部容量（属性）|O(1)|
|`[index]`|通过索引访问|O(1)|

### 3. 基本操作

```csharp
List<string> list = new List<string>();

// 添加
list.Add("C#");
list.Add("Java");
list.Add("Python");
list.Add("C#");  // List 允许重复元素

// 插入
list.Insert(1, "JavaScript");  // 在索引1处插入

// 访问
string first = list[0];        // 通过索引访问
Console.WriteLine(first);      // 输出：C#

// 修改
list[0] = "CSharp";

// 遍历
foreach (string item in list)
    Console.WriteLine(item);

// for 遍历（需要索引时）
for (int i = 0; i < list.Count; i++)
    Console.WriteLine($"[{i}] {list[i]}");

// 删除
list.Remove("C#");         // 删除第一个匹配的 C#
list.RemoveAt(0);          // 删除索引0的元素
list.RemoveRange(0, 2);    // 删除索引0开始的2个元素
list.RemoveAll(x => x.StartsWith("J"));  // 删除所有以J开头的

// 判断包含
if (list.Contains("Python"))
    Console.WriteLine("Python 在列表中");
```

### 4. 查找和筛选

```csharp
List<int> numbers = new List<int> { 3, 7, 1, 9, 4, 7, 2, 8 };

// Find：只找第一个匹配
int firstEven = numbers.Find(n => n % 2 == 0);        // 4

// FindLast：从后找第一个匹配
int lastEven = numbers.FindLast(n => n % 2 == 0);     // 8

// FindIndex：找匹配的索引
int idx = numbers.FindIndex(n => n > 5);              // 1（7的位置）

// FindAll：找出所有匹配
List<int> evens = numbers.FindAll(n => n % 2 == 0);  // {4, 2, 8}

// Exists：判断是否存在
bool hasBig = numbers.Exists(n => n > 8);             // true（存在9）

// TrueForAll：是否全部满足
bool allPositive = numbers.TrueForAll(n => n > 0);     // true
```

### 5. 排序

```csharp
List<int> numbers = new List<int> { 5, 2, 8, 1, 9 };

// 升序
numbers.Sort();             // {1, 2, 5, 8, 9}

// 降序（先用 Sort 升序，再 Reverse）
numbers.Sort();
numbers.Reverse();          // {9, 8, 5, 2, 1}

// 自定义排序规则（使用 Comparison 委托）
numbers.Sort((a, b) => b.CompareTo(a));  // 降序

// 自定义对象排序
List<Person> people = new List<Person>
{
    new Person { Name = "张三", Age = 25 },
    new Person { Name = "李四", Age = 20 },
    new Person { Name = "王五", Age = 30 }
};

// 按年龄排序
people.Sort((a, b) => a.Age.CompareTo(b.Age));

// 先按年龄降序，同龄按姓名排序
people.Sort((a, b) =>
{
    int ageCompare = b.Age.CompareTo(a.Age);
    return ageCompare != 0 ? ageCompare : a.Name.CompareTo(b.Name);
});
```

### 6. List 容量机制（重要）

```csharp
List<int> list = new List<int>();
Console.WriteLine($"初始容量：{list.Capacity}");  // 0

list.Add(1);
Console.WriteLine($"添加1个元素后容量：{list.Capacity}");  // 4

for (int i = 0; i < 4; i++) list.Add(i);
Console.WriteLine($"容量满后：{list.Capacity}");  // 4

list.Add(100);  // 触发扩容
Console.WriteLine($"扩容后：{list.Capacity}");  // 8（翻倍）

// 手动优化
list.Capacity = 1000;  // 预先分配1000个空间
list.TrimExcess();     // 去除多余容量（使 Capacity 接近 Count）
```

> **扩容机制：** List 内部使用数组存储，当元素数量超过 Capacity 时，会创建**原来 2 倍**大小的新数组，并复制所有元素。频繁扩容影响性能，已知数据量时应预先设置 Capacity。

### 7. 存储自定义类型

```csharp
class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
    public int Score { get; set; }

    public override string ToString() => $"{Name}，{Age}岁，成绩：{Score}";
}

List<Student> students = new List<Student>
{
    new Student { Name = "张三", Age = 20, Score = 85 },
    new Student { Name = "李四", Age = 22, Score = 92 },
    new Student { Name = "王五", Age = 21, Score = 78 },
    new Student { Name = "赵六", Age = 20, Score = 95 }
};

// 查找
Student top = students.Find(s => s.Score >= 90);  // 第一个90分以上的
List<Student> adults = students.FindAll(s => s.Age > 20);

// 排序（按成绩降序）
students.Sort((a, b) => b.Score.CompareTo(a.Score));

// 转换（提取姓名列表）
List<string> names = students.ConvertAll(s => s.Name);

// 输出
students.ForEach(s => Console.WriteLine(s));
```

---

## 三、ArrayList（非泛型列表）

`ArrayList` 位于 `System.Collections`，可以存储**任意类型**元素，但不是类型安全的，且值类型有装箱拆箱开销。

> **建议：** 新代码永远使用 `List<T>` 而不是 `ArrayList`。

### 基本用法

```csharp
using System.Collections;

ArrayList list = new ArrayList();

// 可以混搭不同类型
list.Add(10);                    // int → 装箱为 object
list.Add("Hello");               // string（已是引用类型，无需装箱）
list.Add(3.14);                  // double → 装箱
list.Add(true);                  // bool → 装箱
list.Add(new Student());         // 自定义对象

// 遍历
foreach (object item in list)
    Console.WriteLine(item);

// 取出时必须强制类型转换（危险！）
int num = (int)list[0];           // 拆箱（如果类型不对会异常）
string str = (string)list[1];    // 强制类型转换
```

### ArrayList vs List\<T> 详细对比

|对比项|`List<T>`|`ArrayList`|
|-|-|-|
|**命名空间**|`System.Collections.Generic`|`System.Collections`|
|**类型安全**|是（编译时检查）|否（运行时才知类型错误）|
|**值类型性能**|高（直接存储）|低（装箱拆箱）|
|**代码可读性**|高（明确类型）|低（全是 object）|
|**推荐程度**|✅ 首选|❌ 仅用于兼容旧代码|

### 装箱拆箱性能演示

```csharp
const int count = 10_000_000;

// List<T>：值类型直接存储，无需装箱
List<int> listGeneric = new List<int>();
Stopwatch sw1 = Stopwatch.StartNew();
for (int i = 0; i < count; i++)
    listGeneric.Add(i);
sw1.Stop();
Console.WriteLine($"List<T> 耗时：{sw1.ElapsedMilliseconds}ms");

// ArrayList：每次添加都要装箱
ArrayList listNonGeneric = new ArrayList();
Stopwatch sw2 = Stopwatch.StartNew();
for (int i = 0; i < count; i++)
    listNonGeneric.Add(i);  // 装箱
sw2.Stop();
Console.WriteLine($"ArrayList 耗时：{sw2.ElapsedMilliseconds}ms");
// List<T> 通常比 ArrayList 快 5~10 倍
```

---

## 四、List\<T> vs 数组 选择指南

|使用场景|推荐选择|
|-|-|
|固定数量的元素|`数组`|
|需要动态增删|`List<T>`|
|高性能只读遍历|`数组`（略快）|
|需要频繁插入/删除中间元素|都不合适 → `LinkedList<T>`|
|需要类型安全|两者都是|
|需要丰富的方法（查找、排序等）|`List<T>`|

---

## 五、综合案例

### 案例：学生成绩管理系统

```csharp
class Program
{
    static List<Student> students = new List<Student>();

    static void Main()
    {
        // 初始化数据
        students.AddRange(new[]
        {
            new Student { Name = "张三", Score = 85, Grade = "A" },
            new Student { Name = "李四", Score = 92, Grade = "A" },
            new Student { Name = "王五", Score = 78, Grade = "B" },
            new Student { Name = "赵六", Score = 95, Grade = "A" },
            new Student { Name = "钱七", Score = 55, Grade = "B" },
            new Student { Name = "孙八", Score = 70, Grade = "C" },
        });

        // 1. 按成绩排序（降序）
        var scoreRank = students.OrderByDescending(s => s.Score).ToList();
        Console.WriteLine("=== 成绩排名 ===");
        for (int i = 0; i < scoreRank.Count; i++)
            Console.WriteLine($"第{i + 1}名：{scoreRank[i].Name} - {scoreRank[i].Score}分");

        // 2. 筛选及格学生
        var passed = students.FindAll(s => s.Score >= 60);
        Console.WriteLine($"\n=== 及格人数：{passed.Count}/{students.Count} ===");

        // 3. 按年级分组统计
        var groups = students.GroupBy(s => s.Grade);
        Console.WriteLine("\n=== 年级统计 ===");
        foreach (var g in groups)
        {
            Console.WriteLine($"{g.Key}班：{g.Count()}人，平均分{g.Average(s => s.Score):F1}");
        }

        // 4. 获取优秀学生名单（90分以上）
        List<string> honorRoll = students
            .Where(s => s.Score >= 90)
            .OrderBy(s => s.Name)
            .Select(s => s.Name)
            .ToList();
        Console.WriteLine($"\n优秀学生：{string.Join("、", honorRoll)}");

        // 5. 删除不及格学生
        int removed = students.RemoveAll(s => s.Score < 60);
        Console.WriteLine($"删除 {removed} 名不及格学生");
    }
}
```

---

## 核心知识点总结

### List\<T> 核心操作

```csharp
list.Add(item);               // 添加
list.Remove(item);            // 删除（按值）
list.RemoveAt(index);         // 删除（按索引）
list.Insert(index, item);     // 插入
list.Sort();                  // 排序
list.Find(predicate);         // 查找
list.FindAll(predicate);      // 筛选
list.Contains(item);          // 包含
list.Clear();                 // 清空
list.Count                    // 元素个数
list[index]                   // 索引访问
```

### 注意事项

1. **优先使用 `List<T>`** 而非 `ArrayList`
2. **容量优化**：已知数据量时预分配 `new List<T>(capacity)`
3. **遍历时不能修改**：`foreach` 中不能增删元素，用 `for` 代替
4. **List 是引用类型**：赋值传递的是引用，不是副本
5. **Contains/Find 使用相等比较**：自定义类需重写 `Equals`
6. **Sort 会修改原列表**：如需保留原顺序，先复制再排序
