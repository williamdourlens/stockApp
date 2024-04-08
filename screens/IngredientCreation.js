import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'
import ModalDropdown from 'react-native-modal-dropdown';

const Plats = () => {
  const [data, getData] = useState(null);

  useEffect(() => {
    getData(jsonData['categories']);
  }, []);
  
const [isAllergen, setIsAllergen] = useState(false);

const handleToggleAllergen = () => {
    setIsAllergen(!isAllergen);
};
const [selectedCategory, setSelectedCategory] = useState(null);
return (
	<View style={styles.container}>
		<Text style={styles.Title}>Ajouter un ingrédient</Text>
		
		<View style={styles.div2}>
			<TextInput
				style={styles.newcateg}
				placeholder="Nom de l'ingredient"
			/>
			<TextInput
				style={styles.newcateg}
				placeholder="Quantité"
				keyboardType="numeric"
			/>
			<TouchableOpacity
				style={[styles.newcateg, { backgroundColor: isAllergen ? '#ECAB03' : '#ECAB03' }]}
				onPress={handleToggleAllergen}
			>
				<Text style={styles.buttonText}>{isAllergen ? 'Allergène ✅' : 'Allergène ❌'}</Text>
			</TouchableOpacity>
			<ModalDropdown
				options={data ? [...data.map(category => category.nom)] : ['Chargement des données...']}
				onSelect={(value) => setSelectedCategory(value === 'Sélectionnez un fournisseur' ? '' : value)}
				defaultValue="Sélectionnez un fournisseur"
				style={styles.selectCategory}
			/>
			<TouchableOpacity style={styles.button2}
				//</View>onPress={handleAddIngredient}
			>
				<Text style={styles.buttonText2}>Ajouter</Text>
			</TouchableOpacity>
		</View>
	</View>
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
    textAlign: 'center',
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
	marginRight: 10,
	marginVertical: 10,
	borderRadius: 5,
  },

});

export default Plats;