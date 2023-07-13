/**
 * 采用增强型寄生组合
 * 1.使用new创建对象并使用call向父类传参
 * 2.使用寄生对象接收父类原型，同时可以避免修改父类原型构造器
 * 3.修正寄生对象原型构造器指向
 * 4.复制子类原型属性并合并至寄生对象原型
 */

function Parent(name, age) {
    this.name = name
    this.age = age
    console.log("init parent")
    //作为属性存在与对象自身而非原型上的属性
    this.getAge = function () {
        return this.age
    }
}

//原型上的属性
Parent.prototype.getName = function () {
    return this.name
}

function Child(name, age, grade) {
    Parent.call(this, name, age)
    console.log("init child")
    this.grade = grade
}

//原型上的属性
Child.prototype.getGrade = function () {
    return this.grade
}

function create(original) {
    function F() {
    }

    F.prototype = original.prototype
    return new F()
}

function inherit(child, parent) {
    let proto = create(parent)
    //修正原型中constructor指向,new创建的对象原型的constructor指向构造函数
    //使用寄生对象可以避免污染parent的constructor
    proto.constructor = child
    //复制子类原型中已有的属性
    for (let key in child.prototype) {
        Object.defineProperty(proto, key, {
            value: child.prototype[key]
        })
    }
    //子类原型指向父类原型
    child.prototype = proto
}

inherit(Child, Parent)

let child = new Child("tom", 18, 3)

console.log(child.getName())
console.log(child.getAge())
console.log(child.getGrade())