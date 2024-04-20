import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ip from '../components/ip';
import { set } from 'firebase/database';

const PlatsCreation = ({ navigation }) => {
    const [data, getData] = useState(null);
    const [newplatget, setNewPlat] = useState('');
    const [platName, setPlatName] = useState('wololo');
    const [prix, setPrix] = useState(20);
    const [description, setDescription] = useState('zggg');
    const [quantite, setQuantite] = useState('20');
    const [valeurEnergetique, setValeurEnergetique] = useState('20');
    const [matieresGrasses, setMatieresGrasses] = useState('20');
    const [glucides, setGlucides] = useState('20');
    const [proteines, setProteines] = useState('20');
    const [sel, setSel] = useState('20');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [newId, setNewId] = useState(0);

    useEffect(() => {
        // Ici, vous pouvez mettre en place la récupération des données pour votre Dropdown, si nécessaire
    }, []);

    const handleAddPlat = () => {
        const newPlat = {
            nom: platName,
            prix: prix,
            description: description,
            quantite: quantite,
            valeur_energetique: valeurEnergetique,
            matiere_grasse: matieresGrasses,
            glucide: glucides,
            proteine: proteines,
            sel: sel,
            id_categorie: selectedCategory
        };
        console.log('newPlat:', newPlat);

        fetch('http://' + ip + ':8000/plat/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlat),
        })
        .then(response => response.json())
        .then(data => {
            setNewId(data.id);
            console.log("Données renvoyées :", data);
            console.log('id:', newId);
        })
        .catch(error => console.log('Erreur :', error));

        

        navigation.navigate('PlatsIngredients' , newId);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.Title}>Ajouter un plat</Text>
            <View style={styles.div2}>
                <TextInput
                    style={styles.newcateg}
                    placeholder="Nom du plat"
                    onChangeText={setPlatName}
                    value={platName}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Prix"
                    keyboardType="numeric"
                    onChangeText={setPrix}
                    value={prix}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Description"
                    onChangeText={setDescription}
                    value={description}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Quantité"
                    keyboardType="numeric"
                    onChangeText={setQuantite}
                    value={quantite}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Valeur énergétique"
                    keyboardType="numeric"
                    onChangeText={setValeurEnergetique}
                    value={valeurEnergetique}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Matières grasses"
                    keyboardType="numeric"
                    onChangeText={setMatieresGrasses}
                    value={matieresGrasses}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Glucides"
                    keyboardType="numeric"
                    onChangeText={setGlucides}
                    value={glucides}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Protéines"
                    keyboardType="numeric"
                    onChangeText={setProteines}
                    value={proteines}
                />
                <TextInput
                    style={styles.newcateg}
                    placeholder="Sel"
                    keyboardType="numeric"
                    onChangeText={setSel}
                    value={sel}
                />

                <ModalDropdown
                    options={data ? [...data.map(category => category.nom)] : ['Chargement des données...']}
                    onSelect={(value) => setSelectedCategory(value === 'Sélectionnez une catégorie' ? '' : value)}
                    defaultValue="Sélectionnez une catégorie"
                    style={styles.selectCategory}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={handleAddPlat}>
                    <Text style={styles.buttonText}>Ajouter les ingrédients du plat</Text>
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
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
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

export default PlatsCreation;
