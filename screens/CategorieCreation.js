import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ip from '../components/ip';

const CategorieCreation = ({ navigation }) => {
    const [categorieName, setCategorieName] = useState('');

    const handleAddCategory = () => {
        const newCategory = {
            nom: categorieName,
            // Ajoutez d'autres propriétés de votre objet newCategory si nécessaire
        };
        console.log('newCategory:', newCategory);

        fetch('http://192.168.1.11:8000/categorie/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Données renvoyées :", data);
            })
            .catch(error => console.log('Erreur :', error));

        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Ajouter une catégorie</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.newcateg}
                    placeholder="Nom de la catégorie"
                    onChangeText={setCategorieName} // Utilisation directe de setCategorieName
                    value={categorieName} // Ajout de la valeur de l'input
                />
            </View>
            <TouchableOpacity style={styles.button2} onPress={handleAddCategory}>
                <Text style={styles.buttonText2}>Ajouter</Text>
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
    button2: {
        backgroundColor: '#ECAB03',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 5,
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

export default CategorieCreation;
