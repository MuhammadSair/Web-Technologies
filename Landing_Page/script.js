//JS Practice only

let carname
carname="Grandi"



console.log(carname);
console.log("Sair")
function getThis() {
    return this;
  }
  
  const obj1 = { name: "obj1" };
  const obj2 = { name: "obj2" };
  
  obj1.getThis = getThis;
  obj2.getThis = getThis;
  
  console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
  console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }
  
  function myFunc(theObject) {
    theObject.make = "Toyota";
  }
  
  const mycar = {
    make: "Honda",
    model: "Accord",
    year: 1998,
  };
  
  console.log(mycar.make); // "Honda"
  myFunc(mycar);
  console.log(mycar.make); // "Toyota"
  console.log(mycar)

  const factorial=function fc(n) {
    return  n<2?1:n* fc(n-1)
    
  }
  console.log(factorial(4))

function outside(n) {
    function inside(k) {
        return n+k
    }
   return inside
   
}
const fnouside=outside(7)
console.log(fnouside(5))
console.log(outside(4)(7)) 
let age =(a,b)=> a+b;
console.log(age(8,9))


const person = {fname:"John", lname:"Doe", age:25}; 
let txt = "";
for (let x in person) {
  txt += person[x] + " ";
}
console.log(txt)


const numbers=[1,5,32,78,4,2,3]
// const comapringFunction=function compareNumbers(a, b) {
//     return a - b;
//   }
numbers.sort((a,b)=> a-b)
console.log(numbers)  
const items = [
    { name: "Edward", value: 21 },
    { name: "Sharpe", value: 37 },
    { name: "And", value: 45 },
    { name: "The", value: -12 },
    { name: "Magnetic", value: 13 },
    { name: "Zeros", value: 37 },
  ];
  
  // sort by value
  items.sort((a, b) => a.value - b.value);
  
  // sort by name
  items.sort((a, b) => {
    const nameA = a.name.toUpperCase() // ignore upper and lowercase
    const nameB = b.name.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
console.log(items)  
