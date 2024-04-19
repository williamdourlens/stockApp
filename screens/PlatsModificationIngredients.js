import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import ip from '../components/ip';

const PlatsModificationIngredients = ({ route, navigation }) => {
    const { PlatId } = route.params;
    const [ingredients, setIngredients] = useState([]);
    const [Composition, getComposition] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [idIngredients, getIdIngredients] = useState();
    const [compositionIdIngredients, getCompositionIdIngredients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://" + ip + ":8000/ingredient/get");
                const ingredient = await response.json();
                console.log('data', ingredient);
                setIngredients(ingredient);
                getIdIngredients(ingredient.id);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
            try {
                const response = await fetch("http://" + ip + ":8000/composition_plats/get/" + PlatId);
                const composition = await response.json();
                console.log('composition', composition);
                getComposition(composition);
                getCompositionIdIngredients(composition.idIngredient);
            } catch (error) {
                console.error('Erreur de fetch2:', error);
            }
        };

        fetchData();
    }, []);

    console.log(ingredients[0].id);

    function verifierPresenceAvecBoucle(nombre, liste) {
        console.log('nombre', nombre);
        console.log('liste', liste);
        for (let i = 0; i < liste.length; i++) {
            if (liste[i] === nombre) {
                console.log('liste[i]', liste[i]);
                console.log('nombre', nombre);
                return true;
            }
        }
        return false;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.Title}>Modifier un plat</Text>
            <View style={styles.div2}>
                <Text style={styles.Title}>Liste des ingrédients</Text>

                {ingredients ? (
                    ingredients.map((item) => (
                        <View style={styles.div2}>
                            <TouchableOpacity style={styles.newcateg} onPress={() => setSelectedIngredients(item.nom)}>
                                <Text style={styles.nameplat}>
                                    {item.nom}
                                </Text>
                            </TouchableOpacity>
                            {verifierPresenceAvecBoucle(item.id, compositionIdIngredients) ? 
                                <Text style={{ color: 'green' }}> ✅</Text>
                             : 
                                <Text style={{ color: 'red' }}> ❌</Text>
                            }
                        </View>
                    ))
                ) : null}
            </View>

            <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText2}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText2}>Supprimer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    div2: {
        alignItems: 'center',
        marginBottom: 20,
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
    buttonText: {
        color: '#1E1E1E',
        fontSize: 10,
        textAlign: 'center',
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

});

export default PlatsModificationIngredients;