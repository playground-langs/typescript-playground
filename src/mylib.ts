interface Point {
    x?: number,
    y: string,
}

type MyPartial<T> = { [P in keyof T]?: T[P] };

type MyPoint1 = MyPartial<Point>

type MyRequired<T> = { [P in keyof T]-?: T[P] };

type MyPoint2 = MyRequired<Point>

type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

type MyPoint3 = MyReadonly<Point>

type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

type R = MyRecord<'a' | 'b', number>

type MyExclude<T, U> = T extends U ? never : T

type ME = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>

type MyExtract<T, U> = T extends U ? T : never

type B = MyExtract<'a' | 'b' | 'c', 'a' | 'b'>

type MyOmit<T, K extends keyof any> = { [P in MyExclude<keyof T, K>]: T[P] }
type MyOmit1<T, K extends keyof any> = Pick<T, MyExclude<keyof T, K>>

type MyPoint4 = MyOmit<Point, 'x' | 'z'>

type MyNonNullable<T> = T extends null | undefined ? never : T
type MyNonNullable1<T> = T & {}

type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

type MP = MyParameters<(a: boolean, b: string) => void>

type MyConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never

/**
 * 带有构造函数签名的接口无法被实现，用作签名限定
 */
interface AConstructor {

    new(a: number): A;
}

class A {
    constructor(a: number) {

    }
}

function createA(c: AConstructor) {
    return new c(1)
}

let a = createA(A)

type MC = MyConstructorParameters<AConstructor>
type MC1 = MyConstructorParameters<new (n: number) => string>


type MyInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never

type MI = MyInstanceType<new () => A>


type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never

type MyThisParameterType<T> = T extends (this: infer P, ...args: never) => any ? P : unknown

/**
 * T extends (...args: infer P) 不会捕获this参数
 */
type MyOmitThisParameter<T> = unknown extends MyThisParameterType<T> ? T : T extends (...args: infer P) => infer R ? (...args: P) => R : T


function f1(this: string, a: number, b: number) {
    return a + b
}

function f2(a: number, b: number) {
    return a + b
}

type F1 = MyThisParameterType<typeof f2>

let f11: F1 = null

type F2 = MyOmitThisParameter<typeof f1>
let f22: F2 = null
type F3 = OmitThisParameter<typeof f1>
let f33: F3 = null
type F4 = OmitThisParameter<typeof f2>
//不会捕获this参数
type F5 = MyParameters<typeof f1>

/**
 * 在协变位上，同一个类型的多个候选者，会被推断为联合类型
 * 在逆变位置上同一个类型的多个候选者，会被推断为交叉类型
 */
type UnionToInter<T> =
    (T extends any ? (arg:T)=>void : never) extends ((arg: infer R) =>void) ? R :never

type UI =UnionToInter<{a:string}|{b:string}>

export {}