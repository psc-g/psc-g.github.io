/* Taken from https://sound-of-learning.glitch.me/,
 * which took code from https://hello-tensorflow.glitch.me/ */

// Sup globals. Fight me. Plots are hard.
const Data = {
  training: {x:[], y:[]},   // the initial data set we're given
  prediction: {x:[], y:[]}, // what we're predicting based on the coefficients
  learning: {x:[], y:[]}    // what we're predicting while learning.
}

let NUM_POINTS;             // how many data points in the set.

// These are the coefficients we're trying to learn. 
// They're all TensorFlows scalars (fancy for "number") and
// initialized to random numbers.
const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

init();

function init() {
  NUM_POINTS = parseInt(document.getElementById('points').value || 100);
  const defaultCoeffs = {
    a: parseFloat(document.getElementById('aVal').value || -0.8),
    b: parseFloat(document.getElementById('bVal').value || -0.2),
    c: parseFloat(document.getElementById('cVal').value || 0.9),
    d: parseFloat(document.getElementById('dVal').value || 0.5)
  }
  
  Data.training = generateData(NUM_POINTS, defaultCoeffs);
  
  const coeff = {
    a: a.dataSync()[0],
    b: b.dataSync()[0],
    c: c.dataSync()[0],
    d: d.dataSync()[0],
  };
  
  Data.prediction = generateData(NUM_POINTS, coeff);
  plot();
}

function plot() {
  const trace1 = {
    x: Data.training.x,
    y: Data.training.y,
    mode: 'lines+markers',
    name: 'Training',
    marker: { size: 12, color:'#29B6F6' }
  };

  const trace2 = {
    x: Data.prediction.x,
    y: Data.prediction.y,
    mode: 'lines+markers',
    name: 'Initial Prediction',
    marker: { size: 12, color: '#F06292' }
  };
  
  let trace3 = {};
  if (Data.learning) {
    trace3 = {
      x: Data.learning.x,
      y: Data.learning.y,
      mode: 'lines+markers',
      name: 'Learning',
      marker: { size: 12, color: '#00E676' }
    };
  }
  
  const layout = {
    margin: {
      l: 20, r: 0, b: 0, t: 0, 
      pad:0
    },
    legend: {
				xanchor:"left",
				yanchor:"top",
				y: 1,  //tbh i don't know what these numbers mean?!
        x: 0,
				orientation: "v"
	  },
  };
  Plotly.newPlot('graph', [trace1, trace2, trace3], layout, {displayModeBar: false});
}  

function generateData(points, {a, b, c, d}) {
  let x = [];
  let y = [];
  
  const xs = tf.randomUniform([points], -1, 1);
  for (let i = 0; i < points; i++) {
    x[i] = xs.get(i);
  }
  x = x.sort(function(a,b){return a - b})
  
  for (let i = 0; i < points; i++) {
    const val = x[i];
    y[i] = a * (val*val*val) + b * (val*val) + c * val + d;
  }
  
  const ymin = Math.min(...y);
  const ymax = Math.max(...y);
  const yrange = ymax - ymin;
  
  for (let i = 0; i < points; i++) {
    const val = y[i];
    y[i] = (y[i] - ymin) / yrange;
  }
  
  return {x:x, y:y}
}

async function doLearning() {
  const numIterations = parseInt(document.getElementById('iterations').value || 75);
  const learningRate = 0.5;
  const optimizer = tf.train.sgd(learningRate); 
  await train(tf.tensor1d(Data.training.x), tf.tensor1d(Data.training.y), numIterations);

  async function train(xs, ys, numIterations) {
    for (let iter = 0; iter < numIterations; iter++) {
      const coeff = {
        a: a.dataSync()[0],
        b: b.dataSync()[0],
        c: c.dataSync()[0],
        d: d.dataSync()[0],
      };
      Data.learning = generateData(NUM_POINTS, coeff);
      plot();
  
      optimizer.minimize(() => {
        const pred = predict(xs);
        return loss(pred, ys);
      });
      await tf.nextFrame();
    }
  }
  
  function predict(x) {
    return tf.tidy(() => {
      return a.mul(x.pow(tf.scalar(3, 'int32')))
        .add(b.mul(x.square()))
        .add(c.mul(x))
        .add(d);
    });
  }
  
  function loss(prediction, labels) {
    const error = prediction.sub(labels).square().mean();
    return error;
  }
}
