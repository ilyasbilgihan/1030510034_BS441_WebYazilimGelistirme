
import Game from "./components/Game";
import { useState } from "react";

function App() {
  const [gameMode, setGameMode] = useState(null);

  return (
    <div className="App">
      <h1>Rock, Paper & Scissors Game</h1>
      {
        gameMode == null && (
          <div className="mode-header">
            <h4>Select a Game Mode</h4>
            <button onClick={() => setGameMode("1v1")}>You vs Computer 1</button>
            <button onClick={() => setGameMode("1v1v1")}>You vs Computer 1 vs Computer 2</button>
          </div>
        )
      }
      <Game gameMode={gameMode} setGameMode={setGameMode} />
    </div>
  );
}

export default App;
