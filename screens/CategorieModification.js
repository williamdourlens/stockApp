import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ip from '../components/ip';

const CategorieModification = ({ route, navigation }) => {
    const { categorieId } = route.params;
    const [categ, getcateg] = useState(categorieId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://"+ip+":8000/categorie/get/"+categorieId);
        const data = await response.json();
        console.log(data);
        getcateg(data);
      } catch (error) {
        console.error('Erreur de fetch:', error);
      }
    };
  
    fetchData();
  }, []);


  const handleUpdateCategorie = () => {
    const newCategorie = {
      nom: categ.nom,
    };
    console.log('newCategorie:', newCategorie);

    fetch('http://'+ip+':8000/categorie/patch/'+categorieId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategorie),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Données renvoyées :", data);
        })
        .catch(error => console.log('Erreur :', error));

        navigation.navigate('Home');
    };
    
    const handleDeleteCategorie = () => {   
        fetch('http://'+ip+':8000/categorie/delete/'+categorieId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Données renvoyées :", data);
        })
        .catch(error => console.log('Erreur :', error));

        navigation.navigate('Home');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Modifier la catégorie</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.newcateg}
                    value={categ.nom}
                    onChangeText={(text) => getcateg({ ...categ, nom: text })}
                />
            </View>

            <TouchableOpacity style={styles.button2} onPress={handleUpdateCategorie}>
                <Text style={styles.buttonText2}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleDeleteCategorie}>
                <Text style={styles.buttonText2}>Supprimer</Text>
            </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
    },
    buttonText2: {
        color: '#1E1E1E',
        fontSize: 10,
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
        marginHorizontal: 65,
        borderRadius: 5,
    },

});

export default CategorieModification;