import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useCart } from './CartData';

const Cart = ({navigation}) => {
    const {cart, removeFromCart, updateQuantity, setCart, setCartCount}=useCart();
    const [modalVisible, setModalVisible]=useState(false);
    const [errorModalVisible,  setErrorModalVisible]=useState(false);

    const handleDecrease =(item)=>{
        if(item.quantity>1){
            updateQuantity(item.id, item.quantity-1)
        }else{
            removeFromCart(item.id);
        }
    };
    const handleCheckout = ()=>{
        if(cart.length === 0){
            setErrorModalVisible(true);
        }else{
            setModalVisible(true);
        }
    };
    const confirmCheckout=()=>{
        setCart([]);
        setCartCount(0);
        setModalVisible(false);
    };
    const cancelCheckout =() =>{
        setModalVisible(false);
    };
    const closeErrorModal=()=>{
        setErrorModalVisible(false);
    };
    const calculateTotalPrice =()=>{
        return cart.reduce((total, item)=>{
            return total+(parseFloat(item.sale_price)* item.quantity);
        }, 0);
    };
  return (
    <SafeAreaView style={styles.container}>
        <FlatList data={cart} keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <View style={styles.itemContainer}>
                <Image source={{uri: item.image}} style={styles.itemImage}/>
                <View style={styles.detailsContainer}>
                    <Text style={styles.itemName}>
                        {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                        {parseFloat(item.sale_price).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}
                    </Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={()=> handleDecrease(item)}>
                            <Icon name ="remove-circle-outline" size={24} color="#0033A0"/>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleIncrease(item)}>
                        <Icon name="add-circle-outline" size={24} color="#0033A0" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalPrice}>
                        Tổng tiền: {(parseFloat(item.sale_price) * item.quantity).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}
                    </Text>
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                    <Icon name="trash-outline" size={24} color="#FF6347" />
                    <Text style={styles.removeButtonText}> Xóa</Text>
                </TouchableOpacity>
                </View>
            </View>
        )} 
        contentContainerStyle={styles.flatListContent}/>
         <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>
            Thanh toán ({calculateTotalPrice().toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })})
          </Text>
          <Icon name="wallet-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle-outline" size={50} color="#0033A0" />
            <Text style={styles.modalTitle}>Xác nhận thanh toán</Text>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn thanh toán?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelCheckout}>
                <Text style={styles.modalButtonText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmCheckout}>
                <Text style={styles.modalButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        {/* Modal thông báo lỗi khi giỏ hàng rỗng */}
        <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="alert-circle-outline" size={50} color="#FF6347" />
            <Text style={styles.modalTitle}>Giỏ hàng trống</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeErrorModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
      },
      itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
      },
      itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
      },
      detailsContainer: {
        flex: 1,
      },
      itemName: {
        color: '#0033A0',
        fontSize: 18,
        fontWeight: '600',
      },
      itemPrice: {
        color: '#FF6347',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      quantityText: {
        fontSize: 18,
        marginHorizontal: 8,
        fontWeight: '500',
      },
      totalPrice: {
        color: '#FF6347',
        fontWeight: 'bold',
        marginTop: 4,
      },
      removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      removeButtonText: {
        color: '#FF6347',
        marginLeft: 4,
      },
      checkoutContainer: {
        paddingVertical: 16,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
      },
      checkoutButton: {
        flexDirection: 'row',
        backgroundColor: '#0033A0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      },
      checkoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0033A0',
        marginBottom: 10,
        textAlign: 'center',
      },
      modalText: {
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
      },
      modalButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      },
      modalButton: {
        backgroundColor: '#0033A0',
        padding: 12,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
      },
      modalButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });