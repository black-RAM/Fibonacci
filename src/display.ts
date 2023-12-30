import randomColor from "randomcolor";
import * as d3 from "d3";

function renderSpiral(sequence: bigint[]) {
  console.log(sequence)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const svg = d3.select("body").append("svg")
  
  let x = 0
  let y = 0
  let direction = 1

  const lastTerm =  Number(sequence[sequence.length - 1])
  const scale = d3.scaleLinear().domain([0, lastTerm + 1]).range([0, d3.min([vw, vh]) || 0])
  const tiles: d3.Selection<SVGRectElement, unknown, HTMLElement, any>[] = []

  for (let i = 0; i < sequence.length; i++) {
    const color = randomColor()
    const side = scale(Number(sequence[i]))

    const tile = svg.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", side)
      .attr("height", side)
      .attr("fill", color)

    tiles.push(tile)

    switch (direction) {
      case 1: // right
        x += side
        direction = 2
        break
      case 2: // down
        y += side
        direction = 3
        break
      case 3: // left
        x -= side
        y -= side
        direction = 4
        break
      case 4: // up
        y -= side
        direction = 1
        break
    }
  }
  
  // grid lines
  const xLines = d3.axisTop(scale).tickSize(-vw)
  const yLines = d3.axisLeft(scale).tickSize(-vh)

  svg.append("g").call(xLines);
  svg.append("g").call(yLines);
}

export default renderSpiral;
