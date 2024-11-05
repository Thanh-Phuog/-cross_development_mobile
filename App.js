import { StyleSheet, Text, View } from 'react-native';
import Login from './components/src/Login';
import Signup from './components/src/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from './components/src/ProductList';
import ProductDetail from './components/src/ProductDetail';
import { CartProvider, useCart } from './components/src/CartData';
import Cart from './components/src/Cart';
import TicTacToe from './components/src/TicTacToe';
import ChessGame from './components/src/ChessGame';


// Create the Tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Example components for tabs (replace with your real components)
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

// Cart icon component
const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <View>
      <Icon name="cart-outline" size={24} color="#A1A1A1" />
      {cartCount > 0 && (
        <Text style={{ position: 'absolute', right: -10, top: -10, color: '#0000FF' }}>{cartCount}</Text>
      )}
    </View>
  );
};
// Stack for products
const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Chi tiết sản phẩm' }} />
    </Stack.Navigator>
  );
};
// Stack for authentication
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
      </CartProvider>
      
    </NavigationContainer>
  );
}
// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // White tab bar background
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#0000FF', // Blue for active tab
        tabBarInactiveTintColor: '#A9A9A9', // Gray for inactive tab
      }}
    >
      <Tab.Screen
        name="Product"
        component={ProductStack}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarIcon: ({ color }) => (
            <Icon name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Cart" component={Cart}
      options={{
        tabBarLabel:'Giỏ hàng',
        tabBarIcon:()=><CartIcon/>
      }}/>
      <Tab.Screen
        name="Game"
        component={ChessGame}
        options={{
          tabBarLabel: 'Game',
          tabBarIcon: ({ color }) => (
            <Icon name="game-controller-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
