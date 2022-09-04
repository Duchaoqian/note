# class 类

TypeScript 是面向对象的 JavaScript。<br/>
类描述了所创建的对象共同的属性和方法。<br/>
TypeScript 支持面向对象的所有特性，比如 类、接口等。<br/>

定义类的关键字为 class，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：
+ 字段 − 字段是类里面声明的变量。字段表示对象的有关数据。
+ 构造函数 − 类实例化时调用，可以为类的对象分配内存。
+ 方法 − 方法为对象要执行的操作。

## 创建一个类
示例
```ts
class Person{

}
```
编译后
```js
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
```

## 创建类的数据成员
类的数据成员：成员属性， 成员方法，构造器，get, set

示例：
```ts
class Person {
  // 声明 成员属性
  _username: string = 'zs'
  age: number = 20
  sex: number
  // 构造函数
  constructor() {
    // 给成员属性赋值
    this._username = 'hh'
    this.age = 123
    this.sex = 1
    // 未经声明的成员属性 则会出现error
    this.hobby = [] // error
  }

  // 声明成员方法
  say() {
    console.log('hello')
  }
  // get
  get username() {
    return this._username
  }
  // set
  set username(val) {
    this._username = val
  }
}

// 实例化
let zs = new Person()

console.log(zs.username) // hh
zs.username = 'ls'
console.log(zs._username) // ls
console.log(zs.sex) // 1
console.log(zs.hobby) // []
```

编译后：

```js
var Person = /** @class */ (function () {
    // 构造函数
    function Person() {
        // 声明 成员属性
        this._username = 'zs';
        this.age = 20;
        // 给成员属性赋值
        this._username = 'hh';
        this.age = 123;
        this.sex = 1;
        // 未经声明的成员属性 则会出现error
        this.hobby = []; // error
    }
    // 声明成员方法
    Person.prototype.say = function () {
        console.log('hello');
    };
    Object.defineProperty(Person.prototype, "username", {
        // get
        get: function () {
            return this._username;
        },
        // set
        set: function (val) {
            this._username = val;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
// 实例化
var zs = new Person();
console.log(zs.username); // hh
zs.username = 'ls';
console.log(zs._username); // ls
console.log(zs.sex); // 1
console.log(zs.hobby); // []

```

## 私有字段(#)

在 TS 3.8版本便开始支持ECMACMAScript的私有字段。
需要注意的是私有字段与常规字段不同，主要的区别是：

+ 私有字段以 # 字符开头，也叫私有名称；
+ 每个私有字段名称都唯一地限定于其包含的类；
+ 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
+ 私有字段不能在包含的类之外访问，甚至不能被检测到。

示例：
```ts
class Person {
  #nickname: string = '大帅哥'
  username: string
  constructor() {
    this.username = this.#nickname
  }
  say() {
    console.log(`${this.#nickname} say: hello`)
  }
  setNickname() {
    this.#nickname = '大美女'
  }
}

let zs = new Person()

console.log(zs.username) // 大帅哥
zs.say() //  大帅哥 say: hello
zs.setNickname()
console.log(zs.username) // 大帅哥
zs.say() // 大美女 say: hello
console.log(zs.#nickname) // error
```

## 只读属性（readonly）

只读属性：用 readonly 修饰，只能在构造函数中初始化。并且在TS中，只允许将interface、type、class上的属性标识为readonly
+ readonly实际上只是在编译阶段进行代码检查
+ 被radonly修饰的词只能在 constructor阶段修改，其他时刻不允许修改

示例：
```ts
class Person {
  readonly username: string // 只读属性
  age: number

  constructor() {
    this.username = 'zs'
    this.age = 123
  }

  setName(name: string, age: number) {
    this.username = name //  error
    this.age = age
  }
}
```
编译后：
```js
var Person = /** @class */ (function () {
    function Person() {
        this.username = 'zs';
        this.age = 123;
    }
    Person.prototype.setName = function (name, age) {
        this.username = name; //  error
        this.age = age;
    };
    return Person;
}());

```

## 继承（extends）

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。<br/>
其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

示例：
```ts
// 父类
class Person {
  username: string // 只读属性
  age: number

  constructor() {
    this.username = 'zs'
    this.age = 123
  }

  setName(name: string, age: number) {
    this.username = name //  error
    this.age = age
  }
}
// 子类
class Man extends Person {
  sex: string = '男'
  constructor(){
    super()
  }
}

let zs = new Man()

console.log(zs.sex) // 男
console.log(zs.username) // zs
```

## abstract
abstract: 用abstract关键字声明的类叫做抽象类，声明的方法叫做抽象方法

+ 抽象类：指不能被实例化，因为它里面包含一个或多个抽象方法。
+ 抽象方法：是指不包含具体实现的方法；


> **抽象类是不能直接实例化，只能实例化实现了所有抽象方法的子类**
> **抽象方法只能书写在抽象类中**

示例：
```ts
abstract class Person {
  username: string // 只读属性
  age: number
  constructor(username: string, age: number) {
    this.username = username
    this.age = age
  }

  abstract say(): void
}

class Man extends Person {
  sex: string = '男'
  constructor(username: string, age: number) {
    super(username, age)
  }
  say(): void {
    console.log('hello')
  }
}

let ls = new Person() // error
let zs = new Man() // ok

zs.say() // hello
```

## 修饰符

修饰符对应数据在不同场景下是否可用表
|关键字	|类本身	|类的方法|	类的实例|	子类|	子类方法|	子类的实例|
|--|--|--|--|--|--|--|
|[static](#static)|	+	|-|	-	|+	|-|	-|
|public|	-	|+	|+|	-	|+	|+|
|private	|-|	+	|-|	-	|-	|-|
|protected	|-	|+|	-	|-	|+|	-|

### static
static： 类（class）通过 static 关键字定义静态方法、静态属性。不能在类的实例上调用静态方法、属性，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能。

示例：
```ts
class Person {
  static sex = '男'
  static say() {
    console.log('hello')
  }
}

let zs = new Person()

console.log(Person.sex) // 男
console.log(zs.sex) // undefined
console.log(Person.say()) // hello
console.log(zs.say()) // error
```


### public

对象的成员都是public成员。任何对象都可以访问，修改，删除这些成员或添加新成员。主要有两种方式来在一个新对象里放置成员

示例：
```ts
class Person {
  public username: string
  age: number

  constructor() {
    this.username = 'zs'
    this.age = 123
  }
  public say(): void {
    console.log(this.username, 'say: hello')
  }
}

let p = new Person()

console.log(p.username, p.age) // zs 123
p.say() // zs say: hello
Person.say() // error

```

### private
private 私密属性 只能在类中使用

示例：

```ts
class Person {
  private username: string = '123'
  age: number

  uname: string = 'zs'
  constructor() {
    this.uname = this.username
    this.age = 123
  }
  private hello(): void {
    console.log(this.username, 'say: hello')
  }

  say() {
    this.hello()
  }
}

class Man extends Person {
  getUser() {
    console.log(this.username) // error
    console.log(this.age)
  }
}

let p = new Person()
console.log(p.username) // error
p.hello() // error
p.say() // zs say:hello

```

### protected

protected 关键字修饰的数据智能在类中，子类中调用

```ts
class Person {
  protected username: string = '123'
  age: number

  uname: string = 'zs'
  constructor() {
    this.uname = this.username
    this.age = 123
  }
  protected hello(): void {
    console.log(this.username, 'say: hello')
  }

  say() {
    this.hello()
  }
}

class Man extends Person {
  getUser() {
    console.log(this.username) // ok
    console.log(this.age)
  }
}

let p = new Person()
console.log(p.username) // error
p.hello() // error
p.say() // zs say:hello
```