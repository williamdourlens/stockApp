import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'

const Categories = () => {
  const [data, getData] = useState(null);

  useEffect(() => {
    getData(jsonData['categories']);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Les categories existantes</Text>
      {data ? (
        data.map((item) => (
          <View style={styles.div} key={item.id_categorie}>
            <Text style={styles.namecateg}>{item.nom}</Text> 
  
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : null}
      <Text style={styles.Title}>Ajouter une nouvelle categorie</Text>
      <View style={styles.div}>
        <TextInput
          style={styles.newcateg}
          placeholder="Nom de la categorie"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ajouter</Text>
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
    marginLeft: 20,
    marginBottom: 20,
  },
  namecateg: {
    color: '#1E1E1E',
    backgroundColor: '#ECAB03',
    width: 130,
    height: 40,
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ECAB03',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#1E1E1E',
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

export default Categories;