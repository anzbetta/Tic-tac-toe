import Player from './components/Player.jsx';
function App() {
  

  return (
    <main>
      <div id = 'game-container'>
        {/* PLAYERS*/}
        <ol id = 'players'>
          <Player initialName = "P1" symbol = "X"></Player>
          <Player initialName = "P2" symbol = "O"></Player>
        </ol>

        {/* BOARD*/}
      </div>
      {/*LOG*/}
    </main>
  )
}

export default App
