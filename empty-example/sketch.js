// array constants
const xSize = 30;
const ySize = 14;

//size constants
const scale = 84;

let vals = Array(ySize).fill().map(() => Array(xSize).fill(0));
function setup() {
  createCanvas(1920, 1080);
  textSize(40);
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  frameRate(15)
}

let needToBeRenderRows = [0];


function drawBox(txt, x, y){  
  let strength = txt/924;
  let textColour = 30 * Math.pow(txt, 1/3)
  stroke(0, 50, 0);
  fill(0);
  rect(x + 1, y + 1, scale, scale);

  //console.log(textColour);

  stroke(0,40 + textColour,0);
  fill(0,40 + textColour,0);

  if (txt > 999){
    textSize(34);
  } else{
    textSize(40);
  }

  text(txt, 1 + x + scale / 2, 1 + y + scale / 2);

}

function calcRow(yIndex){
  for (let xIndex = 0; xIndex != xSize; xIndex++){
        
    //console.log(xIndex -1, yIndex-1);
    let num1 = vals[yIndex - 1][xIndex];
    let num2 = vals[yIndex - 1][xIndex-1];

    if (isNaN(num1)) {num1 = 0}
    if (isNaN(num2)) {num2 = 0}
    if (typeof num1 === 'undefined') {num1 = 0}
    if (typeof num2 === 'undefined') {num2 = 0}
    
    if ((num1 + num2) > vals[yIndex][xIndex]){
      vals[yIndex][xIndex] = num1 + num2;
    }




    drawBox(vals[yIndex - 1][xIndex],  xIndex * scale - (yIndex * scale)/2, (yIndex - 1) * scale);
}

}

function clearRow(yIndex){
  for (let xIndex = 0; xIndex != xSize; xIndex++){
    vals[yIndex][xIndex] = 0;
  }
}

let runsSinceLastClick = 0;

function draw(){
  // find mouse coords
  let mouseGridY = floor((mouseY / (scale)));
  let mouseGridX = floor((((scale/2) + mouseX + (mouseGridY * scale * 0.5)) / (scale)));

  if ((mouseIsPressed === true)) {
    console.log(vals);
    vals[mouseGridY][mouseGridX] = 1;
    needToBeRenderRows.push(mouseGridY);
    runsSinceLastClick = 0
  }


  if (runsSinceLastClick > 25){
    needToBeRenderRows.push(0);
  }


  for (let i = 0; i < needToBeRenderRows.length; i++){
    //calcRow(needToBeRenderRows[i] + 1);
    if (runsSinceLastClick > 25){
      clearRow(needToBeRenderRows[i]);
    }
    calcRow(needToBeRenderRows[i] + 1);
    

    if (needToBeRenderRows[i]+2 == ySize){
      needToBeRenderRows.splice(i, 1);
    }else{
      needToBeRenderRows[i]++;
    }
    //console.log(needToBeRenderRows[i]);
  }


  runsSinceLastClick++;
} 