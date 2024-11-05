import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicTacToe = () => {
  const rows = 9;
  const cols = 5;
  const winningCondition = 5;

  const [board, setBoard] = useState(Array(rows * cols).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningSquares, setWinningSquares] = useState([]);

  const winnerInfo = calculateWinner(board, winningCondition, rows, cols);
  const status = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : gameOver
    ? 'Hòa'
    : `Next player: ${xIsNext ? 'Apple' : 'Android'}`;

  const handleClick = (i) => {
    if (winnerInfo || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'Apple' : 'Android';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkGameOver(newBoard);
  };

  const checkGameOver = (currentBoard) => {
    const isFull = currentBoard.every((cell) => cell !== null);
    const winnerInfo = calculateWinner(currentBoard, winningCondition, rows, cols);
    if (isFull || winnerInfo) {
      setGameOver(true);
      if (winnerInfo) {
        setWinningSquares(winnerInfo.winningSquares);
      }
    }
  };

  const handleRestart = () => {
    setBoard(Array(rows * cols).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinningSquares([]);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningSquares.includes(i);
    const icon = board[i] === 'Apple' ? 'apple' : board[i] === 'Android' ? 'android' : '';

    return (
      <TouchableOpacity style={styles.square} onPress={() => handleClick(i)}>
        <Icon
          name={icon}
          size={30}
          color={isWinningSquare ? 'red' : 'black'}
        />
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const boardRows = [];

    for (let row = 0; row < rows; row++) {
      const rowSquares = [];
      for (let col = 0; col < cols; col++) {
        rowSquares.push(renderSquare(row * cols + col));
      }
      boardRows.push(
        <View key={row} style={styles.boardRow}>
          {rowSquares}
        </View>
      );
    }

    return boardRows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>{renderBoard()}</View>
      <View style={styles.button}>
        <Button title="Bắt đầu lại" onPress={handleRestart} disabled={!gameOver} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  board: {
   
    flexDirection: 'column',
  },
  boardRow: {
    flexDirection: 'row',
  },
  button:{
    marginTop:10,
  },
  square: {
    width: 40,
    height:40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const calculateWinner = (squares, winningCondition, rows, cols) => {
  const lines = [];

  // Kiểm tra hàng ngang
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - winningCondition; col++) {
      const line = [];
      for (let i = 0; i < winningCondition; i++) {
        line.push(row * cols + col + i);
      }
      lines.push(line);
    }
  }

  // Kiểm tra hàng dọc
  for (let row = 0; row <= rows - winningCondition; row++) {
    for (let col = 0; col < cols; col++) {
      const line = [];
      for (let i = 0; i < winningCondition; i++) {
        line.push((row + i) * cols + col);
      }
      lines.push(line);
    }
  }

  // Kiểm tra đường chéo chính
  for (let row = 0; row <= rows - winningCondition; row++) {
    for (let col = 0; col <= cols - winningCondition; col++) {
      const line = [];
      for (let i = 0; i < winningCondition; i++) {
        line.push((row + i) * cols + col + i);
      }
      lines.push(line);
    }
  }

  // Kiểm tra đường chéo phụ
  for (let row = 0; row <= rows - winningCondition; row++) {
    for (let col = winningCondition - 1; col < cols; col++) {
      const line = [];
      for (let i = 0; i < winningCondition; i++) {
        line.push((row + i) * cols + col - i);
      }
      lines.push(line);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const winner = squares[line[0]];
    if (winner) {
      let isWinningLine = true;
      for (let j = 1; j < line.length; j++) {
        if (squares[line[j]] !== winner) {
          isWinningLine = false;
          break;
        }
      }
      if (isWinningLine) {
        return { winner, winningSquares: line };
      }
    }
  }

  return null;
};

export default TicTacToe;
