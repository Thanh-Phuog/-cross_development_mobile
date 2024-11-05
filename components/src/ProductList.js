import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useCart } from './CartData'

const ProductList = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {addToCart} = useCart();

    const fetchProducts = async () =>{
        try{
            const response = await fetch('https://66e7d8cab17821a9d9da315e.mockapi.io/products');
            const data = await response.json();
            const sortedData = data.sort((a,b) => b.id - a.id);
            setProducts(sortedData);
        }catch(error){
            console.error(error);
            Alert.alert('Thông báo','Có lỗi xảy ra khi lấy sản phẩm.');
            
        }
    };
    useFocusEffect(
        React.useCallback(()=>{
            fetchProducts();
        },[])
    );
    const handleAddToCard = (product)=>{addToCart(product);};

    const handleProductPress = (product) =>{
        navigation.navigate('ProductDetail',{
            productId: product.id
        });
    };
    const formatPrice = (price) => {
        return price ? `¥${price.toLocaleString('en-US')}` : '¥0';
      };
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.welcomeText}>WelCome</Text>
    </View>
    <TextInput style={styles.searchInput} placeholder='Search' placeholderTextColor="#B0B0B0" value={searchQuery} onChangeText={setSearchQuery}/>
    <FlatList data={filteredProducts} keyExtractor={(item)=>item.id.toString()} renderItem={({item})=>(
        <View style={styles.productCard}>
            <TouchableOpacity onPress={()=> handleProductPress(item)}>
                <Image source={{uri: item.image}} style={styles.productImage}/>
            </TouchableOpacity>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
               <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Mua</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        key={`${2}-${filteredProducts.length}`}
        contentContainerStyle={styles.flatListContent}
      />
   </SafeAreaView>
  )
}

export default ProductList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    color: '#0033A0',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#0033A0',
    borderRadius: 8,
    padding: 12,
    color: '#0033A0',
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
    fontSize: 16,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
    margin: 8,
    alignItems: 'center',
    elevation: 3,
    minHeight: 320,
    borderColor: '#0033A0',
    borderWidth: 2,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    color: '#0033A0',
    marginBottom: 6,
    textAlign: 'center',
    width: '100%',
    height: 40,
    overflow: 'hidden',
  },
  productPrice: {
    fontSize: 14,
    color: '#0033A0',
    textDecorationLine: 'line-through',
  },
  button: {
    backgroundColor: '#0033A0',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
})