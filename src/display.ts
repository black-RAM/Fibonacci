import randomColor from "randomcolor"
import * as d3 from "d3"

type tile =  d3.Selection<SVGRectElement, unknown, HTMLElement, any>

function shiftTiles(
  newX: number, 
  newY: number, 
  side: number, 
  currentTile: tile, 
  allTiles:tile[],
  upper: number,
  lower = 0
  ) {

    const sameX = (tile: tile) => newX <= +tile.attr("x") && +tile.attr("x") < newX + side 
    const sameY = (tile: tile) => newY <= +tile.attr("y") && +tile.attr("y") < newY + side

    if(newY < lower) {
      currentTile.attr("y", lower)

      for (const tile of allTiles) {
        if(tile !== currentTile && sameX(tile)) {
          tile.attr("y", +tile.attr("y") + side)
        }
      }
    }
    
    if(newX < lower) {
      currentTile.attr("x", lower)
      
      for (const tile of allTiles) {
        if(tile !== currentTile && sameY(tile)) {
          tile.attr("x", +tile.attr("x") + side)
        }
      }
    }
}

function renderSpiral(sequence: bigint[]) {
  console.log(sequence)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const svg = d3.select("body").append("svg")
  
  let x = 0
  let y = 0
  let direction = 1

  const lastTerm =  Number(sequence[sequence.length - 1])
  const sum = d3.sum(sequence.map((term, index) => Number(term)))

  const scale = d3.scaleLinear()
    .domain([0, sequence.length % 7 == 0 ? sum - lastTerm : sum])
    .range([0, d3.min([vw, vh]) || 2])

  const tiles: tile[] = []

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

    shiftTiles(x, y, side, tile, tiles, lastTerm)

    switch (direction) {
      case 1: // right
        x = side
        direction = 2
        break
      case 2: // down
        x = 0
        y = side
        direction = 3
        break
      case 3: // left
        y = 0
        x = 0 - side // deficit will cause shift
        direction = 4
        break
      case 4: // up
        y = 0 - side
        direction = 1
        break
    }
  }
  
  // grid lines
  const xLines = d3.axisTop(scale).tickSize(-vw).ticks(sum)
  const yLines = d3.axisLeft(scale).tickSize(-vh).ticks(sum)

  svg.append("g").call(xLines)
  svg.append("g").call(yLines)
}

export default renderSpiral
