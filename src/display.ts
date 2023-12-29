import * as d3 from "d3";

function polarToCartesian(angle: number, radius: number) {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
}

function renderSpiral(sequence: bigint[]) {
  console.log(sequence);

  const svg = d3.select("body").append("svg");

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radiusMultiplier = Math.min(window.innerWidth, window.innerHeight) / (sequence.length * 2);

  const spiralPoints: [number, number][] = sequence.map((d, i) => {
    const angle = i * (2 * Math.PI / sequence.length);
    const radius = i * radiusMultiplier;
    const { x, y } = polarToCartesian(angle, radius);
    return [centerX + x, centerY + y];
  });

  const lineGenerator = d3.line();

  const spiralLine = svg.append("path")
    .datum(spiralPoints)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "gray");
}

export default renderSpiral