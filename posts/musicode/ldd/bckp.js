const LineData = {
  trueLine: {x:[], y:[]},
  learnedLine: {x:[], y:[]},
}

generatePlot();

function generateCurve(coeffs) {
  let x = [];
  let y = [];
  
  for (let i = 0; i < 100; i++) {
    x[i] = -10.0 + i * 0.2;
    y[i] = Math.pow(x[i], 3) * coeffs[0] + Math.pow(x[i], 2) * coeffs[1] +
           x[i] * coeffs[2] + coeffs[3];
  }
  
  return {x: x, y: y};
}

function generatePlot() {
  const coeffs = [
    parseFloat(document.getElementById('aVal').value || 1.0),
    parseFloat(document.getElementById('aVal').value || 1.0),
    parseFloat(document.getElementById('aVal').value || 1.0),
    parseFloat(document.getElementById('aVal').value || 1.0)]
  const sampledCoeffs = tf.randomUniform([4], -2.0, 2.0);
  var learnedCoeffs = [];
  for (let i = 0; i < 4; i++) {
    learnedCoeffs[i] = sampledCoeffs.get(i);
  }
  LineData.trueLine = generateCurve(coeffs);
  LineData.learnedLine = generateCurve(learnedCoeffs);
  plot();
}

function plot(stdDev) {
  const trace1 = {
    x: LineData.trueLine.x,
    y: LineData.trueLine.y,
    mode: 'lines',
    name: 'Target Cubic',
    marker: { size: 12, color:'#29B6F6' }
  };
  const trace2 = {
    x: LineData.learnedLine.x,
    y: LineData.learnedLine.y,
    mode: 'lines',
    name: 'Learned Cubic',
    marker: { size: 12, color:'#F06292' }
  };

  const layout = {
    margin: {
      l: 20, r: 0, b: 20, t: 0, 
      pad:0
    },
    xaxis: {
      range: [-10.0, 10.0],
    },
    legend: {
        xanchor:"left",
        yanchor:"top",
        y: 1,
        x: 0,
        orientation: "v"
    },
  };
  Plotly.newPlot('graph', [trace1, trace2], layout, {displayModeBar: false});
}  
