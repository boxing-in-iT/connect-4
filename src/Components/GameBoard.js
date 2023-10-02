import React, { useEffect } from "react";
import GameCircle from "./GameCircle";

import styles from "../styles/styles.css";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { getComputerMove, isDraw, isWinner } from "../helper";
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_CIRCLES,
  PLAYER_1,
  PLAYER_2,
  PLAYER_ZERO,
} from "../Constains";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(16).fill(PLAYER_ZERO));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(PLAYER_ZERO);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    console.log("init game");
    setGameBoard(Array(16).fill(PLAYER_ZERO));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setWinPlayer(PLAYER_ZERO);
  };

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircles(i));
    }
    return circles;
  };

  const suggestClick = () => {
    circleClicked(getComputerMove(gameBoard));
  };

  const circleClicked = (id) => {
    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(PLAYER_ZERO);
    }
    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }

    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    console.log(gameBoard);
  };

  const renderCircles = (id) => {
    return (
      <GameCircle
        key={id}
        id={id}
        onCircleClick={circleClicked}
        className={`player_${gameBoard[id]}`}
      />
    );
  };

  return (
    <>
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winPlayer={winPlayer}
      />
      <div className="gameBoard">{initBoard()}</div>
      <Footer onNewGameClick={initGame} onSuggestClick={suggestClick} />
    </>
  );
};
export default GameBoard;
