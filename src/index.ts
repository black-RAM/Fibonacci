import "./style.css";

interface BaseCases {
  [key: number]: number[]
}

const bases: BaseCases = {0: [], 1: [0], 2: [0, 1]}

function fibonacci(count: number): number[] {
  if (bases[count]) {
    return bases[count]
  }

  let fibonacciArray = fibonacci(count - 1)
  
  fibonacciArray.push(
    fibonacciArray[fibonacciArray.length - 1] +
    fibonacciArray[fibonacciArray.length - 2]
  )
  
  return fibonacciArray;
}

const fibonacciSequence = fibonacci(10000)
console.log(fibonacciSequence)
