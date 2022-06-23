interface Foo {
  name: string;
  age: number;
}
interface Bar {
  name: string;
  job: string;
}

// 值空间
// let foo: Foo = {
//   name: "ww",
//   age: 18,
// };
// let bar: Bar = {
//   name: "jj",
//   job: "aa",
// };
// job = bar;  // ReferenceError: job is not defined

// 类型空间
declare let foo: Foo;
declare let bar: Bar;

foo = bar; // error TS2741: Property 'age' is missing in type 'Bar' but required in type 'Foo'.
