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

const slider = document.querySelector<HTMLInputElement>("input[type='range']")
const output = document.getElementsByTagName("span")[0]

if (slider && output) {
  output.innerText = `${+slider.value-1}`
  let fibonacciSequence = fibonacci(+slider.value)
  renderSpiral(fibonacciSequence)

  slider.addEventListener("input", () => {
    fibonacciSequence = fibonacci(+slider.value)
    renderSpiral(fibonacciSequence)
    output.innerText = `${+slider.value-1}`
  })
}
