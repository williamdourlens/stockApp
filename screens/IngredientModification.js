import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import ip from '../components/ip';
import ModalDropdown from 'react-native-modal-dropdown';

const IngredientModification = ({ route, navigation }) => {
    const { IngredientId } = route.params;
    const [ingre, getIngre] = useState(IngredientId);
    const [ingredientQuantity, setIngredientQuantity] = useState();
    const [isAllergene, setIsAllergene] = useState();
    const [selectedFournisseur, setSelectedFournisseur] = useState('');
    const [fournisseurs, setListeFournisseurs] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://"+ip+":8000/ingredient/get/" + IngredientId);
                const data = await response.json();
                console.log('data', data);
                getIngre(data);
                setIngredientQuantity(data.quantite);
                setIsAllergene(data.isAllergene);
                setSelectedFournisseur(data.idFournisseur);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
            try {
                const response = await fetch("http://"+ip+":8000/fournisseur/get");
                const nom = await response.json();
                setListeFournisseurs(nom);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdateIngredient = () => {
        const newIngredient = {
            nom: ingre.nom,
            quantite: ingredientQuantity,
            isAllergene: isAllergene ? 1 : 0,
            id_fournisseur: selectedFournisseur
        };
        console.log('newIngredient:', newIngredient);

        fetch('http://'+ip+':8000/ingredient/patch/' + IngredientId, {
            method: 'PATCH',
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
    }
    const handleDeleteIngredient = () => {
        fetch('http://'+ip+':8000/ingredient/delete/' + IngredientId, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log("Données renvoyées :", data);
        })
        .catch(error => console.log('Erreur :', error));

        navigation.navigate('Home')
    }



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.Title}>Modifier l'ingrédient</Text>
            <View style={styles.div2}>
                <TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                />
                <TextInput
                    style={styles.newcateg}

                    keyboardType="numeric"
                    value={String(ingredientQuantity)}
                    onChangeText={text => setIngredientQuantity(text)}
                />
                <TouchableOpacity
                    style={[styles.newcateg, { backgroundColor: isAllergene ? '#ECAB03' : '#ECAB03' }]}
                    onPress={() => setIsAllergene(!isAllergene)}
                >
                    <Text style={styles.buttonText}>{isAllergene ? 'Allergène ✅' : 'Allergène ❌'}</Text>
                </TouchableOpacity>
                <ModalDropdown
                    
                    options={fournisseurs ? [...fournisseurs.map(fournis => fournis.nom)] : ['Chargement des données...']}
                    defaultValue={selectedFournisseur ? fournisseurs.find(fournis => fournis.id === selectedFournisseur)?.nom : ''}
                    onSelect={(value) => setSelectedFournisseur(value === 'Sélectionnez un fournisseur' ? '' : value)}
                    style={styles.selectCategory}
                />

            </View>

            <TouchableOpacity style={styles.button2} onPress={handleUpdateIngredient}>
                <Text style={styles.buttonText2}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleDeleteIngredient}>
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

});

export default IngredientModification;