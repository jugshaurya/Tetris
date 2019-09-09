const gameCanvas = document.getElementById('game-canvas')



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

let start = {
  x: 64,
  y: 64
}
let pixeldeltaPerMove = 32
let blockWidth = 32
let blockHeight = 32

// let emptyCell = 0
let dropedSprite = 7
let activeSprite = 2023

function printBoardOnCanvas(self) {
  for (let i = 0; i < self.board.length; i++) {
    for (let j = 0; j < self.board[i].length; j++) {
      var rect = self.add.rectangle(j * 32, i * 32, 32, 32).setOrigin(0, 0);
      rect.setStrokeStyle(1, 0x990099, 1);
    }
  }
}


// Helper Functions
function playingBoard(width, height) {
  // Since Sprite is of 32 X 32 we are making board cells of same Dimensions
  board = []
  for (let i = 0; i < height / blockHeight; i++) {
    board.push(new Array(width / blockWidth).fill(0))
  }
  return board;
}

function drawPieceOnCanvas(self, matrix, start) {
  let complete_piece = []
  const piece = matrix
  piece.forEach((row, x) => {
    row.forEach((col, y) => {
      if (piece[x][y] === 1) {
        let a = self.add.sprite(y * blockWidth + start.x, x * blockHeight + start.y, 'blocks').setOrigin(0, 0).setScale(1)
        complete_piece.push(a)
      }
    })
  })

  return complete_piece
}

function moveTileDown(self, currTime) {
  let delta = currTime - lastTime
  lastTime = currTime
  passedTime += delta

  if (passedTime > maxTime) {
    movePiece(self, 0, pixeldeltaPerMove)
    passedTime = 0
  }
}

function movePiece(self, x_offset, y_offset) {

  // if piece position + x_offset or pice position + y_offset > world limit then do not move the piece 
  if (worldLimit(self, x_offset, y_offset)) {
    if (overallCollisionDetection(self, x_offset / pixeldeltaPerMove, y_offset / pixeldeltaPerMove)) {
      // stop my piece and generate new piece
      console.log('fa')
      if (yCollisionDetection(self, x_offset / pixeldeltaPerMove, y_offset / pixeldeltaPerMove)) {
        replaceOldPieceDigit(self)
        self.piece.center.x = start.x
        self.piece.center.y = start.y

        self.piece.piece = drawPieceOnCanvas(self, self.piece.matrix, self.piece.center)
      }
    } else {
      // keep on doing what ever was happening
      self.piece.piece.forEach(item => {
        item.x += x_offset
        item.y += y_offset
      })

      self.piece.center.x += x_offset 
      self.piece.center.y += y_offset 
    }
    fillBoardAccordingToPiecesPos(self, x_offset / pixeldeltaPerMove, y_offset / pixeldeltaPerMove)
  }
}

function fillBoardAccordingToPiecesPos(self, last_col, last_row) {
  // resetting
  self.piece.piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    self.board[item_row - last_row][item_col - last_col] = 0
  })

  // updating
  self.piece.piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    self.board[item_row][item_col] = activeSprite

  })

}

function worldLimit(self, x_offset, y_offset) {

  for (let i = 0; i < self.piece.length; i++) {
    // checking for left and right boundaries
    // Remember : item is set according to top-left corner anchor point
    let item = self.piece.piece[i]
    if (item.x + x_offset < 0 ||
      item.x + x_offset > 640 - 32 ||
      item.y + y_offset > 864) {
      return false
    }
  }

  return true
}

function overallCollisionDetection(self, next_col, next_row) {
  for (let i = 0; i < self.piece.piece.length; i++) {
    let item = self.piece.piece[i]
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove

    if (item.y >= 864 - 32 || self.board[item_row + next_row][item_col + next_col] == 7) {
      return true
    }
  }
  return false
}

function yCollisionDetection(self, next_col, next_row) {
  for (let i = 0; i < self.piece.piece.length; i++) {
    let item = self.piece.piece[i]
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove

    if (item.y >= 864 - 32 || self.board[item_row + next_row][item_col] == 7) {
      return true
    }
  }
  return false
}


function replaceOldPieceDigit(self) {
  self.piece.piece.forEach(item => {
    let item_col = item.x / pixeldeltaPerMove
    let item_row = item.y / pixeldeltaPerMove
    self.board[item_row][item_col] = dropedSprite
  })
}


function rotate(matrix, dir) {

  // clockwise- rotation = Transpose + row reversal
  // anticlockwise-rotation = transpose + col reversal
  
  //transpose
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[i].length; j++) {
      temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }


  if (dir > 0 ){
    // row-reversel
    matrix = matrix.map(row => row.reverse()) 
  }else {
    //col-reversal
    n = matrix.length
    for (let i = 0; i < n / 2; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        temp = matrix[i][j]
        matrix[i][j] = matrix[n-i-1][j]
        matrix[n-i-1][j] = temp
      }
    }
  }
  
  // fillBoardAccordingToPiecesPos(self, x_offset / pixeldeltaPerMove, y_offset / pixeldeltaPerMove)
}