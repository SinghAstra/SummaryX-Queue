// src/ChessBoard.js
import React, { useState } from "react";
import "../styles/ChessBoard.css";
import Piece from "./Piece";

const initialBoard = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  Array(8).fill("pawn"),
  ...Array(4).fill(Array(8).fill(null)),
  Array(8).fill("pawn"),
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
];

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard);

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isBlack = (rowIndex + colIndex) % 2 === 1;
          return (
            <div
              className={`square ${isBlack ? "green" : "white"}`}
              key={`${rowIndex}-${colIndex}`}
            >
              {piece && (
                <Piece type={piece} color={rowIndex < 2 ? "black" : "white"} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
