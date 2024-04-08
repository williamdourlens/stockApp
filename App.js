import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Categories from './screens/Categories';
import Plats from './screens/Plats';
import Ingredient from './screens/Ingredient';
import IngredientCreation from './screens/IngredientCreation';
import CategorieCreation from './screens/CategorieCreation';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Plats" component={Plats} />
        <Stack.Screen name="Ingredient" component={Ingredient} />
        <Stack.Screen name="IngredientCreation" component={IngredientCreation} />
        <Stack.Screen name="CategorieCreation" component={CategorieCreation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
