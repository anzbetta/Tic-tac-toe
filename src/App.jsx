import {useState} from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import Winner from './components/Winner.jsx';



const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, userNames) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = userNames[firstSquareSymbol];
    }
  }
  return winner;
}




function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [userNames, setUserNames] = useState({
    X: localStorage.getItem("X") || "Player 1",
    O: localStorage.getItem("O") || "Player 2"}
  );


  function getGameBoard(gameTurns) {
    const gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
    for (const turn of gameTurns){
      const {square, player} = turn;
      const {rowIndex, colIndex} = square;
      gameBoard[rowIndex][colIndex] = player; 
    }
    return gameBoard;
  }
  const gameBoard = getGameBoard(gameTurns);
  const currentPlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, userNames);
  const isDraw = gameTurns.length === 9 && !winner;


  function handleNameChange(symbol, newName) {
    setUserNames((prevNames) => {
      const updatedNames = { ...prevNames, [symbol]: newName };
      localStorage.setItem(symbol, newName);
      return updatedNames;
    })
  }

  function togglePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns)=> {
      const activePlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{
        square: {rowIndex, colIndex},
        player: activePlayer
      },
       ...prevTurns]
      return updatedTurns;
      
    });
  }

  function resetGame() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id = 'game-container'>
        <ol id = 'players' className='highlight-player'>
          <Player name = {userNames.X} symbol = "X" isActive = {currentPlayer === "X"} onNameChange = {handleNameChange}></Player>
          <Player name = {userNames.O} symbol = "O" isActive = {currentPlayer === "O"} onNameChange = {handleNameChange}></Player>
        </ol>
        {(winner || isDraw) && <Winner winner = {winner} onReset = {resetGame}/>}
        <GameBoard togglePlayer={togglePlayer} board = {gameBoard} />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
