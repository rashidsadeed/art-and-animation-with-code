const canvasSketch = require('canvas-sketch');
const { parse } = require('canvas-sketch-util/color');
const math = require('canvas-sketch-util/math');
const random = require("canvas-sketch-util/random");
const tweakpane = require("tweakpane");

const settings = {
  dimensions: [ 1920, 1920 ],
  animate : true
};

const params = {
  cols: 20, 
  rows: 20,
  ScaleMin : 1,
  ScaleMax : 30,
  freq : 0.001,
  amp : 0.2,
  frame :0,
  animate: true

}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    const rows = params.rows;
    const cols = params.cols;
    const numCells = rows* cols;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw/ cols;
    const cellh = gridh/rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;
    
    for (let i =0; i<numCells; i++){
      const col = i % cols;
      const row = Math.floor(i/cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame: params.frame;

      //const n = random.noise2D(x + frame*10,y, params.freq);
      const n = random.noise3D(x ,y,f*10 ,params.freq);


      
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.ScaleMin, params.ScaleMax);

      context.save();
      context.translate(x,y);
      context.translate(margx, margy);
      context.translate(cellw *0.5, cellh * 0.5);
      context.rotate(angle);
      context.lineWidth = scale;
      
      context.strokeStyle = "#45c8b7 ";


      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5,0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: "Grid"});
  folder.addInput(params, "cols", {min:2, max:200, step:1});
  folder.addInput(params, "rows", {min:2, max:200, step:1});
  folder.addInput(params, "ScaleMin", {min:1, max:100});
  folder.addInput(params, "ScaleMax", {min:1, max:100});

  folder = pane.addFolder({title:"Noise"});
  folder.addInput(params, "freq", {min:-0.01, max:0.01});
  folder.addInput(params, "amp", {min:0, max:1});
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", {min: 0, max:999});


};

createPane();

canvasSketch(sketch, settings);
