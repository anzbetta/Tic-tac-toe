//import { useState } from "react";



export default function GameBoard({ togglePlayer, board}) {


    //const [gameBoard, setGameBoard] = useState(initialGameBoard);

    //function handleCellClick(rowIndex, colIndex) {
    //    setGameBoard(prevGameBoard => {
    //        const updatedGameBoard = [...prevGameBoard.map((row) => [...row])];
    //        updatedGameBoard[rowIndex][colIndex] = currentPlayer;
    //        return updatedGameBoard;
    //    });
    //    togglePlayer();
    //}
    return(
        <ol id = "game-board">
            {board.map((row, rowIndex) => (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (<li key={colIndex}><button onClick = {() => togglePlayer(rowIndex, colIndex)} disabled = {playerSymbol !== null}>{playerSymbol}</button></li>))}
                </ol>
            </li>))}
        </ol>
    );
}