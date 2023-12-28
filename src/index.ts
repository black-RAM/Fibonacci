import "./style.css";

// memoization to optimize fibonacci sequence generation
interface Memo {
  [key: number]: number[]
}

function fibonacci(count: number, memo: Memo = {0: [], 1: [0], 2: [0, 1]}): number[] {
  if (memo[count]) {
    return memo[count]
  }

  let fibonacciArray = fibonacci(count - 1, memo)
  
  fibonacciArray.push(
    fibonacciArray[fibonacciArray.length - 1] +
    fibonacciArray[fibonacciArray.length - 2]
  )

  memo[count] = fibonacciArray;
  
  return fibonacciArray;
}

const fibonacciSequence = fibonacci(20000)
console.log(fibonacciSequence)
