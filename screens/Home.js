import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Bienvenu sur</Text>
      <Text style={styles.Title}>l'application</Text>
      <Text style={styles.textt}>de gestion de la societe</Text>
      <Text style={styles.Name}>FNM</Text>
      
      <Text style={styles.textt}>Que voulez vous faire?</Text>
      

      <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          style={[ styles.button]}
        >
          <Text style={styles.touch}>Liste des Categories</Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('Plats')}
          style={[ styles.button]}
        >
          <Text style={styles.touch}>Liste des Plats</Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('Ingredient')}
          style={[ styles.button]}
        >
          <Text style={styles.touch}>Liste des Ingredients</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ECAB03',
  },
  textt: {
    fontSize: 20,
    marginTop: 50,
    color: '#ECAB03',
  },
  Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ECAB03',
  },
  touch: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    width: '60%',
    backgroundColor: '#ECAB03',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});