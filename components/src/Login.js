import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { login } from '../auth';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry]=useState(true);
    const [isModalVisible, setModalVisible]=useState(false);
    const [modalMessage, setModalMessage]=useState('');

    const handleLogin = async()=>{
        if(!email.trim()|| !password.trim()){
           setModalMessage('Email và mật khẩu không được để trống.');
           setModalVisible(true);
           return;
        }

        try{
            const user = await login(email, password);
            if(user){
                navigation.navigate('Main');
                // setModalMessage('Đăng nhập thành công');
            }else{
                setModalMessage('Email hoặc mật khẩu không đúng.');
                setModalVisible(true);
            }
        }
        catch(error){
            setModalMessage('Có lỗi trong quá trình đăng nhập.');
            setModalVisible(true);
            console.error(error);
            
        }
    };
  return (
    <View style={styles.container}>
     <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
     <TextInput style={styles.input} placeholder='Email' value={email} 
     onChangeText={setEmail} placeholderTextColor="#B0B0B0"/>
     <View>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Icon name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>
     <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
     </TouchableOpacity>
     <Text style={styles.signupText}>Chưa có tài khoản?
        <Text style={styles.signupLink} onPress={()=>navigation.navigate('Signup')}>
            Đăng ký
        </Text>
     </Text>
     <Modal isVisible={modalMessage!==''} onBackdropPress={()=> setModalMessage('')}>
        <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={()=>setModalMessage('')}>
                <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
        </View>
     </Modal>
        
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Màu nền trắng
        marginTop: 30
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        color: '#0000FF', // Màu xanh dương cho tiêu đề
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#0000FF', // Màu viền xanh dương cho input
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#F0F0F0', // Màu nền xám nhạt cho input
        color: '#000000', // Màu chữ đen
    },
    button: {
        backgroundColor: '#0000FF', // Nút màu xanh dương
        borderRadius: 8,
        alignItems: 'center',
        padding: 15,
    },
    buttonText: {
        color: '#FFFFFF', // Chữ màu trắng
        fontWeight: 'bold',
    },
    signupText: {
        color: '#000000', // Màu đen cho text "signup"
        marginTop: 15,
        textAlign: 'center',
    },
    signupLink: {
        color: '#0000FF', // Màu xanh dương cho liên kết đăng ký
        fontWeight: 'bold',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    modalContent: {
        backgroundColor: '#FFFFFF', // Màu nền trắng cho modal
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        color: '#0000FF', // Màu xanh dương cho text modal
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#0000FF', // Màu xanh dương cho nút modal
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: 60,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF', // Chữ màu trắng trong nút modal
        fontWeight: 'bold',
    },
    questionButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    bugContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#FF0000', // Màu viền đỏ cho bug
        borderWidth: 2,
        backgroundColor: '#0000FF', // Màu nền xanh dương cho bug
        justifyContent: 'center',
        alignItems: 'center',
    },
    bugText: {
        fontSize: 24,
        color: '#FFFFFF', // Màu chữ trắng trong bug
    },
})