window.addEventListener('load', () => {
    
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let margin = 30,
        canvas_width = (canvas_height = canvas.width = canvas.height = 600 + margin * 2),
        row = 18,
        rowSize = 600 / row,
        dolSize = 13;

    if (window.innerWidth < 500) {
        margin = 15;
        canvas_width = (canvas_height = canvas.width = canvas.height = 300 + margin * 2);
        rowSize = 300/row;
        dolSize = 6;
    }

    let count = 0,
        message = document.querySelector('.message'),
        reload_btn = document.querySelector('.reload');

    let board = new Array(Math.pow(row + 1, 2)).fill(-1),
        history = new Array(),
        checkDirection = [
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
        ];
    
    let blackWin_div = document.querySelector('.winShow1'),
        whiteWin_div = document.querySelector('.winShow2');

    add_reload(reload_btn);

    let draw_board = () => {

        context.fillStyle = 'rgb(253, 187, 100)';
        context.fillRect(0, 0, canvas_width, canvas_height);

        for (let x = 0; x < row; x++) {
            for (let y = 0; y < row; y++) {
                let w = (canvas_width - margin * 2) / row;
                context.strokeStyle = 'black';
                context.lineWidth = 1;
                context.strokeRect(w * x + margin, w * y + margin, w, w);
            }
        }

    }

    draw_board();
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            context.fillStyle = 'black';
            context.lineWidth = 1;
            context.beginPath();
            context.arc(
                (3 + i) * rowSize + margin + i * 5 * rowSize,
                (3 + j) * rowSize + margin + j * 5 * rowSize,
                dolSize / 3,
                0,
                Math.PI * 2
            );
            context.fill();
        }
    }

    let xy_index = (x,y) => {

        return x + y * (row + 1);

    };

    let index_xy = (index) => {

        let n = Math.sqrt(board.length);
        let x = index % n,
            y = Math.floor(index / n);
        
        return [x,y];

    }

    let place_Dol = (x, y) => {
        
        draw_board();

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                context.fillStyle = 'black';
                context.lineWidth = 1;
                context.beginPath();
                context.arc(
                    (3 + i) * rowSize + margin + i * 5 * rowSize,
                    (3 + j) * rowSize + margin + j * 5 * rowSize,
                    dolSize / 3,
                    0,
                    Math.PI * 2
                );
                context.fill();
            }
        }

        for (i = 0; i < board.length; i++) {

          let a = index_xy(i)[0],
              b = index_xy(i)[1];
    
          if (board[xy_index(a, b)] == 1) {
            
            context.fillStyle = 'black';
            context.beginPath();
            context.arc(
              a * rowSize + margin,
              b * rowSize + margin,
              dolSize,
              0,
              Math.PI * 2
            );
            context.fill();

          };

          if (board[xy_index(a, b)] == 2) {

            context.fillStyle = 'white';
            context.beginPath();
            context.arc(
              a * rowSize + margin,
              b * rowSize + margin,
              dolSize,
              0,
              Math.PI * 2
            );
            context.fill();

          };

        };
    
        checkWin(x, y);
    
        let boardCopy = Object.assign([], board);

        history.push(boardCopy);

    };

    let checkWin = (x, y) => {

        let curColor = board[xy_index(x, y)];
      
        for (i = 0; i < 4; i++) {

            let black_count = 1;
            let white_count = 1;

            for (j = 0; j < 2; j++) {
          
                for (k = 1; k < 5; k++) {

                    let a = x + checkDirection[i + 4 * j][0] * k;
                    let b = y + checkDirection[i + 4 * j][1] * k;
                    
                    if (board[xy_index(a, b)] == curColor) {
            
                        switch (curColor) {
                            case 1: black_count++; break;
                            case 2: white_count++; break;
                        }

                    } else { break; }

                }

            }

            if (black_count == 5) {winShow(1);}
            if (white_count == 5) {winShow(2);}

      }

    }
    
    let winShow = (x) => {

        switch (x) {

            case 1:
                setTimeout(() => {
                blackWin_div.style.visibility = 'visible';
                blackWin_div.style.zIndex = 2;
                }, 300);
                break;
            case 2:
                setTimeout(() => {
                    whiteWin_div.style.visibility = 'visible';
                    whiteWin_div.style.zIndex = 2;
                }, 300);
                break;

        }

    }

    document.addEventListener('mouseup', (e) => {

        if (e.target.id == 'canvas') {

            let x = Math.round(Math.abs(e.offsetX - margin) / rowSize),
                y = Math.round(Math.abs(e.offsetY - margin) / rowSize);

            if (

                e.offsetX > 10 &&
                e.offsetX < 640 &&
                e.offsetY > 10 &&
                e.offsetY < 640

            ) {
              
                if (board[xy_index(x, y)] == -1) {

                    count % 2 == 0
                    ? (board[xy_index(x, y)] = 1)
                    : (board[xy_index(x, y)] = 2);
                    count++;
                    place_Dol(x, y);

                }
                    
              }

            }

          }

    );

    document.querySelector('.other-btn').addEventListener('mouseup', (e) => {

        window.location.href = '../index.html';

    })
});
  

let add_reload = function(btn) {

    btn.addEventListener('mouseup', () => {

        setTimeout(() => {
            location.reload();
        }, 1000);

    });

};

let indexView = function(num) {

    let s = '\n';
    let c = 0;
    
    for (let e of umm) {
        s += `${e}`;
        if (c % (row + 1) === row) s += '\n';
        c++;
    }

    return s;

}