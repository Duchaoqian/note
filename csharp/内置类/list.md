# C# List

## 概述
List\<T> 是 C# 中最常用的泛型集合之一，它提供了动态数组的功能，可以存储相同类型的元素，并支持多种操作。本文档将全面介绍 List\<T> 的所有主要属性和方法。

## 属性

### Count
- **描述**: 获取 List 中实际包含的元素数量
- **类型**: `int`
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange"};
Console.WriteLine(fruits.Count); // 输出: 3
```

### Capacity
- **描述**: 获取或设置 List 内部数据结构在不调整大小的情况下能够容纳的元素总数
- **类型**: `int`
- **注意**: Capacity 总是大于或等于 Count
- **示例**:
```csharp
List<int> numbers = new List<int>(10);
Console.WriteLine(numbers.Capacity); // 输出: 10
numbers.Capacity = 20; // 显式设置容量
```

## 方法

### 添加元素

#### Add(T item)
- **描述**: 将对象添加到 List 的末尾
- **参数**: 
  - `item`: 要添加到 List 末尾的对象
- **时间复杂度**: 平摊 O(1)
- **示例**:
```csharp
List<int> numbers = new List<int>();
numbers.Add(1);
numbers.Add(2);
// numbers 现在包含 [1, 2]
```

#### AddRange(IEnumerable\<T> collection)
- **描述**: 将指定集合的元素添加到 List 的末尾
- **参数**:
  - `collection`: 应将其元素添加到 List 末尾的集合
- **时间复杂度**: O(n)，其中 n 是要添加的元素数量
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2};
int[] moreNumbers = {3, 4, 5};
numbers.AddRange(moreNumbers);
// numbers 现在包含 [1, 2, 3, 4, 5]
```

#### Insert(int index, T item)
- **描述**: 将元素插入 List 的指定索引处
- **参数**:
  - `index`: 应插入 item 的从零开始的索引
  - `item`: 要插入的对象
- **异常**: 如果 index 小于 0 或大于 Count，则抛出 ArgumentOutOfRangeException
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana"};
fruits.Insert(1, "Orange");
// fruits 现在包含 ["Apple", "Orange", "Banana"]
```

#### InsertRange(int index, IEnumerable\<T> collection)
- **描述**: 将集合中的元素插入 List 的指定索引处
- **参数**:
  - `index`: 应插入新元素的从零开始的索引
  - `collection`: 应将其元素插入到 List 中的集合
- **时间复杂度**: O(n + m)，其中 n 是 index 之后的元素数量，m 是要插入的元素数量
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 5};
int[] moreNumbers = {2, 3, 4};
numbers.InsertRange(1, moreNumbers);
// numbers 现在包含 [1, 2, 3, 4, 5]
```

### 移除元素

#### Remove(T item)
- **描述**: 从 List 中移除特定对象的第一个匹配项
- **参数**:
  - `item`: 要从 List 中移除的对象
- **返回值**: 如果成功移除 item，则为 true；否则为 false
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange"};
bool removed = fruits.Remove("Banana"); // removed = true
// fruits 现在包含 ["Apple", "Orange"]
```

#### RemoveAt(int index)
- **描述**: 移除 List 的指定索引处的元素
- **参数**:
  - `index`: 要移除的元素的从零开始的索引
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5};
numbers.RemoveAt(2); // 移除索引为2的元素(3)
// numbers 现在包含 [1, 2, 4, 5]
```

#### RemoveAll(Predicate\<T> match)
- **描述**: 移除与指定的谓词所定义的条件相匹配的所有元素
- **参数**:
  - `match`: 定义要移除的元素的条件
- **返回值**: 从 List 中移除的元素数
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5, 6};
int removed = numbers.RemoveAll(x => x % 2 == 0); // 移除所有偶数
// removed = 3 (移除了2,4,6)
// numbers 现在包含 [1, 3, 5]
```

#### RemoveRange(int index, int count)
- **描述**: 从 List 中移除一系列元素
- **参数**:
  - `index`: 要移除的元素范围的从零开始的起始索引
  - `count`: 要移除的元素数
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5, 6};
numbers.RemoveRange(1, 3); // 从索引1开始移除3个元素
// numbers 现在包含 [1, 5, 6]
```

#### Clear()
- **描述**: 从 List 中移除所有元素
- **时间复杂度**: O(1)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3};
numbers.Clear();
Console.WriteLine(numbers.Count); // 输出: 0
```

### 查询和操作

#### Contains(T item)
- **描述**: 确定某元素是否在 List 中
- **参数**:
  - `item`: 要在 List 中定位的对象
- **返回值**: 如果在 List 中找到 item，则为 true；否则为 false
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange"};
bool hasApple = fruits.Contains("Apple"); // true
bool hasGrape = fruits.Contains("Grape"); // false
```

#### ToArray()
- **描述**: 将 List 的元素复制到新数组中
- **返回值**: 一个包含 List 元素副本的数组
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3};
int[] numbersArray = numbers.ToArray();
// numbersArray 包含 [1, 2, 3]
```

#### Sort()
- **描述**: 使用默认比较器对整个 List 中的元素进行排序
- **时间复杂度**: O(n log n) 平均情况，O(n^2) 最坏情况
- **示例**:
```csharp
List<int> numbers = new List<int> {3, 1, 4, 2};
numbers.Sort();
// numbers 现在包含 [1, 2, 3, 4]
```

#### Sort(Comparison\<T> comparison)
- **描述**: 使用指定的 Comparison\<T> 对整个 List 中的元素进行排序
- **参数**:
  - `comparison`: 比较元素时要使用的 Comparison\<T>
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Cherry"};
fruits.Sort((x, y) => x.Length.CompareTo(y.Length));
// 按字符串长度排序，结果: ["Apple", "Cherry", "Banana"]
```

#### Sort(IComparer\<T> comparer)
- **描述**: 使用指定的比较器对整个 List 中的元素进行排序
- **参数**:
  - `comparer`: 比较元素时要使用的 IComparer\<T> 实现
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Cherry"};
fruits.Sort(StringComparer.OrdinalIgnoreCase);
// 使用不区分大小写的比较器排序
```

#### Reverse()
- **描述**: 将整个 List 中元素的顺序反转
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4};
numbers.Reverse();
// numbers 现在包含 [4, 3, 2, 1]
```

#### IndexOf(T item)
- **描述**: 搜索指定的对象，并返回整个 List 中第一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要在 List 中定位的对象
- **返回值**: 如果在整个 List 中找到 item 的第一个匹配项，则为该项的从零开始的索引；否则为 -1
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange"};
int index = fruits.IndexOf("Banana"); // index = 1
int notFound = fruits.IndexOf("Grape"); // notFound = -1
```

#### IndexOf(T item, int index)
- **描述**: 搜索指定的对象，并从指定索引开始搜索，返回 List 中第一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要查找的对象
  - `index`: 从零开始的搜索的起始索引
- **返回值**: 找到的第一个匹配项的索引，或 -1

#### IndexOf(T item, int index, int count)
- **描述**: 搜索指定的对象，并从指定索引开始搜索指定数量的元素，返回 List 中第一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要查找的对象
  - `index`: 从零开始的搜索的起始索引
  - `count`: 要搜索的部分中的元素数

#### LastIndexOf(T item)
- **描述**: 搜索指定的对象，并返回整个 List 中最后一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要在 List 中定位的对象
- **返回值**: 如果在整个 List 中找到 item 的最后一个匹配项，则为该项的从零开始的索引；否则为 -1
- **时间复杂度**: O(n)
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange", "Banana"};
int lastIndex = fruits.LastIndexOf("Banana"); // lastIndex = 3
```

#### LastIndexOf(T item, int index)
- **描述**: 搜索指定的对象，并从指定索引处开始向开始处搜索，返回 List 中最后一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要查找的对象
  - `index`: 向后搜索的从零开始的起始索引

#### LastIndexOf(T item, int index, int count)
- **描述**: 搜索指定的对象，并从指定索引处开始向开始处搜索指定数量的元素，返回 List 中最后一个匹配项的从零开始的索引
- **参数**:
  - `item`: 要查找的对象
  - `index`: 向后搜索的从零开始的起始索引
  - `count`: 要搜索的部分中的元素数

#### Find(Predicate\<T> match)
- **描述**: 搜索与指定谓词定义的条件匹配的元素，并返回整个 List 中的第一个匹配项
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 找到的第一个匹配项，或类型 T 的默认值
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5};
int firstEven = numbers.Find(x => x % 2 == 0); // firstEven = 2
```

#### FindLast(Predicate\<T> match)
- **描述**: 搜索与指定谓词定义的条件匹配的元素，并返回整个 List 中的最后一个匹配项
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 找到的最后一个匹配项，或类型 T 的默认值
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5};
int lastEven = numbers.FindLast(x => x % 2 == 0); // lastEven = 4
```

#### FindAll(Predicate\<T> match)
- **描述**: 检索与指定谓词定义的条件匹配的所有元素
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 包含所有匹配元素的新 List\<T>
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5, 6};
List<int> evenNumbers = numbers.FindAll(x => x % 2 == 0);
// evenNumbers 包含 [2, 4, 6]
```

#### FindIndex(Predicate\<T> match)
- **描述**: 搜索与指定谓词定义的条件匹配的元素，并返回整个 List 中第一个匹配项的从零开始的索引
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 第一个匹配项的索引，或 -1
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 3, 5, 2, 4};
int firstEvenIndex = numbers.FindIndex(x => x % 2 == 0); // firstEvenIndex = 3
```

#### FindLastIndex(Predicate\<T> match)
- **描述**: 搜索与指定谓词定义的条件匹配的元素，并返回整个 List 中最后一个匹配项的从零开始的索引
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 最后一个匹配项的索引，或 -1
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 3, 5, 2, 4};
int lastEvenIndex = numbers.FindLastIndex(x => x % 2 == 0); // lastEvenIndex = 4
```

#### ForEach(Action\<T> action)
- **描述**: 对 List 的每个元素执行指定操作
- **参数**:
  - `action`: 要对 List 的每个元素执行的 Action\<T> 委托
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3};
numbers.ForEach(x => Console.WriteLine(x * 2));
// 输出:
// 2
// 4
// 6
```

#### GetRange(int index, int count)
- **描述**: 创建源 List 中元素范围的浅表副本
- **参数**:
  - `index`: 范围开始处的从零开始的索引
  - `count`: 范围中的元素数
- **返回值**: 包含元素范围的新 List\<T>
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5};
List<int> subList = numbers.GetRange(1, 3);
// subList 包含 [2, 3, 4]
```

#### BinarySearch(T item)
- **描述**: 使用默认比较器在整个已排序的 List 中搜索元素，并返回该元素的从零开始的索引
- **参数**:
  - `item`: 要查找的对象
- **返回值**: 找到 item 的索引，如果没找到则返回负值
- **注意**: 调用此方法前 List 必须已排序
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 3, 5, 7, 9};
int index = numbers.BinarySearch(5); // index = 2
int notFound = numbers.BinarySearch(4); // 返回负值
```

#### BinarySearch(T item, IComparer\<T> comparer)
- **描述**: 使用指定的比较器在整个已排序的 List 中搜索元素
- **参数**:
  - `item`: 要查找的对象
  - `comparer`: 比较元素时要使用的 IComparer\<T> 实现

#### BinarySearch(int index, int count, T item, IComparer\<T> comparer)
- **描述**: 使用指定的比较器在已排序 List 的某个元素范围中搜索元素
- **参数**:
  - `index`: 要搜索的范围的从零开始的起始索引
  - `count`: 要搜索的范围的长度
  - `item`: 要查找的对象
  - `comparer`: 比较元素时要使用的 IComparer\<T> 实现

#### ConvertAll\<TOutput>(Converter\<T, TOutput> converter)
- **描述**: 将当前 List\<T> 中的元素转换为另一种类型，并返回包含转换后的元素的列表
- **参数**:
  - `converter`: 将每个元素从一种类型转换为另一种类型的委托
- **返回值**: 包含转换后的元素的新 List\<TOutput>
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3};
List<string> strings = numbers.ConvertAll(x => x.ToString());
// strings 包含 ["1", "2", "3"]
```

#### CopyTo(T[] array)
- **描述**: 将整个 List 复制到兼容的一维数组中，从目标数组的开头开始
- **参数**:
  - `array`: 作为复制目标的一维数组
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3};
int[] array = new int[3];
numbers.CopyTo(array);
// array 现在包含 [1, 2, 3]
```

#### CopyTo(T[] array, int arrayIndex)
- **描述**: 从目标数组的指定索引处开始，将整个 List 复制到兼容的一维数组中
- **参数**:
  - `array`: 作为复制目标的一维数组
  - `arrayIndex`: array 中从零开始的索引，从此处开始复制

#### CopyTo(int index, T[] array, int arrayIndex, int count)
- **描述**: 从目标数组的指定索引处开始，将 List 中某个范围的元素复制到兼容的一维数组中
- **参数**:
  - `index`: 源 List 中从零开始的索引，从此处开始复制
  - `array`: 作为复制目标的一维数组
  - `arrayIndex`: array 中从零开始的索引，从此处开始复制
  - `count`: 要复制的元素数

#### Exists(Predicate\<T> match)
- **描述**: 确定 List 是否包含与指定谓词定义的条件匹配的元素
- **参数**:
  - `match`: 定义要搜索的元素的条件
- **返回值**: 如果 List 包含一个或多个与指定谓词定义的条件匹配的元素，则为 true；否则为 false
- **示例**:
```csharp
List<int> numbers = new List<int> {1, 2, 3, 4, 5};
bool hasEven = numbers.Exists(x => x % 2 == 0); // true
```

#### TrueForAll(Predicate\<T> match)
- **描述**: 确定 List 中的每个元素是否都与指定谓词定义的条件匹配
- **参数**:
  - `match`: 定义要检查元素的条件
- **返回值**: 如果 List 中的每个元素都与指定谓词定义的条件匹配，则为 true；否则为 false
- **示例**:
```csharp
List<int> numbers = new List<int> {2, 4, 6, 8};
bool allEven = numbers.TrueForAll(x => x % 2 == 0); // true
```

### 索引器

#### list[int index]
- **描述**: 获取或设置指定索引处的元素
- **参数**:
  - `index`: 要获取或设置的元素的从零开始的索引
- **异常**: 如果 index 小于 0 或大于等于 Count，则抛出 ArgumentOutOfRangeException
- **示例**:
```csharp
List<string> fruits = new List<string> {"Apple", "Banana", "Orange"};

// 获取元素
string first = fruits[0]; // "Apple"

// 设置元素
fruits[1] = "Grape";
// fruits 现在包含 ["Apple", "Grape", "Orange"]
```

## 性能考虑
1. 随机访问（通过索引）非常快，时间复杂度为 O(1)
2. 在列表末尾添加/删除元素通常是 O(1)，但如果需要调整容量则为 O(n)
3. 在列表中间插入/删除元素是 O(n) 操作
4. 搜索未排序列表是 O(n) 操作
5. 对大型列表频繁操作时，考虑预先设置 Capacity 以减少重新分配

## 线程安全
List\<T> 不是线程安全的。如果多个线程需要同时访问 List\<T>，必须使用锁或其他同步机制来确保线程安全。

## 最佳实践
1. 如果知道最终大小，预先设置 Capacity 可以提高性能
2. 对于频繁的插入/删除操作，考虑使用 LinkedList\<T>
3. 对于只读操作，考虑使用 ReadOnlyCollection\<T> 包装器
4. 使用 Find 系列方法代替 Where + FirstOrDefault 可以提高性能

