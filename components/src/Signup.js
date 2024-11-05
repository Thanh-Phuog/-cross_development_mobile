import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import { signup } from '../auth';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for eye icon

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [passwordMismatchModalVisible, setPasswordMismatchModalVisible] = useState(false);
  
    const handleSignup = async () => {
      if (!email || !password || !confirmPassword) {
        setErrorModalVisible(true); // Hiện modal lỗi nếu thông tin không đầy đủ
        return;
      }
  
      if (password !== confirmPassword) {
        setPasswordMismatchModalVisible(true); // Hiện modal nếu mật khẩu không khớp
        return;
      }
  
      try {
        await signup(email, password);
        setModalVisible(true); // Hiện modal khi đăng ký thành công
      } catch (error) {
        console.error(error);
      }
    };
  
    const closeModal = () => {
      setModalVisible(false);
      navigation.navigate('Login');
    };
  
    const closeErrorModal = () => {
      setErrorModalVisible(false);
    };
  
    const closePasswordMismatchModal = () => {
      setPasswordMismatchModalVisible(false);
    };
  
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0B0B0"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Icon name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={secureTextEntryConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}>
        <Icon name={secureTextEntryConfirm ? 'eye-off-outline' : 'eye-outline'} size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Đã có tài khoản? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
      </Text>

      {/* Modal thông báo thành công */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng ký thành công!</Text>
            <Text style={styles.modalText}>Bạn có thể đăng nhập ngay bây giờ.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi */}
      <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thông báo</Text>
            <Text style={styles.modalText}>Vui lòng điền đầy đủ thông tin.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeErrorModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo mật khẩu không khớp */}
      <Modal transparent={true} animationType="slide" visible={passwordMismatchModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lỗi</Text>
            <Text style={styles.modalText}>Mật khẩu không khớp. Vui lòng kiểm tra lại.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closePasswordMismatchModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Updated to white
      },
      logo: {
        width: 200,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
      },
      input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#0000FF', // Updated to blue
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#F0F0F0', // Light background for input fields
        color: '#0000FF', // Updated to blue for input text
      },
      passwordContainer: {
        position: 'relative',
      },
      eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0000FF', // Updated to blue
    borderRadius: 8,
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: '#FFFFFF', // Updated to white
    fontWeight: 'bold',
  },
  signupText: {
    color: '#0000FF', // Updated to blue
    marginTop: 15,
    textAlign: 'center',
  },
  signupLink: {
    color: '#0000FF', // Updated to blue
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#FFFFFF', // Updated to white
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0000FF', // Updated to blue
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    color: '#0000FF', // Updated to blue
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#0000FF', // Updated to blue
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  modalButtonText: {
    color: '#FFFFFF', // Updated to white
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});