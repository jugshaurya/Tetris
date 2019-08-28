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
let pixelMovePerMove = 16
let blockWidth = 16
let blockHeight = 16

function printBoardOnCanvas(self, board) {
    // console.log(board.length)
    for (let i = 0; i < board.length; i++) {
        // console.log(i)
        for (let j = 0; j < board[i].length; j++) {
            // console.log('dhf')
            var rect = self.add.rectangle( j*16, i*16, 16, 16).setOrigin(0,0);
            rect.setStrokeStyle(1, '#00fff0', 1);
            // var graphics = self.add.graphics()
            // var rect = self.add.rectangle(i*16, j*16, 16, 16);
            // graphics.fillRectShape(rect); // rect: {x, y, width, height}
            // graphics.fillRect(i*16, j*16, 16, 16);
            // graphics.strokeRectShape(rect);  // rect: {x, y, width, height}
            // graphics.strokeRect(i*16, j*16, 16, 16);            
        }
    }       
}



// document.addEventListener('keyup', (event)=> {
//     console.log('up', event)
// })

