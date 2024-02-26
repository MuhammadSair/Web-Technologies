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
const