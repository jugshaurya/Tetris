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

  this.piece = null
}
 
function create() {

  // Board Making
  this.board = playingBoard(game.canvas.clientWidth, game.canvas.clientHeight)
  
  // Piece on Canvas and filling initially inside game-board
  this.piece = drawPieceOnCanvas(this, pieces, start)
  fillBoardAccordingToPiecesPos(this, 0, 0)  
  
  // Controller
  this.keyboardCursor = this.input.keyboard.createCursorKeys();

  // Printing of Board  - For testing Purpose
  printBoardOnCanvas(this)
}

// runs at 1000/16 ~ 62.5 frames per sec
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
}

// Helper Functions
function playingBoard (width, height) {
  // Since Sprite is of 32 X 32 we are making board cells of same Dimensions
  board = []
  for (let i = 0; i < height / blockHeight; i++) {
    board.push(new Array(width / blockWidth).fill(0))
  }
  return board;
}

function drawPieceOnCanvas (self, pieces, start) {
  let complete_piece = []
  const piece = pieces.piece  
  piece.forEach((row, x) => {
    row.forEach((col, y) => {
      if (piece[x][y] === 1) { 
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
    movePiece(self, 0, pixeldeltaPerMove)
    passedTime = 0
  }
}

function movePiece (self, x_offset, y_offset) {

  // if piece position + x_offset or pice position +y_offset > world limit then do not move the piece 
  if (worldLimit(self, x_offset, y_offset)) {
    if (collisionDetection(self, x_offset/pixeldeltaPerMove, y_offset/pixeldeltaPerMove)) {
      // stop my piece and generate new piece
      console.log('fa')
      replaceOldPieceDigit(self)
      self.piece = drawPieceOnCanvas(self, pieces, start)
    }else{
      // keep on doing what ever was happening
      self.piece.forEach(item => {
        item.x += x_offset
        item.y += y_offset
      })
    }
    fillBoardAccordingToPiecesPos(self, x_offset/pixeldeltaPerMove, y_offset/pixeldeltaPerMove)
  }
}

function fillBoardAccordingToPiecesPos (self, last_col, last_row) {
  // resetting
  self.piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    self.board[item_row - last_row][item_col - last_col] = 0
  })

  // updating
  self.piece.forEach( item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove    
    self.board[item_row][item_col] = activeSprite

  })

}

function worldLimit (self, x_offset, y_offset) {

  for (let i = 0; i < self.piece.length; i++) {
    // checking for left and right boundaries
    // Remember : item is set according to top-left corner anchor point
    let item = self.piece[i]
    if (item.x + x_offset < 0 
      || item.x + x_offset > 640-16
      || item.y + y_offset > 864) {
      return false
    }
  }

  return true
}

// function generateMorePieces (self) {
//   self.piece.forEach(item => {
//     if (item.y >= 864 - 16 ){
//       self.piece = drawPieceOnCanvas (self, pieces, start)
//     }
//   })
// }

function collisionDetection (self, next_col, next_row) {
  for (let i = 0; i < self.piece.length; i++) {
    let item = self.piece[i]
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove

    if (item.y >= 864 - 16 || self.board[item_row + next_row][item_col + next_col] == 7 ){
      return true
    }
  }
  return false
}


function replaceOldPieceDigit (self) {
  self.piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    self.board[item_row][item_col] = dropedSprite  
  })
}