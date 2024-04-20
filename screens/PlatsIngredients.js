import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import ip from '../components/ip'

const PlatsIngredients = ({ route,navigation }) => {
    const PlatId = route.params;
    const [ingredientIds, setIngredients] = useState([]);
    const selectedIngredients = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://" + ip + ":8000/ingredient/get");
                const ingredientsData = await response.json();
                const ingredientIds = ingredientsData.map(ingredient => [ingredient.id, ingredient.nom]);
                setIngredients(ingredientIds);
                console.log('IDs des ingrédients:', ingredientIds);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
        };
    
        fetchData();
    }, []);
    console.log('PlatId:', PlatId);

    const buttonClicked = (id) => {
        return () => {
            console.log('id:', id);
            const index = selectedIngredients.findIndex(item => item === id);
            if (index !== -1) {
                selectedIngredients.splice(index);
            } else {
                selectedIngredients.push(id);
            }
            console.log('selectedIngredients:', selectedIngredients);
        };
    }
    console.log('selectedIngredients:', selectedIngredients);

    const validateIngredients = (selectedIngredients) => {
        for (const idelt of selectedIngredients) {
            console.log('idelt:', idelt);
            console.log('PlatId:', PlatId);
            const newComposition = {
                id_plat: PlatId,
                id_ingredient: idelt,
            };
            console.log('newComposition:', newComposition);
            
            fetch('http://' + ip + ':8000/composition_plats/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComposition),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Données renvoyées :", data);
            })
            .catch(error => console.log('Erreur :', error));

        }
        // navigation.navigate('Home');
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.Title}>Ajouter les ingrédients au plat</Text>
            {ingredientIds ? (
                ingredientIds.map((item) => (
                    <View style={styles.div2}>                        
                        <TouchableOpacity 
                            style={styles.newcateg} 
                            key={item[0]}
                            onPress={buttonClicked(item[0])}
                        >
                            <Text> {item[0]} : {item[1]} </Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : null}

            <View>
                <Text style={styles.Title}>{selectedIngredients.join(', ')}</Text>
                <TouchableOpacity 
                    style={styles.button2} 
                    onPress={() => validateIngredients(selectedIngredients)}
                >
                    <Text style={styles.buttonText}>Valider les ingrédients</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    nameplat: {
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
    button2: {
        backgroundColor: '#ECAB03',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginVertical: 15,
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
        marginRight: 10,
        marginVertical: 10,
        borderRadius: 5,
    },

});

export default PlatsIngredients;