import renderSpiral from "./display";
import "./style.css";

function fibonacci(count: number): bigint[] {
  if (count == 2) {
    return [BigInt(0), BigInt(1)]
  }

  let fibonacciArray = fibonacci(count - 1)
  
  fibonacciArray.push(
    fibonacciArray[fibonacciArray.length - 1] +
    fibonacciArray[fibonacciArray.length - 2]
  )
  
  return fibonacciArray;
}

const fibonacciSequence = fibonacci(10)

renderSpiral(fibonacciSequence)
