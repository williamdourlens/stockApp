import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import ip from '../components/ip'

const Plats = ({ navigation }) => {
  const [ingred, getingred] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://"+ip+":8000/ingredient/get");
        const data = await response.json();
        console.log(data);
        getingred(data);
      } catch (error) {
        console.error('Erreur de fetch:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Title}>Liste des Ingrédients</Text>
      {ingred ? (
        ingred.map((item) => (
          <View style={styles.div} key={item.id}>
            <Text style={styles.nameplat}>{item.nom}</Text> 
            <Text style={styles.infoplat}>{item.quantite}</Text> 

  
            <View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText} onPress={() => navigation.navigate('IngredientModification', { IngredientId: item.id })}>Modifier</Text>
				</TouchableOpacity>
			</View>
  
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : null}
      
      <View>
        <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('IngredientCreation')}><Text style={styles.buttonText}>Ajouter un ingrédient</Text></TouchableOpacity>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  Title: {
    marginTop: 40,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E1E1E',
    backgroundColor: '#ECAB03',
    marginHorizontal: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  div: {
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 20,
  },
  div2: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameplat: {
    color: '#1E1E1E',
    backgroundColor: '#ECAB03',
    width: 150,
    height: 40,
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoplat: {
    color: '#1E1E1E',
    backgroundColor: '#ECAB03',
    width: 40,
    height: 40,
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  button: {
    backgroundColor: '#ECAB03',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize:10,
  },
  button3: {
    backgroundColor: '#ECAB03',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#ECAB03',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 15,
  },
  buttonText2: {
    color: '#1E1E1E',
    fontSize:10,
  },
  newcateg: {
    color: 'black',
    backgroundColor: '#ECAB03',
    width: 230,
    height: 40,
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 5,
  },

});

export default Plats;