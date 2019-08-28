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
  
let s;
// Config Functions
function preload() {
  s = this
  // will be setting to 16 x 16 later on
  this.load.spritesheet('blocks', 'blocks.png', {
    frameWidth : 32,
    frameHeight : 32
  })
}
 
function create() {

  // Board Making
  this.board = playingBoard(this, game.canvas.clientWidth, game.canvas.clientHeight)
  
  // Piece on Canvas
  this.piece = drawPieceOnCanvas(this, pieces, start)
  
  // Controller
  this.keyboardCursor = this.input.keyboard.createCursorKeys();


  // Printing of Board  - For testing Purpose
  printBoardOnCanvas(this, this.board)
}

// runs at 1000/16 ~ 62.5 frames per sec
function update () { 
  
  // piece moving automatically down after 1 sec
  moveTileDown(this, this.time.now)

  // keyboard Control over the piece
  if (this.keyboardCursor.left.isDown) {
    movePiece(this, this.piece, -pixeldeltaPerMove, 0)
    this.keyboardCursor.left.isDown = false
    
  }else if(this.keyboardCursor.right.isDown) {
    movePiece(this, this.piece, pixeldeltaPerMove, 0)
    this.keyboardCursor.right.isDown = false
    
  }else if(this.keyboardCursor.down.isDown) {
    movePiece(this, this.piece, 0, pixeldeltaPerMove) 
    this.keyboardCursor.down.isDown = false
    passedTime = 0
  }
  // just for testing
  else if(this.keyboardCursor.up.isDown){
    movePiece(this,this.piece, 0, -pixeldeltaPerMove) 
    this.keyboardCursor.up.isDown = false
  }
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
  
  fillBoardAccordingToPiecesPos(self, complete_piece)  
  return complete_piece
}

function moveTileDown(self, currTime){
  let delta = currTime - lastTime
  lastTime = currTime
  passedTime += delta

  if (passedTime > maxTime) {
    movePiece(self, self.piece, 0, pixeldeltaPerMove)
    passedTime = 0
  }
}

function movePiece (self, piece, x_offset, y_offset) {

  // if piece position + x_offset or pice position +y_offset > world limit then do not move the piece 
  console.log(worldLimit(self, piece, x_offset, y_offset))
  if (worldLimit(self, piece, x_offset, y_offset)) {
    piece.forEach(item => {
      item.x += x_offset
      item.y += y_offset
    })

    fillBoardAccordingToPiecesPos(self, piece)
  }
}

function playingBoard (self, width, height) {

  // Since Sprite is of 32 X 32 we are making board cells of same Dimensions
  board = []
  for (let i = 0; i < height / blockHeight; i++) {
    board.push(new Array(width / blockWidth).fill(0))
  }
  return board;
}

function fillBoardAccordingToPiecesPos (self, piece) {
  // console.log(self.board)
  piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    // console.log('sd', item_row, item_col)
    
    if(item_col >= 0 && item_col < 640 / pixeldeltaPerMove && item_row >= 0 && item_row <= 864 / pixeldeltaPerMove ) {
      // console.log(self.board[item_row][item_col])
      self.board[item_row][item_col] = 1
    }
  })  

  // console.log('================')
}

function worldLimit (self, piece, x_offset, y_offset) {

  for (let i = 0; i < piece.length; i++) {
    // checking for left and right boundaries
    // Remember : item is set according to top-left corner anchor point

    let item = piece[i]
    // console.log(item.x, x_offset)
    if (item.x + x_offset < 0){
      return false
    }
  
    if (item.x + x_offset > 640-16) {
      return false
    }
    
  }
  return true
}