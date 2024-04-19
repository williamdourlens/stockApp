import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import jsonData from '../components/database.json';
import ModalDropdown from 'react-native-modal-dropdown';

const IngredientModification = ({ route, navigation }) => {
    const { IngredientId } = route.params;
    const [ingre, getIngre] = useState(IngredientId);
    const [ingredientQuantity, setIngredientQuantity] = useState();
    const [isAllergene, setIsAllergene] = useState();
    const [selectedFournisseur, setSelectedFournisseur] = useState();
    const [fournisseurs, setListeFournisseurs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://192.168.1.11:8000/ingredient/get/" + IngredientId);
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
                const response = await fetch("http://192.168.1.11:8000/fournisseur/get");
                const data = await response.json();
                setListeFournisseurs(nom);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.Title}>Modifier la catégorie</Text>
            <Text style={styles.newcateg}>ID de la catégorie : {IngredientId}</Text>
            <Text style={styles.newcateg}>NOM : {ingre.nom}</Text>
            <Text style={styles.newcateg}>QUANTITE : {ingre.quantite}</Text>
            <Text style={styles.newcateg}>ALLERgre : {ingre.isAllergene ? 'true' : 'false'}</Text>
            <Text style={styles.newcateg}>FOURNI : {ingre.idFournisseur}</Text>
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
                    style={styles.selectCategory}
                    options={fournisseurs}
                    defaultValue={selectedFournisseur}
                    onSelect={(index, value) => setSelectedFournisseur(value)}
                />


                <TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                /><TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                /><TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                /><TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                /><TextInput
                    style={styles.newcateg}
                    value={ingre.nom}
                    onChangeText={(text) => getIngre({ ...ingre, nom: text })}
                />

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

});

export default IngredientModification;