import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCart } from './CartData';
import { TouchableOpacity } from 'react-native';

const ProductDetail = ({route}) => {
    const {productId}=route.params;
    const {addToCart}= useCart();
    const [product, setProduct]=useState(null);

    useEffect(()=>{
        const fetchProductDetails = async() =>{
            try{
                const response=await fetch(`https://66e7d8cab17821a9d9da315e.mockapi.io/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            }catch(error){
                console.error("Error fetching product details:", error);
                
            }
        };
        fetchProductDetails();
    },[productId]);

    const handleAddToCard = () =>{
        if(product){
            addToCart(product);
        }
    };
    const formatPrice = (price) => {
        return price ? `¥${price.toLocaleString('en-US')}` : '¥0';
      };
    if (!product) {
        return <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>;
      }
  return (
   <ScrollView style={styles.container}>
    <Image source={{uri:product.image}} style={styles.productImage}/>
    <Text style={styles.productName}>{product.name}</Text>
    <View style={styles.priceContainer}>
            <Text style={styles.originaPrice}>
                Giá gốc: {formatPrice(product.price)}
            </Text>
    </View>
    <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả sản phẩm:</Text>
        <Text style={styles.description}>{product.description || "Mô tả không có sẵn."}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCard}>
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
   </ScrollView>
  );
};

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
      },
      productImage: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginBottom: 20,
        resizeMode: 'cover',
      },
      productName: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0033A0',
        marginVertical: 10,
        textAlign: 'center',
      },
      priceContainer: {
        marginVertical: 20,
      },
      originaPrice: {
        fontWeight: '500',
        marginBottom: 5,
        fontSize: 25,
        color: '#FF5722',
      },
      descriptionContainer: {
        backgroundColor: '#F9F9F9',
        padding: 16,
        borderRadius: 12,
        marginVertical: 20,
      },
      descriptionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0033A0',
        marginBottom: 8,
      },
      description: {
        fontSize: 18,
        color: '#333',
        lineHeight: 24,
      },
      addToCartButton: {
        backgroundColor: '#0033A0',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 20,
      },
      buttonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 18,
      },
      loadingText: {
        color: '#0033A0',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
      },
    });