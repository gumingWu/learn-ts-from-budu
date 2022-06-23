import { expectType } from "tsd";

expectType<string>("aaa");
expectType<number>("bbb"); // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
