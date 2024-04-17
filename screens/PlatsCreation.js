import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import jsonData from '../components/database.json'
import ModalDropdown from 'react-native-modal-dropdown';

const PlatsCreation = ({ navigation }) => {
  const [data, getData] = useState(null);

  useEffect(() => {
    getData(jsonData['categories']);
  }, []);
  
const [selectedCategory, setSelectedCategory] = useState(null);
return (
	<ScrollView style={styles.container}>
		<Text style={styles.Title}>Ajouter un plat</Text>
		
		<View style={styles.div2}>
			<TextInput
				style={styles.newcateg}
				placeholder="Nom du plat"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Prix"
				keyboardType="numeric"
			/>
            <TextInput
				style={styles.newcateg}
				placeholder="Description"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Quantité"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Valeur énergétique"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Matières grasses"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Glucides"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Protéines"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Sel"
				keyboardType="numeric"
			/>

			<ModalDropdown
				options={data ? [...data.map(category => category.nom)] : ['Chargement des données...']}
				onSelect={(value) => setSelectedCategory(value === 'Sélectionnez un catégorie' ? '' : value)}
				defaultValue="Sélectionnez une catégorie"
				style={styles.selectCategory}
			/>

            {/* de base tous les ingrédients sont false */}
		</View>

        <View>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlatsIngredients')}><Text style={styles.buttonText}>Ajouter les ingrédients dans le plat</Text></TouchableOpacity>
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
  button: {
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
	marginVertical: 10,
    borderRadius: 5,
  },
  selectCategory: {
	color: 'red',
	backgroundColor: '#ECAB03',
	width: 230,
	height: 40,
	fontSize: 20,
	paddingTop: 5,
	textAlign: 'center',
	justifyContent: 'center',
	marginVertical: 10,
	borderRadius: 5,
  },

});

export default PlatsCreation;