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
let pixeldeltaPerMove = 16
let blockWidth = 16
let blockHeight = 16

function printBoardOnCanvas(self, board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var rect = self.add.rectangle( j*16, i*16, 16, 16).setOrigin(0,0);
            rect.setStrokeStyle(1, 0x990099, 1);
        }
    }       
}



// document.addEventListener('keyup', (event)=> {
//     console.log('up', event)
// })

