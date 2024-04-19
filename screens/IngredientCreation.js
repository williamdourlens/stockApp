import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ip from '../components/ip';

const IngredientCreation = ({ navigation }) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isAllergen, setIsAllergen] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://"+ip+":8000/fournisseur/get");
        const data = await response.json();
        setFournisseurs(data);
      } catch (error) {
        console.error('Erreur de fetch:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleToggleAllergen = () => {
    setIsAllergen(!isAllergen);
    console.log('isAllergen:', isAllergen);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      nom: ingredientName,
      quantite: quantity,
      isAllergene: isAllergen ? 1 : 0,
      id_fournisseur: selectedFournisseur
    };
    console.log('newIngredient:', newIngredient);
  
    fetch('http://'+ip+':8000/ingredient/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIngredient),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Données renvoyées :", data);
    })
    .catch(error => console.log('Erreur :', error));

	navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Ajouter un ingrédient</Text>
      <View style={styles.div2}>
        <TextInput
          style={styles.newcateg}
          placeholder="Nom de l'ingrédient"
          onChangeText={setIngredientName} // Utilisation directe de setIngredientName
          value={ingredientName} // Ajout de la valeur de l'input
        />
        <TextInput
          style={styles.newcateg}
          placeholder="Quantité"
          keyboardType="numeric"
          onChangeText={setQuantity} // Utilisation directe de setQuantity
          value={quantity} // Ajout de la valeur de l'input
        />
        <TouchableOpacity
          style={[styles.newcateg, { backgroundColor: isAllergen ? '#ECAB03' : '#ECAB03' }]}
          onPress={handleToggleAllergen}
        >
          <Text style={styles.buttonText}>{isAllergen ? 'Allergène ✅' : 'Allergène ❌'}</Text>
        </TouchableOpacity>
        <ModalDropdown
          options={fournisseurs ? [...fournisseurs.map(category => category.nom)] : ['Chargement des données...']}
          onSelect={(value) => setSelectedFournisseur(value === 'Sélectionnez un fournisseur' ? '' : value)}
          defaultValue="Sélectionnez un fournisseur"
          style={styles.selectCategory}
        />
        <TouchableOpacity style={styles.button2} onPress={handleAddIngredient} >
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
  div2: {
    alignItems: 'center',
    marginBottom: 20,
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

export default IngredientCreation;
