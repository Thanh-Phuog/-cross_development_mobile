import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// CartProvider để quản lý trạng thái giỏ hàng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      setCartCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      ).filter(item => item.quantity > 0);

      setCartCount(newCart.reduce((count, item) => count + item.quantity, 0));

      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng giỏ hàng
export const useCart = () => useContext(CartContext);

// // Component CartData để hiển thị dữ liệu giỏ hàng
// const CartData = () => {
//   const { cart, cartCount, addToCart, removeFromCart } = useCart();

//   const product = { id: 1, name: 'Sample Product', price: 100 };

//   return (
//     <View style={styles.container}>
//       <Text>Cart Data</Text>
//       <Text>Total items in cart: {cartCount}</Text>

//       {cart.length > 0 ? (
//         cart.map(item => (
//           <View key={item.id} style={styles.cartItem}>
//             <Text>{item.name}</Text>
//             <Text>Quantity: {item.quantity}</Text>
//             <Button title="Remove" onPress={() => removeFromCart(item.id)} />
//           </View>
//         ))
//       ) : (
//         <Text>No items in cart</Text>
//       )}

//       <Button title="Add Product" onPress={() => addToCart(product)} />
//     </View>
//   );
// };

// export default CartData;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   cartItem: {
//     marginVertical: 10,
//   },
// });
