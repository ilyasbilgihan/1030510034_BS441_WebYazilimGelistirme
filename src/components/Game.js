
import { useState, useEffect } from "react";
import Player from "./Player";

export default function Game({ gameMode }) {

  const [moves, setMoves] = useState([]);
  const [scores, setScores] = useState([0,0,0])

  const handleRound = (move) =>{
    
    const moves = ["rock", "paper", "scissors"];
    
    // random number between 0 and 2 will define the computer(s) move(s)
    const random1 = Math.floor(Math.random() * 3);
    const random2 = Math.floor(Math.random() * 3);
    
    setMoves([move, moves[random1], moves[random2]]);
  }

  return gameMode && (
    <>
      <div className="game-header">
        <div>
          <div>
            <span>Game Mode:</span>
            <span>{gameMode}</span>
          </div>
          <br />
          <h4>Select Your Move</h4>
          <div className="">
            <button onClick={() => handleRound("rock")}>Rock</button>
            <button onClick={() => handleRound("paper")}>Paper</button>
            <button onClick={() => handleRound("scissors")}>Scissors</button>
          </div>
        </div>
        <div>
          <div className="scores">
            <h4>Scores</h4>
            <div>
              <div>You</div>
              <div>{scores[0]}</div>
            </div>
            <div>
              <div>Computer 1</div>
              <div>{scores[1]}</div>
            </div>
            {
              gameMode == "1v1v1" && (
                <div>
                  <div>Computer 2</div>
                  <div>{scores[2]}</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      {
        gameMode == "1v1" ? (
          <div>
            <Player name="You" move={moves[0]}/>
            <Player name="Computer 1" move={moves[1]}/>
          </div>
        ) : gameMode == "1v1v1" ? (
          <div>
            <Player name="You" move={moves[0]}/>
            <Player name="Computer 1" move={moves[1]}/>
            <Player name="Computer 2" move={moves[2]}/>
          </div>
        ) : null
      }
    </>
  )
}