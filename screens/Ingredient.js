import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'

const Plats = () => {
  const [data, getData] = useState(null);

  useEffect(() => {
    getData(jsonData['ingredients']);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Liste des Ingredients</Text>
      {data ? (
        data.map((item) => (
          <View style={styles.div} key={item.id_categorie}>
            <Text style={styles.nameplat}>{item.nom}</Text> 
            <Text style={styles.infoplat}>{item.quantite}</Text> 

  
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : null}
      <Text style={styles.Title}>Ajouter un ingredient</Text>
      <View style={styles.div2}>
        <TextInput
          style={styles.newcateg}
          placeholder="Nom de l'ingredient"
        />
        <Text></Text>
        <TextInput
          style={styles.newcateg}
          placeholder="Quantité"
        />
        <TouchableOpacity style={styles.button2}>
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