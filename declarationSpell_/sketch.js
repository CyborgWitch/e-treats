//.... imagine... if u did this in 3d... webgl
// more structure:: tracking number of revolutions? drawing with mouse.... 

let poem = "to Possibility;;; Hello, I would like to be friends, I could be a x with no walls Just limbs Just want Just		; just			; just			Q — So how would u go about soliciting possibility as a companion? - find a door and knock on it - drop a pebble in a well and see who crawls out - throw a dinner party, send invites by wind	- light a candle and offer it up to passers by - sing_and_sing and sing_and_sing_and_sing a choir to gather a around - find the twirliest dress; and ask it to kindly overcome u - take_ur_bones and wring out the melancholy";

let poemTokens = [""][""];
let chars = [""];

//trig variables
let radius = 220;
let angle, moveAngle;
let speed = 0.01;

//array to hold all the objects
let pArray = [];

//perlin noise variable for gentle movement
let xOff = 0.9;
let lOff = 0.0001;

// time variable
let mousePressedTime = 1;
let mouseHasBeenPressed = false;

//imgs
let img0, img1, img2, img3;
let crayonnette, basteleur, kingThings, favorit, fBold;

function preload() {
  img2 = loadImage('assets/saltParameters_17orb.png');
  img3 = loadImage('assets/saltParameters_16.png');
  favorit = loadFont('assets/FavoritStd-Regular.otf');
  fBold = loadFont('assets/FavoritTrialStd-Bold.otf');
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  textSize(12);
  textAlign(LEFT);
  imageMode(CENTER);
  textFont(favorit);
}

function windowResized() {
  resizeCanvas(650, 650);
}

function draw() {  
  background(221, 212, 233);
  background(0, 85, 95);
  image(img3, width/2, height/2, width, height);
  
  stroke(255, 0, 255);
  strokeWeight(0.25);
  
  text('mousePressedTime');
  //breaking up text string into words/tokens
  poemTokens = RiTa.tokenize(poem);
  for (let i=0; i<poemTokens.length; i++) {
       let chars = poemTokens[i].split('');
       //console.log(chars);
  }
  console.log(mouseX, mouseY);
  push();
    textFont(fBold);
    textSize(13.5);
    text(mousePressedTime, 394, 38);
  pop();
  
  text('hi lucy :~))', 20, 82);

    //mouseIsPressed for incrementally running through words/i, changing speed of circle
  if (mouseIsPressed) {
      //console.log(mouseX, mouseY);
      speed = speed+0.0001;
      push();
        strokeWeight(1.5);
        line(415, 57, 621, 57);
      pop();
      if (mousePressedTime >=poemTokens.length) {
          mousePressedTime = 1;
      } else {
        mousePressedTime = mousePressedTime+1/5;
      }
  } else {
      speed = speed+0.00005;
      push();
        strokeWeight(1.5);
        line(528, 73, 621, 73);
      pop();
      if (mousePressedTime>=poemTokens.length) {
          mousePressedTime = 0;
      }
  }  
  
  //perlin variables
  xOff = xOff+0.00000001;
  //lOff = map(mouseX, 0, width, 0, 0.0000001);
  lOff = lOff+map(mouseX, 0, width, 0, 0.1)+map(mousePressedTime, 0, 1000, 0, 0.001);
  //lOff = lOff+map(mousePressedTime, 0, poemTokens.length, 0, 0.01);
  
  //constructing new object for each word and executing specific constructor functions
  for (let i=0; i<1; i++) {
       pArray.push(new p());
       pArray[i].display();
  }
}

class p {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  display() {
    fill(255, 0, 255, 235);
    
    // drawing words as salt particles equidistant from center
    for (let i=0; i<poemTokens.length; i++) {
      for (let j=0; j<poemTokens[i].length; j++) {
        
        // angle (or gap?)  = TWO_PI/poemTokens.length *
        let angle = TWO_PI/poemTokens.length;
        let moveAngle = angle*(i-1)+speed;
        let pressDraw = int(map(mousePressedTime, 0, poemTokens.length, 0, i));

        this.x = width/2+cos((moveAngle-HALF_PI+PI)*pressDraw)*radius;
        this.y = height/11*5.25+sin((moveAngle-HALF_PI)*pressDraw)*radius;
        let xBack = (pressDraw*j*noise(j*lOff));

        
        if (mouseIsPressed) {
            // if mouse is pressed, break apart words into letters
            this.x = this.x+xBack;
            text(poemTokens[i-pressDraw][j], this.x, this.y);
            mouseHasBeenPressed = true;
        } else if (!mouseIsPressed & mouseHasBeenPressed) {
            this.x = this.x;
            text(poemTokens[i-pressDraw], this.x, this.y);
        }

    
      }
    }
  }

}

function mouseDragged() {
    //radius = map(mouseX, 0, width, 235, 240);

}