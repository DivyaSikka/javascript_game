import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [selectLetter, letterOrEmpty] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mustWin, setMustWin] = useState(false);
    
    function handleClick(i) {
	    if (calculateWinner(squares)) {
            console.log("Already won");
            return;
        }
        if (!(checkSix(squares))){
            if (squares[i]){
                console.log("Square taken");
                return;
            }
            const nextSquares = squares.slice();
            nextSquares[i] = "X";
            if (xIsNext) {
                nextSquares[i] = "X";
            } else {
                nextSquares[i] = "O";
            }
            setSquares(nextSquares);
            setXIsNext(!xIsNext);
            return;
        }
        //know that all 6 are taken
        const nextSquares = squares.slice();
        if (xIsNext) {
            if (nextSquares[i] === null){
                if (selectLetter === true){
                    console.log("Empty Square: Invalid");
                }
                if (selectLetter === false){
                    //check if it is contiguous to the original square
                    if (!checkAdjacent(selectedIndex, i)){
                        console.log("Not adjacent");
                        return;
                    }
                    if(mustWin){
                        if(!nextMoveWin(i, nextSquares, "X")){
                            console.log("Invalid Move: Not winning");
                            return;
                        }
                    }
                    nextSquares[i] = "X";
                    nextSquares[selectedIndex] = null; //original square
                    setSquares(nextSquares);
                    setXIsNext(!xIsNext);
                    letterOrEmpty(!selectLetter);
                    console.log(selectLetter);
                    console.log("Changed to select letter");
                    return;
                }
            }
            if (nextSquares[i] === "X"){
                //user selected an X
                //check the state
                if (selectLetter === true){
                    //checks if there is X in middle or if X can win in next move
                    if(isCenterOrWin(i, nextSquares, "X")){
                        console.log("Valid Move");
                        letterOrEmpty(!selectLetter);
                        setSelectedIndex(i); //set the index
                        console.log("Index set: ", i);
                        console.log("State Changed");
                    }
                    else{
                        console.log("Invalid Move: click another 'X'");
                    }
                }
                if (selectLetter === false){
                    console.log("Selected Letter instead of empty: Invalid");
                }
            }
            if (nextSquares[i] === "O"){
                console.log("Wrong Letter: Invalid");
            }
        }

        else {
            //For "O"
            if (nextSquares[i] === null){
                if (selectLetter === true){
                    console.log("Empty Square: Invalid");
                }
                if (selectLetter === false){
                    //check if it is contiguous to the original square
                    if (!checkAdjacent(selectedIndex, i)){
                        console.log("Not adjacent");
                        return;
                    }
                    if(mustWin){
                        if(!nextMoveWin(i, nextSquares, "O")){
                            console.log("Invalid Move: Not winning");
                            return;
                        }
                    }
                    nextSquares[i] = "O";
                    nextSquares[selectedIndex] = null; //original square
                    setSquares(nextSquares);
                    setXIsNext(!xIsNext);
                    letterOrEmpty(!selectLetter);
                    console.log(selectLetter);
                    console.log("Changed to select letter");
                    return;
                }
            }
            if (nextSquares[i] === "O"){
                //user selected an O
                //check the state
                if (selectLetter === true){
                    //checks if there is O in middle or if O can win in next move
                    if(isCenterOrWin(i, nextSquares, "O")){
                        console.log("Valid Move");
                        letterOrEmpty(!selectLetter);
                        setSelectedIndex(i); //set the index
                        console.log("Index set: ", i);
                        console.log("State Changed");
                    }
                    else{
                        console.log("Invalid Move: click another 'O'");
                    }
                }
                if (selectLetter === false){
                    console.log("Selected Letter instead of empty: Invalid");
                }
            }
            if (nextSquares[i] === "X"){
                console.log("Wrong Letter: Invalid");
            }
       	}
    }

    function isCenterOrWin(i, squares, turn){
        //check if in center
        if(i === 4){
            return true;
        }
        if(squares[4] !== turn){
            return true;
        }
        //get the list of first squares to win
        let l = winInSingleMove(squares, turn);
        if(l.length === 0){
            console.log("Cannot win in any move");
            return false; //can't win, so must move center, block move
        }
        //can win in next move
        for(let x = 0; x < l.length; x++){
            console.log(l[x]);
            if (l[x] === i){
                setMustWin(true);
                return true; //they clicked a peice they can win with
            }
        }
        console.log("Can win, but did not click on right box");
        return false; //they cannot make that move
    }    

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkSix(squares) {
    let counter = 0;
    for (let i = 0; i < squares.length; i++) {
	    if (squares[i]){
	        counter++;
	    }
    }
    if (counter === 6){
	    return true;
    }
    return false;
}

function checkAdjacent(i, j) {
    const intToAdj = new Map();

    //make map of indices and their adjacent indices to know what is allowed 
    intToAdj.set(0, [1, 3, 4]);
    intToAdj.set(1, [0, 2, 3, 4, 5]);
    intToAdj.set(2, [1, 4, 5]);
    intToAdj.set(3, [0, 1, 4, 6, 7]);
    intToAdj.set(4, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    intToAdj.set(5, [1, 2, 4, 7, 8]);
    intToAdj.set(6, [3, 4, 7]);
    intToAdj.set(7, [3, 4, 5, 6, 8]);
    intToAdj.set(8, [4, 5, 7]);

    let l = intToAdj.get(i); //get the list

    for (let k = 0; k < l.length; k++){
        if (l[k] === j){
            return true;
        }
    }
    return false;
}

function winInSingleMove(squares, turn){
    const intToAdj = new Map();
    //make map of indices and their adjacent indices to know what is allowed 
    intToAdj.set(0, [1, 3, 4]);
    intToAdj.set(1, [0, 2, 3, 4, 5]);
    intToAdj.set(2, [1, 4, 5]);
    intToAdj.set(3, [0, 1, 4, 6, 7]);
    intToAdj.set(4, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    intToAdj.set(5, [1, 2, 4, 7, 8]);
    intToAdj.set(6, [3, 4, 7]);
    intToAdj.set(7, [3, 4, 5, 6, 8]);
    intToAdj.set(8, [4, 5, 7]);

    const startingIndices = [];
    //nested for loops, first checks for the index of the square who's turn it is
    for (let i = 0; i < squares.length; i++){
        if (squares[i] === turn){
            //once found, get the list of their adj squares
            let l = intToAdj.get(i);
            //go through that list and test them all
            for(let j = 0; j < l.length; j++){
                //check if any of the ones on the list let u win
                //move first
                let temp = l[j];
                //check if squares[temp] is not null 
                if(squares[temp] === null){
                    squares[temp] = turn; //if not, move it to that spot
                }
                else{
                    continue;
                }
                //check if it wins with that square
                if (calculateWinner(squares) === turn){
                    startingIndices.push(i);
                    squares[temp] = null;
                    break; //goes to the next i
                }
                squares[temp] = null; //set to null always
            }
        }
    }
    return startingIndices;
}

    function nextMoveWin(i, squares, turn){
        //add X or O to the board
        squares[i] = turn;
        if(calculateWinner(squares) === turn){
            squares[i] = null;
            return true;
        }
        squares[i] = null; //remove it from board
        return false;
    }
