// sketch.js 
new p5((p) => {
  let tiles = [];
  let cols, rows;
  let size = 8;
  let speed = 0.05;
  let shapeType = 'triangles';
  
  let palette = ['#72474c', '#E5BEB5', '#EEE6CA', '#F5FAE1', '#72474c'];

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('p5-background'); 
    createGrid();
  };

  function createGrid() {
    cols = p.width / size;
    rows = p.height / size;
    tiles = [];
    
    for (let i = 0; i < cols; i++) {
      tiles[i] = [];
      for (let j = 0; j < rows; j++) {
        tiles[i][j] = new Tile(
          i, j, size, 
          p.floor(p.random(4)), 
          p.color(p.random(palette))
        );
      }
    }
  }

  p.draw = function() {
    p.background('#EEE6CA');
    let Time = p.frameCount * speed;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        tiles[i][j].update(Time);
        tiles[i][j].display();
      }
    }
  };

  p.windowResized = function() {
  p.resizeCanvas(p.windowWidth, p.windowHeight, true); 
  createGrid();
};

  class Tile {
    constructor(gridX, gridY, size, type, c) {
      this.gridX = gridX;
      this.gridY = gridY;
      this.size = size;
      this.type = type;
      this.c = c;
      this.baseX = gridX * size;
      this.baseY = gridY * size;
    }
    
    update(time) {
      this.x = this.baseX;
      this.y = this.baseY;
      
      let horizontalShift = 0;
      if (this.gridY % 2 === 0) {
        horizontalShift = p.sin(time) * this.size;
      } else {
        horizontalShift = -p.sin(time) * this.size;
      }
      
      let verticalShift = 0;
      if (this.gridX % 2 === 0) {
        verticalShift = p.cos(time * 1.1) * this.size;
      } else {
        verticalShift = -p.cos(time * 1.1) * this.size;
      }
      
      this.x += horizontalShift;
      this.y += verticalShift;
    }
    
    display() {
      p.push();
      p.translate(this.x, this.y);
      
      if (shapeType === 'triangles') {
        this.drawTriangles();
      } else if (shapeType === 'circles') {
        this.drawCircles();
      }
      
      p.pop();
    }
    
    drawTriangles() {
      p.fill(this.c);
      p.noStroke();
      p.blendMode(p.EXCLUSION);
      
      p.beginShape();
      if (this.type == 0) {
        p.vertex(this.size, 0);
        p.vertex(this.size, this.size);
        p.vertex(0, this.size);
      } else if (this.type == 1) {
        p.vertex(this.size, 0);
        p.vertex(0, 0);
        p.vertex(0, this.size);
      } else if (this.type == 2) {
        p.vertex(this.size, this.size);
        p.vertex(0, 0);
        p.vertex(0, this.size);
      } else if (this.type == 3) {
        p.vertex(this.size, this.size);
        p.vertex(0, 0);
        p.vertex(this.size, 0);
      }
      p.endShape();
      
      if (this.type <= 1) {
        p.circle(this.type == 0 ? 20 : this.size, this.type == 0 ? this.size : 10, 20);
      }
      
      p.blendMode(p.BLEND);
    }
    
    drawCircles() {
      p.stroke(this.c);
      p.fill(this.c);
      p.blendMode(p.EXCLUSION);
      p.strokeWeight(5);

      let circleType = this.type % 2;
      
      if (circleType == 0) {
        p.arc(0, 0, size, size, 0, p.HALF_PI);
        p.arc(size, size, size, size, p.PI, p.PI + p.HALF_PI);
        p.circle(10, this.size, 5);
      } else {
        p.arc(size, 0, size, size, p.HALF_PI, p.PI);
        p.arc(0, size, size, size, p.PI + p.HALF_PI, p.TWO_PI);
      }
      
      p.blendMode(p.BLEND);
    }
  }
});