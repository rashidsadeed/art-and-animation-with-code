const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.lineWidth=4;
    context.fillRect(0, 0, width, height);



    for (let i = 0; i<6; i++){
      for (let j =0; j<6; j++){
          let width= 60;
          let height=60;
          let gap = 20;
          let x = 100+(width+gap)*i;
          let y = 100 + (height+gap) * j;
          
          context.beginPath();
          context.rect(x,y,width,height);
          context.stroke();

          if (Math.random() > 0.5){
              context.beginPath();
              context.rect(x+8,y+8,width-16,height-16);
              context.stroke();

              context.beginPath();
              context.rect(x+16,y+16,width-32,height-32);
              context.stroke();

              context.beginPath();
              context.rect(x+24,y+24,width-48,height-48);
              context.stroke();
          
      }

  }
}
    
  };
};

canvasSketch(sketch, settings);
