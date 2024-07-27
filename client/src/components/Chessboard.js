import React from "react";
import "../styles/ChessBoard.css";

const ChessBoard = () => {
  const board = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isBlack = (row + col) % 2 === 1;
      board.push(
        <div
          className={`square ${isBlack ? "black" : "white"}`}
          key={`${row}-${col}`}
        />
      );
    }
  }
  return <div className="board">{board}</div>;
};

export default ChessBoard;
