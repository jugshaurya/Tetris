// Game initialization
const gameCanvas = document.getElementById('game-canvas')
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#111111',
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

// Config Functions
function preload() {
  this.load.spritesheet('blocks', 'blocks.png', {
    frameWidth : 32,
    frameHeight : 32
  })
}

let offset = {x:100, y:100}
function create() {
  this.piece = drawPieceOnCanvas(this, pieces, offset)
}

// runs at 1000/16 ~ 62.5 frames per sec
function update () { 
  
  // piece moving automatically down after 1 sec
  moveTileDown(this, this.time.now)
}

// Helper Functions
drawPieceOnCanvas = (self, pieces, offset) => {
  let complete_piece = []
  const piece = pieces.piece  
  piece.forEach((row, x) => {
    row.forEach((col, y) => {
      if (piece[x][y] === 1){ 
        let a = self.add.sprite(y*32 +offset.x, x*32 + offset.y , 'blocks').setOrigin(0, 0)
        complete_piece.push(a)
      }
    })
  })  
  
  return complete_piece
}

let lastTime = 0
let passedTime = 0
let maxTime = 1000 // 1 sec
function moveTileDown(self, currTime){
  let delta = currTime - lastTime
  lastTime = currTime
  passedTime += delta

  if (passedTime > maxTime) {
    self.piece.forEach((item) => {
      item.y += 10
    })

    passedTime = 0
  }
}
