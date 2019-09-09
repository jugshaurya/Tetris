// Game initialization
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640, // tiles being of 32 x 32
  height: 864, // tiles being of 32 x 32
  parent: gameCanvas,
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //       // gravity: { y: 300 },
  //       debug: true
  //     }
  //   },
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
  
let s;
// Config Functions
function preload() {
  s = this
  // will be setting to 32 x 32 later on
  this.load.spritesheet('blocks', 'blocks.png', {
    frameWidth : 32,
    frameHeight : 32
  })

  this.piece = {
    piece: null,
    matrix: pieces.piece ,
    center : {x : start.x , y: start.y}
  }

  console.log(this.piece)
}
 
function create() {

  // Board Making
  this.board = playingBoard(game.canvas.clientWidth, game.canvas.clientHeight)
  
  // Piece on Canvas and filling initially inside game-board
  this.piece = {
    ...this.piece,
    piece : drawPieceOnCanvas(this, this.piece.matrix, this.piece.center),
  }

  fillBoardAccordingToPiecesPos(this, 0, 0)  
  
  // Controller
  this.keyboardCursor = this.input.keyboard.createCursorKeys();
  key_A = this.input.keyboard.addKey('A')
  key_D = this.input.keyboard.addKey('D')
  // this.input.keyboard.on('keydown_D');

  // Printing of Board  - For testing Purpose
  printBoardOnCanvas(this)
  console.log(key_A)

  key_A.on('down', () => {
    rotate(this.piece.matrix, -1) 
    this.piece.piece.forEach(item => item.destroy())
    this.piece.piece = drawPieceOnCanvas(this, this.piece.matrix, this.piece.center)
  })

  key_D.on('down', () => {
    console.log('d enter')
    rotate(this.piece.matrix, 1) 
    this.piece.piece.forEach(item => item.destroy())
    console.log(this.piece.center)
    this.piece.piece = drawPieceOnCanvas(this, this.piece.matrix, this.piece.center)
    console.log('dout')
  })
}

// runs at 1000/32 ~ 62.5 frames per sec
function update () { 
  
  // piece moving automatically down after 1 sec
  moveTileDown(this, this.time.now)

  // keyboard Control over the piece
  if (this.keyboardCursor.left.isDown) {
    movePiece(this, -pixeldeltaPerMove, 0)
    this.keyboardCursor.left.isDown = false
    
  }else if(this.keyboardCursor.right.isDown) {
    movePiece(this, pixeldeltaPerMove, 0)
    this.keyboardCursor.right.isDown = false
    
  }else if(this.keyboardCursor.down.isDown) {
    movePiece(this, 0, pixeldeltaPerMove) 
    this.keyboardCursor.down.isDown = false
    passedTime = 0
  }  

  // console.log(key_A)
  // if w is pressed we rotate the matrix of current piece 
  // destroy all the old sprited availabel in this.piece.piece
  // this.piece.matrix is changes to rotated matrix and redrawn on canvas using drawPieceOnCanvas

  // if (a is pressed){
    // rotate(this.piece.matrix, -1) 
    // this.piece.piece.forEach(item => item.destroy())
    // this.piece.piece = drawPieceOnCanvas(this, this.piece.matrix, this.piece.center)
  // }

  // if (d is pressed){
  //   rotate(this.piece.matrix, 1) 
  //   this.piece.piece.forEach(item => item.destroy())
  //   this.piece.piece = drawPieceOnCanvas(this, this.piece.matrix, this.piece.center)
  // }
}
