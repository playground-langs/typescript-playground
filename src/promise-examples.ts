const promise =new Promise((resolve, reject)=>{
    resolve(11)
})

promise.then((res)=>{
    console.log(res)
    return Promise.resolve(123)
}).then((res)=>{
    console.log(res);
    return 456
}).then((res)=>{
    console.log(res);
})

function htmlEscape(literals:TemplateStringsArray,...placeHolders:string[]):string{
    let result=''
    for (let i = 0; i < placeHolders.length; i++) {
        result+=literals[i]+placeHolders[i]
    }
    result+=literals[literals.length-1]
    return result
}
let [a,b] =["1","2"]
console.log(htmlEscape`mn_dv_${a}_${b}_cd`)
