// Game initialization
const gameCanvas = document.getElementById('game-canvas')
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  parent: gameCanvas,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: true
      }
    },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  // scale: {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_BOTH
    // }
});
  
// o,i,s,z,l,j,t
// T
const pieces = {
  piece: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ]
}

let lastTime = 0
let passedTime = 0
let maxTime = 1000 // 1 sec

// Config Functions
function preload() {
  this.load.spritesheet('blocks', 'blocks.png', {
    frameWidth : 32,
    frameHeight : 32
  })
}
 
let start = {x:100, y:100}
function create() {
  this.piece = drawPieceOnCanvas(this, pieces, start)

  this.keyboardCursor = this.input.keyboard.createCursorKeys();

}

// runs at 1000/16 ~ 62.5 frames per sec
function update () { 
  // piece moving automatically down after 1 sec
  moveTileDown(this, this.time.now)

  // keyboard Control over the piece
  if (this.keyboardCursor.left.isDown){
    movePiece(this.piece, -10, 0)
  }else if(this.keyboardCursor.right.isDown){
    movePiece(this.piece, 10, 0)
  }else if(this.keyboardCursor.down.isDown){
    movePiece(this.piece, 0, 10) 
    passedTime = 0
  }
}

// Helper Functions
drawPieceOnCanvas = (self, pieces, start) => {
  let complete_piece = []
  const piece = pieces.piece  
  piece.forEach((row, x) => {
    row.forEach((col, y) => {
      if (piece[x][y] === 1){ 
        let a = self.add.sprite(y*32 +start.x, x*32 + start.y , 'blocks').setOrigin(0, 0)
        complete_piece.push(a)
      }
    })
  })  
  
  return complete_piece
}
function moveTileDown(self, currTime){
  let delta = currTime - lastTime
  lastTime = currTime
  passedTime += delta

  if (passedTime > maxTime) {
    movePiece(self.piece, 0, 20)
    passedTime = 0
  }
}

function movePiece (piece, x_offset, y_offset) {
  piece.forEach((item) => {
    item.x += x_offset
    item.y += y_offset
  })
}
