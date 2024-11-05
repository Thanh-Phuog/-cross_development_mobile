import axios from "axios";
import reactNativeBcrypt from "react-native-bcrypt";
import "react-native-get-random-values";

const API_URl ='https://66e7d8cab17821a9d9da315e.mockapi.io/user';

//Hash mật khẩu
function hashPassword(password){
    const saltRounds = 10;
    const salt = reactNativeBcrypt.genSaltSync(saltRounds);
    const hashedPassword = reactNativeBcrypt.hashSync(password, salt);
    return hashedPassword
}
//Hàm đăng ký 
export const signup = async(email, password) =>{
    const hashedPassword = hashPassword(password);
    const response = await axios.post(API_URl,{
        email,
        password: hashedPassword,
    });
    return response.data;
};
//Hàm đăng nhập 
export const login = async (email, password)=>{
    const response = await axios.get(API_URl);
    const user = response.data;

    const users = user.find(users=>users.email === email);
    if(!users) return null;

    //so sánh mật khẩu
    const isPasswordCorrect = reactNativeBcrypt.compareSync(password, users.password);

    return isPasswordCorrect?users:null;
}