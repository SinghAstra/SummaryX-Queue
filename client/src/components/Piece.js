// src/Piece.js
import React from "react";
import "../styles/Piece.css";

const Piece = ({ type, color }) => {
  const pieceMap = {
    pawn: color === "white" ? "♙" : "♟",
    rook: color === "white" ? "♖" : "♜",
    knight: color === "white" ? "♘" : "♞",
    bishop: color === "white" ? "♗" : "♝",
    queen: color === "white" ? "♕" : "♛",
    king: color === "white" ? "♔" : "♚",
  };

  return <span className={`piece ${color}`}>{pieceMap[type]}</span>;
};

export default Piece;
