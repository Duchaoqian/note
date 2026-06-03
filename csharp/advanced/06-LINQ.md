# 06-LINQ（语言集成查询）

LINQ（Language Integrated Query）是 C# 中强大的数据查询功能，让可以用类似 SQL 的语法查询各种数据源（数组、集合、XML、数据库等）。

---

## 一、LINQ 基础

### 两种写法对照

```csharp
using System.Linq;

int[] numbers = { 5, 2, 8, 1, 9, 3, 6, 4, 7 };

// 方式一：查询语法（声明式，类似 SQL）
var query1 = from n in numbers
             where n > 5
             orderby n
             select n;

// 方式二：方法语法（Lambda + 扩展方法，更灵活）
var query2 = numbers.Where(n => n > 5)
                    .OrderBy(n => n);

// 结果相同
Console.WriteLine(string.Join(", ", query1));  // 6, 7, 8, 9
Console.WriteLine(string.Join(", ", query2));  // 6, 7, 8, 9
```

### 查询语法 vs 方法语法

|对比项|查询语法|方法语法|
|-|-|-|
|**可读性**|SQL 风格，直观|链式调用，需熟悉 Lambda|
|**灵活性**|有限（不支持所有操作）|高（所有操作都支持）|
|**复杂查询**|适合简单查询|适合复杂查询链|
|**推荐**|入门时使用|实际开发更常用|

> **建议：** 两种语法可以混用。简单查询使用查询语法，复杂查询使用方法语法。所有查询语法在编译时都会转换为方法语法。

---

## 二、延迟执行 vs 立即执行

### 延迟执行（Deferred Execution）

查询定义时不会执行，只在**遍历**时执行。

```csharp
List<int> numbers = new List<int> { 1, 2, 3 };

// 定义查询（不执行）
var query = numbers.Where(n => n > 1);

numbers.Add(4);  // 在遍历前修改源数据

// 遍历时执行
foreach (var n in query)
    Console.WriteLine(n);  // 输出：2, 3, 4（包含新添加的 4！）
```

### 立即执行（Immediate Execution）

调用特定方法会**立即执行**查询，结果被固定。

```csharp
var query = numbers.Where(n => n > 1);
var result = query.ToList();  // 立即执行，结果固定

numbers.Add(5);  // 修改原始集合

Console.WriteLine(result.Count);  // 3（还是原来的 2, 3, 4）
```

### 延迟 vs 立即执行方法

|延迟执行|立即执行|
|-|-|
|`Where`|`ToList()` / `ToArray()`|
|`Select` / `SelectMany`|`ToDictionary()` / `ToLookup()`|
|`OrderBy` / `ThenBy`|`Count()` / `LongCount()`|
|`Skip` / `Take`|`Sum()` / `Average()`|
|`Distinct`|`Min()` / `Max()`|
|`Union` / `Intersect` / `Except`|`First()` / `FirstOrDefault()`|
|`GroupBy`|`Last()` / `LastOrDefault()`|
|`Cast` / `OfType`|`Single()` / `SingleOrDefault()`|
|`Join` / `GroupJoin`|`Any()` / `All()` / `Contains()`|

---

## 三、常用 LINQ 操作

### 1. 筛选（Where）

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = numbers.Where(n => n % 2 == 0);           // 2, 4, 6, 8, 10
var range = numbers.Where(n => n >= 3 && n <= 7);     // 3, 4, 5, 6, 7

// 带索引的筛选
var indexed = numbers.Where((n, i) => n > 5 && i > 3);  // 索引大于 3 且值大于 5
```

### 2. 投影（Select）

```csharp
// 基本转换
var squares = numbers.Select(n => n * n);              // 1, 4, 9, 16...

// 投影到匿名类型
var studentInfos = students.Select(s => new
{
    s.Name,
    s.Score,
    IsPass = s.Score >= 60
});

// 索引投影
var indexed = numbers.Select((n, i) => $"索引{i}: {n}");

// SelectMany：展平嵌套集合
List<List<int>> nested = new List<List<int>>
{
    new List<int> { 1, 2, 3 },
    new List<int> { 4, 5 },
    new List<int> { 6 }
};
var flat = nested.SelectMany(list => list);  // 1, 2, 3, 4, 5, 6

// SelectMany 查询语法
var flatQuery = from sub in nested
                from item in sub
                select item;
```

### 3. 排序（OrderBy / ThenBy）

```csharp
// 单字段排序
var sorted = numbers.OrderBy(n => n);                // 升序
var sortedDesc = numbers.OrderByDescending(n => n);  // 降序

// 多字段排序
var multiSort = students
    .OrderBy(s => s.Grade)       // 先按年级
    .ThenByDescending(s => s.Score);  // 同年级按分数降序

// 查询语法排序
var query = from s in students
            orderby s.Grade, s.Score descending  // 升序默认，降序需写 descending
            select s;

// 反向
var reversed = numbers.Reverse();
```

### 4. 分组（GroupBy）

```csharp
class Student
{
    public string Name { get; set; }
    public string Grade { get; set; }
    public int Score { get; set; }
}

List<Student> students = new List<Student>
{
    new Student { Name = "张三", Grade = "A", Score = 85 },
    new Student { Name = "李四", Grade = "B", Score = 92 },
    new Student { Name = "王五", Grade = "A", Score = 78 },
    new Student { Name = "赵六", Grade = "B", Score = 95 },
    new Student { Name = "孙七", Grade = "A", Score = 68 }
};

// 按年级分组
var grouped = students.GroupBy(s => s.Grade);

foreach (var group in grouped)
{
    Console.WriteLine($"年级 {group.Key}：{group.Count()} 人，平均分 {group.Average(s => s.Score):F1}");
    foreach (var student in group)
        Console.WriteLine($"  {student.Name}：{student.Score}");
}

// 查询语法分组 + 聚合
var query = from s in students
            group s by s.Grade into g
            select new
            {
                Grade = g.Key,
                Count = g.Count(),
                AvgScore = g.Average(s => s.Score),
                MaxScore = g.Max(s => s.Score),
                TopStudent = g.OrderByDescending(s => s.Score).First().Name
            };

foreach (var item in query)
    Console.WriteLine($"{item.Grade}: {item.Count}人, 均分{item.AvgScore:F1}, 最高{item.MaxScore}, 第一{item.TopStudent}");
```

### 5. 连接（Join）

```csharp
class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
}

class Order
{
    public int Id { get; set; }
    public string Product { get; set; }
    public int CustomerId { get; set; }
    public decimal Price { get; set; }
}

List<Customer> customers = new List<Customer>
{
    new Customer { Id = 1, Name = "张三" },
    new Customer { Id = 2, Name = "李四" },
    new Customer { Id = 3, Name = "王五" }
};

List<Order> orders = new List<Order>
{
    new Order { Id = 101, Product = "手机", CustomerId = 1, Price = 2999 },
    new Order { Id = 102, Product = "电脑", CustomerId = 2, Price = 5999 },
    new Order { Id = 103, Product = "耳机", CustomerId = 1, Price = 199 },
    new Order { Id = 104, Product = "鼠标", CustomerId = 3, Price = 99 }
};

// 内连接：只返回有匹配的数据
var innerJoin = from o in orders
                join c in customers on o.CustomerId equals c.Id
                select new { c.Name, o.Product, o.Price };

Console.WriteLine("=== 订单列表 ===");
foreach (var item in innerJoin)
    Console.WriteLine($"{item.Name} 购买了 {item.Product}（{item.Price:C}）");

// 方法语法 Join
var joinMethod = orders.Join(customers,
    o => o.CustomerId,
    c => c.Id,
    (o, c) => new { c.Name, o.Product, o.Price });

// 左连接：使用 DefaultIfEmpty 实现
var leftJoin = from c in customers
               join o in orders on c.Id equals o.CustomerId into customerOrders
               from o in customerOrders.DefaultIfEmpty()
               select new { c.Name, Product = o?.Product ?? "(无订单)" };

Console.WriteLine("\n=== 客户订单（左连接）===");
foreach (var item in leftJoin)
    Console.WriteLine($"{item.Name}: {item.Product}");
```

### 6. 聚合操作

```csharp
int[] scores = { 85, 92, 78, 95, 88 };

Console.WriteLine($"元素数：     {scores.Count()}");       // 5
Console.WriteLine($"求和：       {scores.Sum()}");         // 438
Console.WriteLine($"平均值：     {scores.Average():F2}");  // 87.60
Console.WriteLine($"最小值：     {scores.Min()}");         // 78
Console.WriteLine($"最大值：     {scores.Max()}");         // 95

// Aggregate：自定义聚合
// 计算乘积：1 * 2 * 3 * 4 * 5 = 120
int[] numbers = { 1, 2, 3, 4, 5 };
int product = numbers.Aggregate((acc, n) => acc * n);
Console.WriteLine($"乘积：{product}");  // 120

// Aggregate 带种子值
int result = numbers.Aggregate(10, (acc, n) => acc + n);
Console.WriteLine($"总和（初始10）：{result}");  // 25

// 带筛选的聚合
Console.WriteLine($"90分以上人数：{scores.Where(s => s >= 90).Count()}");  // 2
Console.WriteLine($"90分以上平均：{scores.Where(s => s >= 90).Average()}");  // 93.5
```

---

## 四、集合操作（Set Operations）

```csharp
int[] set1 = { 1, 2, 3, 4, 5 };
int[] set2 = { 4, 5, 6, 7, 8 };

var union = set1.Union(set2);          // 并集：1,2,3,4,5,6,7,8
var intersect = set1.Intersect(set2);  // 交集：4,5
var except = set1.Except(set2);        // 差集（在 set1 但不在 set2）：1,2,3
var symmetric = set1.Union(set2).Except(set1.Intersect(set2)); // 对称差集：1,2,3,6,7,8

// 去重
int[] duplicates = { 1, 2, 2, 3, 3, 3, 4 };
var distinct = duplicates.Distinct();  // 1, 2, 3, 4
```

---

## 五、分页和元素操作

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// 分页
int pageSize = 3;
int pageIndex = 2;
var page = numbers
    .Skip((pageIndex - 1) * pageSize)  // 跳过前 3 个
    .Take(pageSize);                   // 取 3 个（4, 5, 6）

// Take 和 Skip 的其他用法
var first3 = numbers.Take(3);            // 1, 2, 3
var skip3 = numbers.Skip(3);             // 4, 5, 6, 7, 8, 9, 10
var last3 = numbers.TakeLast(3);         // 8, 9, 10（.NET 6+）
var skipLast3 = numbers.SkipLast(3);     // 1, 2, 3, 4, 5, 6, 7（.NET 6+）

// 条件跳转
var whileCondition = numbers.TakeWhile(n => n < 5);  // 1, 2, 3, 4
var skipWhileCondition = numbers.SkipWhile(n => n < 5);  // 5, 6, 7, 8, 9, 10

// 元素访问
var first = numbers.First();                             // 1
var firstOr = numbers.FirstOrDefault(n => n > 100);     // 0（默认值）
var last = numbers.Last();                               // 10
var lastOr = numbers.LastOrDefault(n => n < 0);         // 0
var single = numbers.Single(n => n == 5);               // 5（唯一匹配）
var elementAt = numbers.ElementAt(3);                   // 4（索引访问）
var elementAtOr = numbers.ElementAtOrDefault(100);      // 0（超出范围返回默认值）
```

---

## 六、判断和检查

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

bool any = numbers.Any(n => n > 3);         // True（是否存在大于 3 的数）
bool all = numbers.All(n => n > 0);         // True（是否所有数都大于 0）
bool contains = numbers.Contains(3);        // True（是否包含 3）

// SequenceEqual：比较两个序列是否相同
int[] other = { 1, 2, 3, 4, 5 };
bool equal = numbers.SequenceEqual(other);  // True
```

---

## 七、Zip 操作符

将两个序列按位置合并。

```csharp
string[] names = { "张三", "李四", "王五" };
int[] scores = { 85, 92, 78 };

// Zip：合并两个序列
var zipped = names.Zip(scores, (name, score) => $"{name}: {score}分");
foreach (var item in zipped)
    Console.WriteLine(item);  // 张三: 85分, 李四: 92分, 王五: 78分

// 三元组合（.NET 6+）
string[] grades = { "A", "A+", "B" };
var triple = names.Zip(scores, grades)
    .Select(x => $"{x.First}: {x.Second}分 ({x.Third})");
foreach (var item in triple)
    Console.WriteLine(item);  // 张三: 85分 (A), 李四: 92分 (A+), 王五: 78分 (B)
```

---

## 八、LINQ 和 IEnumerable vs IQueryable

```csharp
// IEnumerable<T>：在内存中执行（LINQ to Objects）
IEnumerable<Product> inMemory = products.Where(p => p.Price > 100);
// 筛选在内存中进行，所有数据已加载

// IQueryable<T>：延迟到数据源执行（LINQ to SQL/EF Core）
IQueryable<Product> database = dbContext.Products.Where(p => p.Price > 100);
// 会生成 SQL：SELECT * FROM Products WHERE Price > 100
// 只在数据库层面返回符合条件的（效率高）
```

|对比|`IEnumerable<T>`|`IQueryable<T>`|
|-|-|-|
|**执行位置**|内存中|数据源（数据库等）|
|**适用**|内存集合|外部数据源（数据库、Web 服务）|
|**查询构建**|委托|表达式树（Expression Tree）|
|**性能**|将所有数据加载到内存再筛选|在数据源端筛选，仅返回结果|

```csharp
// 重要区别示例
IEnumerable<Product> enumerable = products.Where(p => p.Price > 100);
// C# 代码：遍历所有产品，在内存中筛选

IQueryable<Product> queryable = dbContext.Products.Where(p => p.Price > 100);
// 生成 SQL：SELECT * FROM Products WHERE Price > 100
// 只在数据库执行，减少数据传输
```

---

## 九、LINQ 性能注意事项

```csharp
// 1. 避免多次枚举
IEnumerable<int> query = numbers.Where(n => n > 5);

// ❌ 多次枚举导致重复执行
int count = query.Count();        // 第一次遍历
int sum = query.Sum();            // 第二次遍历
int max = query.Max();            // 第三次遍历

// ✅ 先 ToList 缓存结果
var cached = query.ToList();
int count2 = cached.Count;
int sum2 = cached.Sum();
int max2 = cached.Max;

// 2. 复杂计算前先过滤
// ❌ 先 Select 再 Where——做了不必要的计算
var bad = numbers.Select(ExpensiveOperation).Where(x => x > 100);

// ✅ 先 Where 再 Select——减少计算量
var good = numbers.Where(n => n > 10).Select(ExpensiveOperation);

// 3. 使用 Any 而非 Count > 0 判断是否存在
// ❌ Count() 需要遍历全部
if (query.Count() > 0) { }

// ✅ Any() 找到第一个就返回
if (query.Any()) { }

// 4. 大集合考虑使用并行 LINQ（PLINQ）
var parallelResult = numbers.AsParallel()
    .Where(n => ExpensiveCondition(n))
    .ToArray();
```

---

## 十、综合案例

### 案例一：销售报表分析

```csharp
public class SaleRecord
{
    public string Product { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public DateTime Date { get; set; }
    public string SalesPerson { get; set; }
}

List<SaleRecord> sales = new List<SaleRecord>
{
    new SaleRecord { Product = "手机", Category = "电子", Price = 2999, Quantity = 5, Date = new DateTime(2024, 1, 15), SalesPerson = "张三" },
    new SaleRecord { Product = "电脑", Category = "电子", Price = 5999, Quantity = 2, Date = new DateTime(2024, 1, 20), SalesPerson = "李四" },
    new SaleRecord { Product = "手机", Category = "电子", Price = 2999, Quantity = 3, Date = new DateTime(2024, 2, 10), SalesPerson = "张三" },
    new SaleRecord { Product = "铅笔", Category = "文具", Price = 2, Quantity = 100, Date = new DateTime(2024, 2, 15), SalesPerson = "王五" },
    new SaleRecord { Product = "笔记本", Category = "文具", Price = 5, Quantity = 50, Date = new DateTime(2024, 3, 5), SalesPerson = "王五" },
    new SaleRecord { Product = "耳机", Category = "电子", Price = 199, Quantity = 10, Date = new DateTime(2024, 3, 20), SalesPerson = "李四" },
};

// 报表1：按类别统计销售额和利润
var categoryReport = sales
    .GroupBy(s => s.Category)
    .Select(g => new
    {
        Category = g.Key,
        TotalSales = g.Sum(s => s.Price * s.Quantity),
        TotalQuantity = g.Sum(s => s.Quantity),
        AvgPrice = g.Average(s => s.Price),
        ProductCount = g.Select(s => s.Product).Distinct().Count()
    })
    .OrderByDescending(r => r.TotalSales);

Console.WriteLine("=== 类别销售报表 ===");
foreach (var r in categoryReport)
    Console.WriteLine($"{r.Category}: 销售额 {r.TotalSales:C}，数量 {r.TotalQuantity}，均价 {r.AvgPrice:C}");

// 报表2：个人销售排行
var personReport = sales
    .GroupBy(s => s.SalesPerson)
    .Select(g => new
    {
        Person = g.Key,
        TotalSales = g.Sum(s => s.Price * s.Quantity),
        Orders = g.Count(),
        AvgOrderValue = g.Average(s => s.Price * s.Quantity)
    })
    .OrderByDescending(r => r.TotalSales);

Console.WriteLine("\n=== 个人销售排行 ===");
foreach (var r in personReport)
    Console.WriteLine($"{r.Person}: 总销售额 {r.TotalSales:C}，{r.Orders} 单，均单 {r.AvgOrderValue:C}");

// 报表3：月度趋势
var monthlyTrend = sales
    .GroupBy(s => new { s.Date.Year, s.Date.Month })
    .Select(g => new
    {
        Period = $"{g.Key.Year}-{g.Key.Month:D2}",
        TotalSales = g.Sum(s => s.Price * s.Quantity),
        TopProduct = g.GroupBy(s => s.Product)
                      .OrderByDescending(pg => pg.Sum(s => s.Quantity))
                      .First().Key
    })
    .OrderBy(r => r.Period);

Console.WriteLine("\n=== 月度趋势 ===");
foreach (var r in monthlyTrend)
    Console.WriteLine($"{r.Period}: 销售额 {r.TotalSales:C}，热销 {r.TopProduct}");
```

### 案例二：对象集合复杂查询

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
    public DateTime JoinDate { get; set; }
    public bool IsActive { get; set; }
}

List<Employee> employees = new List<Employee>
{
    new Employee { Id = 1, Name = "张三", Department = "技术部", Salary = 15000, JoinDate = new DateTime(2020, 3, 1), IsActive = true },
    new Employee { Id = 2, Name = "李四", Department = "市场部", Salary = 12000, JoinDate = new DateTime(2021, 6, 15), IsActive = true },
    new Employee { Id = 3, Name = "王五", Department = "技术部", Salary = 18000, JoinDate = new DateTime(2019, 1, 10), IsActive = true },
    new Employee { Id = 4, Name = "赵六", Department = "人事部", Salary = 10000, JoinDate = new DateTime(2022, 9, 1), IsActive = false },
    new Employee { Id = 5, Name = "孙七", Department = "市场部", Salary = 13000, JoinDate = new DateTime(2023, 4, 20), IsActive = true },
};

// 查询活跃员工中工资高于部门平均的员工
var highEarners = employees
    .Where(e => e.IsActive)
    .GroupBy(e => e.Department)
    .SelectMany(g =>
    {
        decimal deptAvg = g.Average(e => e.Salary);
        return g.Where(e => e.Salary > deptAvg)
                .Select(e => new { e.Name, e.Department, e.Salary, DeptAvg = deptAvg });
    });

Console.WriteLine("=== 高于部门平均工资的员工 ===");
foreach (var e in highEarners)
    Console.WriteLine($"{e.Name}({e.Department}): {e.Salary:C} > 平均 {e.DeptAvg:C}");

// 员工工龄分析
var seniority = employees
    .Select(e => new
    {
        e.Name,
        e.Department,
        YearsOfService = (DateTime.Now.Year - e.JoinDate.Year),
        e.Salary,
        Efficiency = e.Salary / Math.Max(1, (DateTime.Now.Year - e.JoinDate.Year))
    })
    .OrderByDescending(e => e.YearsOfService);

Console.WriteLine("\n=== 员工工龄分析 ===");
foreach (var e in seniority)
    Console.WriteLine($"{e.Name}: {e.YearsOfService}年, 工资 {e.Salary:C}");
```

### 案例三：LINQ 数据转换管道

```csharp
// 构建数据处理管道
public static class DataPipeline
{
    public static List<T> Process<T>(
        IEnumerable<T> source,
        params Func<IEnumerable<T>, IEnumerable<T>>[] transforms)
    {
        IEnumerable<T> result = source;
        foreach (var transform in transforms)
            result = transform(result);
        return result.ToList();
    }
}

// 使用
int[] data = { 5, 3, 8, 1, 9, 2, 7, 4, 6, 10 };

var processed = DataPipeline.Process(
    data,
    items => items.Where(n => n > 3),           // 过滤
    items => items.OrderByDescending(n => n),   // 降序
    items => items.Select(n => n * 10),         // 转换
    items => items.Take(5)                      // 取前5个
);

Console.WriteLine(string.Join(", ", processed));  // 100, 90, 80, 70, 60
```

---

## 核心知识点总结

### LINQ 操作分类

|分类|操作符|用途|
|-|-|-|
|**筛选**|`Where`、`OfType`|条件过滤|
|**投影**|`Select`、`SelectMany`|数据转换/展平|
|**排序**|`OrderBy`、`OrderByDescending`、`ThenBy`、`Reverse`|排序|
|**分组**|`GroupBy`、`ToLookup`|分组聚合|
|**连接**|`Join`、`GroupJoin`|多表关联|
|**聚合**|`Count`、`Sum`、`Average`、`Min`、`Max`、`Aggregate`|统计计算|
|**集合**|`Distinct`、`Union`、`Intersect`、`Except`|集合运算|
|**分页**|`Skip`、`Take`、`SkipWhile`、`TakeWhile`|分页/截取|
|**元素**|`First`、`Last`、`Single`、`ElementAt`|取单个元素|
|**判断**|`Any`、`All`、`Contains`、`SequenceEqual`|条件判断|
|**转换**|`ToList`、`ToArray`、`ToDictionary`、`Cast`|类型转换|

### 查询语法 vs 方法语法对照

|操作|查询语法|方法语法|
|-|-|-|
|筛选|`where n > 5`|`.Where(n => n > 5)`|
|投影|`select n.Name`|`.Select(n => n.Name)`|
|排序|`orderby n.Name descending`|`.OrderByDescending(n => n.Name)`|
|分组|`group n by n.Key`|`.GroupBy(n => n.Key)`|
|连接|`join ... in ... on ... equals ...`|`.Join()`|
|Let 变量|`let x = expr`|链式调用 + 匿名类型|
|Into|`group ... into g`|`GroupBy` 后的 `Select`|

### 延迟执行注意事项

1. **查询在遍历时执行**——不是定义时
2. **多次遍历导致多次执行**——需要缓存结果用 `ToList()`
3. **原始数据变更影响查询结果**——延迟执行会读取当前数据
4. **谨慎在 foreach 中修改源集合**——可能引发 `InvalidOperationException`

### 性能建议

|建议|原因|
|-|-|
|先过滤后转换|减少不必要的计算|
|使用 `Any()` 而非 `Count() > 0`|`Any()` 找到第一个就返回|
|多次枚举先 `ToList()`|避免重复执行查询|
|大集合使用 PLINQ|`AsParallel()` 充分利用多核|
|IQueryable 优先在数据库端筛选|减少数据传输量|
|复杂计算时使用 `let` 子句|避免重复计算|
|谨慎在循环中使用 LINQ|每次循环都重新执行查询|
