
import { useState, useEffect } from "react";
import Player from "./Player";

const PLAYERS = ["You", "Computer 1", "Computer 2"]
const WIN_1V1 = 5
const WIN_1V1V1 = 10

export default function Game({ gameMode, setGameMode }) {

  const [moves, setMoves] = useState([]);
  const [scores, setScores] = useState([0,0,0])
  const [victory, setVictory] = useState([])

  const handleRound = (move) =>{
    
    const opts = ["rock", "paper", "scissors"];
    
    // random number between 0 and 2 will define the computer(s) move(s)
    const random1 = Math.floor(Math.random() * 3);
    const random2 = Math.floor(Math.random() * 3);

    const newMoves = [move, opts[random1], opts[random2]]
    setMoves(newMoves);
    updateScores(newMoves)
    
  
  }

  const updateScores = (newMoves)=> {
    const freq = calculateFrequency(gameMode == "1v1" ? newMoves.slice(0,-1) : newMoves)
    const tempScores = []
    const limit = gameMode == "1v1" ? 1 : 2

    for(let i = 0; i <= limit; i++){
      let score = 0
      
      if(newMoves[i] == "rock"){
        score += freq["scissors"]
      }
      if(newMoves[i] == "paper"){
        score += freq["rock"]
      }
      if(newMoves[i] == "scissors"){
        score += freq["paper"]
      }
      tempScores.push(score)
    }
    let newScores = sumScores(scores, tempScores)

    const vic = [] 
    newScores.forEach((s,i)=>{
      const treshold = gameMode == "1v1" ? WIN_1V1 : WIN_1V1V1
      if(s >= treshold){
        vic.push(i)
      }
    })
    if(vic.length>0){
      setVictory(vic)
    }


    setScores(newScores)
  }

  const calculateFrequency = (arr) => {
    let frequency = {rock: 0, paper: 0, scissors: 0}
    arr.forEach((item)=>{
      frequency[item] += 1
    })
    return frequency;
  }

  const sumScores = (arr1, arr2) => {
    const resArr = []
    for(let i = 0; i< arr1.length; i++){
      resArr.push(arr1[i] + arr2[i])
    }
    return resArr
  }
  const resetGame = ()=> {
    setVictory([])
    setGameMode(null)
    setMoves([])
    setScores([0,0,0])
  }

  return gameMode && (
    <>
      <div className="game-header">
        <div>
          <div>
            <b>Game Mode: </b>
            <span>{gameMode} </span>
            <span>(win at {gameMode == "1v1" ? WIN_1V1 : WIN_1V1V1})</span>
          </div>
          <br />
          <h4>Select Your Move</h4>
          <div style={{display:"flex",gap: "5px", marginTop: "8px"}}>
            <button onClick={() => handleRound("rock")}>Rock</button>
            <button onClick={() => handleRound("paper")}>Paper</button>
            <button onClick={() => handleRound("scissors")}>Scissors</button>
          </div>
        </div>
        <div>
          <div className="scores">
            <b>Scores</b>
            <div>
              <b>You</b>
              <div>{scores[0]}</div>
            </div>
            <div>
              <b>Computer 1</b>
              <div>{scores[1]}</div>
            </div>
            {
              gameMode == "1v1v1" && (
                <div>
                  <b>Computer 2</b>
                  <div>{scores[2]}</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div style={{display:"flex", alignItems: "center", textAlign:"center", gap:"100px", justifyContent: "center"}}>
        <Player name="You" move={moves[0]}/>
        <div>
          <Player name="Computer 1" move={moves[1]} suffix="-r"/>
          {gameMode == "1v1v1" && (<Player name="Computer 2" move={moves[2]} suffix="-r"/>)}
        </div>
        {
          victory.length != 0 && (
            <>
              {
                victory.length == 1 ? (
                  <div>{victory[0] != 0 ? "You Lose | Winner: "+ PLAYERS[victory[0]] : "You Win"}</div>
                ) : (
                  <div>Draw between | {victory.map(v=> PLAYERS[v]).join(", ")}</div>
                )
              }
              <div>
                <button onClick={resetGame}>Play again</button>
              </div>
            </>
          )
        }
      
      </div>
    </>
  )
}