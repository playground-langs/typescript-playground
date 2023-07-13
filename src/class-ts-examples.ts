
class Test{
    constructor(private num:number) {
    }

    getNum(){
        return this.num
    }
}
class Box extends Test{
    constructor(private value:number,num:number) {
        super(num)
    }

    getValue(){
        return this.value
    }
}

