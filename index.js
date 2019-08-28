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

let start = {x:64, y:64}
let pixeldeltaPerMove = 32
let blockWidth = 32
let blockHeight = 32

// let emptyCell = 0
let dropedSprite = 7
let activeSprite = 2023

function printBoardOnCanvas(self) {
    for (let i = 0; i < self.board.length; i++) {
        for (let j = 0; j < self.board[i].length; j++) {
            var rect = self.add.rectangle( j*32, i*32, 32, 32).setOrigin(0,0);
            rect.setStrokeStyle(1, 0x990099, 1);
        }
    }       
}

