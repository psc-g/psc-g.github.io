const GaussianData = {
  lineSamples: {x:[], y:[]},
  distanceSamples: {x:[], y:[], distance: 0.0},
}

generatePlot();

function generateGaussian(num_points, stdDev, lineSamples) {
  let x = [];
  let y = [];
  
  const xs = stdDev > 0.0 ? tf.randomNormal([num_points], 0.0, stdDev) : tf.zeros([num_points]);
  for (let i = 0; i < num_points; i++) {
    x[i] = xs.get(i);  // goes from a TF tensor (i.e. array) to a number.
  }
  x = x.sort(function(a,b){return a - b})
  
  // Generate the probability values for each sampled x.
  for (let i = 0; i < num_points; i++) {
    const val = x[i];
    y[i] = stdDev > 0.0 ?
           1 / (stdDev * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow(val / stdDev, 2)) :
           1.0;
  }
  if (stdDev == 0.0 && lineSamples) {
    y[0] = 0.0;   // This is just so we can draw a line.
  }
  if (lineSamples) return {x: x, y: y}

  // Compute distances between all pairs of points if not generating
  let distance = 0.0;
  for (let i = 0; i < num_points; i++) {
    for (let j = 0; j < num_points; j++) {
      if (i == j) continue;
      distance += Math.abs(x[i] - x[j]);
    }
  }
  distance /= num_points * (num_points - 1);
  return {x: x, y: y, distance: distance};
}

function generatePlot() {
  const numPoints = parseInt(document.getElementById('numPoints').value || 100);
  const stdDev = parseFloat(document.getElementById('stdDev').value || 1.0);
  GaussianData.lineSamples = generateGaussian(100, stdDev, true);
  GaussianData.distanceSamples = generateGaussian(numPoints, stdDev, false);
  plot(stdDev);
}

function plot(stdDev) {
  const trace1 = {
    x: GaussianData.lineSamples.x,
    y: GaussianData.lineSamples.y,
    mode: 'lines',
    name: 'Distribution',
    marker: { size: 12, color:'#29B6F6' }
  };
  const trace2 = {
    x: GaussianData.distanceSamples.x,
    y: GaussianData.distanceSamples.y,
    mode: 'markers',
    name: 'Samples',
    marker: { size: 12, color:'#F06292' }
  };
  const yTextPos = stdDev > 0 ? 1 / (2 * stdDev * Math.sqrt(2 * Math.PI)) : 0.5;
  const trace3 = {
    x: [0.0],
    y: [yTextPos],
    mode: 'text',
    name: 'Distance',
    showlegend: false,
    text: ['Distance: ' + GaussianData.distanceSamples.distance.toFixed(2)],
    textposition: 'center',
    textfont: {
      family: 'sans serif',
      size: 32,
      color: '#F06292',
    },
  };

  const layout = {
    margin: {
      l: 20, r: 0, b: 0, t: 0, 
      pad:0
    },
    legend: {
        xanchor:"left",
        yanchor:"top",
        y: 1,
        x: 0,
        orientation: "v"
    },
  };
  Plotly.newPlot('graph', [trace1, trace2, trace3], layout, {displayModeBar: false});
}  

async function computeDistance() {
  async function train(xs, ys, numIterations) {
    for (let iter = 0; iter < numIterations; iter++) {
      // Plot where we are at this step.
      plot();
      optimizer.minimize(() => {
        // Using our estimated coeff, predict all the ys for all the xs 
        const pred = predict(xs);
        
        // Need to return the loss i.e how bad is our prediction from the 
        // correct answer. The optimizer will then adjust the coefficients
        // to minimize this loss.
        return loss(pred, ys);
      });
      // Use tf.nextFrame to not block the browser.
      await tf.nextFrame();
    }
  }
}
