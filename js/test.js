let someMap = new Map()
// console.log(someMap)

someMap.set(1, 'message1')
// console.log(someMap)

someMap.set(0, 'message0')
console.log(someMap)

let obj = Object.fromEntries(someMap)

console.log(obj)

let secondMap = new Map(Object.entries(obj))

console.log(secondMap)