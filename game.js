// Game initialization
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640, // tiles being of 16 x 16
  height: 864, // tiles being of 16 x 16
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
  
// Config Functions
function preload() {
  // will be setting to 16 x 16 later on
  this.load.spritesheet('blocks', 'blocks.png', {
    frameWidth : 32,
    frameHeight : 32
  })
}
 

function create() {

  // Piece on Canvas
  this.piece = drawPieceOnCanvas(this, pieces, start)
  
  // Controller
  this.keyboardCursor = this.input.keyboard.createCursorKeys();
  // console.log()



  // Board Making
  this.board = playingBoard(this, game.canvas.clientWidth, game.canvas.clientHeight)

  printBoardOnCanvas(this, this.board)
  this.cameras.main.setBackgroundColor(0x990099)
}

// runs at 1000/16 ~ 62.5 frames per sec
function update () { 
  
  // piece moving automatically down after 1 sec
  moveTileDown(this, this.time.now)

  // keyboard Control over the piece
  if (this.keyboardCursor.left.isDown) {
    movePiece(this.piece, -pixelMovePerMove, 0)
    this.keyboardCursor.left.isDown = false
  }else if(this.keyboardCursor.right.isDown) {
    movePiece(this.piece, pixelMovePerMove, 0)
    this.keyboardCursor.right.isDown = false
    
  }else if(this.keyboardCursor.down.isDown) {
    movePiece(this.piece, 0, pixelMovePerMove) 
    this.keyboardCursor.down.isDown = false
    passedTime = 0
  }
  // just for testing
  else if(this.keyboardCursor.up.isDown){
    this.keyboardCursor.up.isDown = false
    movePiece(this.piece, 0, -pixelMovePerMove) 
  }
  
  // Filling Board with Piece position
  fillBoardAccordingToPiecesPos(this, this.piece)

  // inside index.js
}

// Helper Functions
function drawPieceOnCanvas (self, pieces, start) {
  let complete_piece = []
  const piece = pieces.piece  
  piece.forEach((row, x) => {
    row.forEach((col, y) => {
      if (piece[x][y] === 1){ 
        let a = self.add.sprite(y*blockWidth + start.x, x*blockHeight + start.y , 'blocks').setOrigin(0, 0).setScale(0.5)
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
    // movePiece(self.piece, 0, pixelMovePerMove)
    passedTime = 0
  }
}

function movePiece (piece, x_offset, y_offset) {
  piece.forEach(item => {
    item.x += x_offset
    item.y += y_offset
  })
}

function playingBoard (self, width, height) {

  // Since Sprite is of 32 X 32 we are making board cells of same Dimensions
  board = []
  for (let i = 0; i < height / blockHeight; i++) {
    board.push(new Array(width / blockWidth).fill(0))
  }

  console.log(board.length, board[0].length)

  return board;
}

function fillBoardAccordingToPiecesPos (self, piece) {
  piece.forEach(item => {
    let item_col = item.x / pixelMovePerMove
    let item_row = item.y / pixelMovePerMove

    // console.log(item_col, item_row)
    if(item_col >= 0 && item_col < 640 / pixelMovePerMove && item_row >= 0 && item_row <= 864 / pixelMovePerMove ) {
      self.board[item_row][item_col] = 1
    }
  })  
  // console.log('================')
}