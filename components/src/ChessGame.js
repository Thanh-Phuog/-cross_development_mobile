import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(game)));

  const [playWithAI, setPlayWithAI] = useState(false);
  const [playerColor, setPlayerColor] = useState('white');
  const [message, setMessage] = useState('');

  const handleMove = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Chọn quân hậu khi thăng cấp
    });

    if (move === null) {
      setMessage('Nước đi không hợp lệ!');
      return false;
    }

    setGame(new Chess(game.fen())); // Cập nhật trạng thái trò chơi
    setMessage('Nước đi hợp lệ!');

    // Chỉ cho AI đi nếu màu người chơi không phải là màu đang đi
    if (playWithAI && game.turn() !== playerColor.charAt(0)) {
      setTimeout(makeRandomMove, 1000); // Đợi 1 giây trước khi AI thực hiện nước đi
    }

    return true;
  };

  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      setMessage('Trò chơi đã kết thúc.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMove = possibleMoves[randomIndex];
    game.move(randomMove);

    setGame(new Chess(game.fen())); // Cập nhật trạng thái trò chơi
    setMessage(`AI đã đi: ${randomMove}`);
  };

  const toggleAI = () => {
    setPlayWithAI(!playWithAI);
    setGame(new Chess()); // Khởi tạo lại trò chơi
    setPlayerColor('white'); // Bắt đầu với màu trắng mỗi khi đổi chế độ
    setMessage('Bắt đầu trò chơi mới! Chế độ AI ' + (playWithAI ? 'tắt' : 'bật'));
  };

  const currentTurn = game.turn() === 'w' ? 'Trắng' : 'Đen';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trò Chơi Cờ Vua</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          Chơi với: {playerColor.charAt(0).toUpperCase() + playerColor.slice(1)}
        </Text>
        <Text style={styles.info}>Lượt Hiện Tại: {currentTurn}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.chessboardContainer}>
        <Chessboard
          position={game.fen()}
          onPieceDrop={handleMove}
          boardOrientation={playerColor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={playWithAI ? 'Chơi Không Có AI' : 'Chơi Với AI'} onPress={toggleAI} />
        <Button title="Đổi Bên" onPress={() => setPlayerColor(playerColor === 'white' ? 'black' : 'white')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chessboardContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
  },
  message: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
