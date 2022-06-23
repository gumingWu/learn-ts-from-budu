# 02.打造ts开发环境

## vscode和插件
- vscode本身由ts编写，对ts有全面的支持
- `Typescript Importer`插件，收集项目中所有的类型定义，在敲出:时提供类型补全
- `Move TS`插件，编辑文件路径，直接修改项目的目录结构
- vscode Setting，搜`Typescript inlay hints`，推荐开启：
  - Function Like Return Types，显示推导得到的函数返回值类型
  - Parameter Names，显示函数入参的名称
  - Parameter Types，显示函数入参的类型
  - Variable Types，显示变量的类型


## 创建环境
1. 全局安装`ts-node typescript`

```bash
npm i ts-node typescript -g
```

2. 执行命令创建`tsconfig.json`

```bash
tsc --init
```

3. 创建ts文件`index.ts`，输入代码

```ts
console.log("Hello TypeScript");
```

4. 用`ts-node`执行ts文件

```bash
ts-node ./index.ts


> Hello TypeScript
```


## ts-node配置
`ts-node`有两种配置方式
- 在`tsconfig.json`中新增`ts-node`字段
- 在执行`ts-node`命令行时，在后面加上参数
  - -P,--project：指定tsconfig文件位置，默认情况下会查找项目下的`tsconfig.json`，如果配置文件是`tsconfig.script.json`或`tsconfig.base.json`，就需要使用该命令指定了
  - -T,--transpileOnly：禁用执行过程中的类型检查，能提高执行速度
  - --swc：使用swc进行文件编译，进一步提升执行速度
  - --emit：执行并创建产物，输出到`.ts-node`文件夹下

## ts-node-dev
`ts-node`不支持自动监听文件变更然后重新执行，所以需要`ts-node-dev`库来实现
```
npm i ts-node-dev -g
```

执行命令即可开启监听
```
tsnd --respawn --transpile-only index.ts
```
- --respawn，启用监听重启功能
- --transpile-only，提供更快编译速度

## 进行类型检查
比如我有两个interface
```ts
interface Foo {
  name: string;
  age: number;
}
interface Bar {
  name: string;
  job: string;
}

// 值空间
let foo: Foo = {
  name: "ww",
  age: 18,
};
let bar: Bar = {
  name: "jj",
  job: "aa",
};
job = bar;  // error TS2304: Cannot find name 'job'.

```
我只是想比较这两个类型，但却定义了两个类，这是没必要的，涉及到`值空间`的操作

我们可以只在`类型空间`，理解为存放ts类型信息的内存空间，比较这些类型，只需要`declare`关键字
```ts
interface Foo {
  name: string;
  age: number;
}
interface Bar {
  name: string;
  job: string;
}

// 类型空间
declare let foo: Foo;
declare let bar: Bar;

foo = bar; // error TS2741: Property 'age' is missing in type 'Bar' but required in type 'Foo'.

```
通过`declare`我们只声明了一个存在于类型空间的变量，在运行时完全不存在，就避免了繁琐的属性声明


### 使用tsd进行类型兼容检查
首先要先安装`tsd`

然后这样使用
```ts
import { expectType } from "tsd";

expectType<string>("aaa");
expectType<number>("bbb"); // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

```

大致结构是：`expectType<预期的类型>(表达式或变量)`