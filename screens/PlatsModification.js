import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import id from '../components/ip';
import ModalDropdown from 'react-native-modal-dropdown';

const PlatsModification = ({ route, navigation }) => {
    const { PlatId } = route.params;
    const [plat, getPlat] = useState(PlatId);
    const [platName, setPlatNom] = useState('');
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState('');
    const [quantite, setQuantite] = useState();
    const [valeurEnergetique, setValeurEnergetique] = useState();
    const [matieresGrasses, setMatieresGrasses] = useState();
    const [glucides, setGlucides] = useState();
    const [proteines, setProteines] = useState();
    const [sel, setSel] = useState();
    const [selectCategorie, setIdCategorie] = useState();
    const [categ, getCateg] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://"+id+":8000/plat/get/" + PlatId);
                const data = await response.json();
                console.log('data', data);
                getPlat(data);
                setPlatNom(data.nom);
                setPrix(data.prix);
                setDescription(data.description);
                setQuantite(data.quantite);
                setValeurEnergetique(data.valeurEnergetique);
                setMatieresGrasses(data.matiereGrasse);
                setGlucides(data.glucide);
                setProteines(data.proteine);
                setSel(data.sel);
                setIdCategorie(data.idCategorie);

            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
            try {
                const response = await fetch("http://"+id+":8000/categorie/get");
                const categor = await response.json();
                getCateg(categor);
            } catch (error) {
                console.error('Erreur de fetch:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdatePlat = () => {
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
            id_categorie: selectCategorie
        };
        console.log('newPlat:', newPlat);

        fetch('http://'+id+':8000/plat/patch/' + PlatId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlat),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Données renvoyées :", data);
        })
        .catch(error => console.log('Erreur :', error));

        navigation.navigate('PlatsModificationIngredients')
    }

    const handleDeletePlat = () => {
        fetch('http://'+id+':8000/plat/delete/' + PlatId, {
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
            <Text style={styles.Title}>Modifier un plat</Text>
            <View style={styles.div2}>
                <TextInput
                    style={styles.newcateg}
                    value={platName}
                    onChangeText={(text) => setPlatNom({ ...plat, nom: text })}
                />

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        prix :
                    </Text>
                    <TextInput
                        style={styles.infoitem}
                        keyboardType="numeric"
                        value={String(prix)}
                        onChangeText={text => setPrix(text)}
                    />
                </View>

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        quantite :
                    </Text>
                    <TextInput
                        style={styles.infoitem}
                        value={String(quantite)}
                        keyboardType="numeric"
                        onChangeText={text => setQuantite(text)}
                    />
                </View>
                
            <Text style={styles.Title}>Information suivantes en grammes</Text>
                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        valeurs
                        {"\n"}
                        energetiques
                    </Text>
                    <TextInput
                        style={styles.infoitem}
                        value={String(valeurEnergetique)}
                        keyboardType="numeric"
                        onChangeText={text => setValeurEnergetique(text)}
                    />
                </View>

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        Matières
                        {"\n"}
                        Grasses
                    </Text>
                    <TextInput
                    style={styles.infoitem}
                    value={String(matieresGrasses)}
                    keyboardType="numeric"
                    onChangeText={text => setMatieresGrasses(text)}
                />
                </View>

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        glucides
                    </Text>
                    <TextInput
                    style={styles.infoitem}
                    value={String(glucides)}
                    keyboardType="numeric"
                    onChangeText={text => setGlucides(text)}
                />
                </View>

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        Protéines
                    </Text>
                    <TextInput
                    style={styles.infoitem}
                    value={String(proteines)}
                    keyboardType="numeric"
                    onChangeText={text => setProteines(text)}
                />

                </View>
                <View style={styles.divhozi}>

                    <Text style={styles.titreitem}>
                        Sel
                    </Text>
                    <TextInput
                    style={styles.infoitem}
                    value={String(sel)}
                    keyboardType="numeric"
                    onChangeText={text => setSel(text)}
                />
                </View>

                <View style={styles.divhozi}>
                    <Text style={styles.titreitem}>
                        Categorie
                    </Text>
                    <ModalDropdown
                    options={categ ? [...categ.map(fournis => fournis.nom)] : ['Chargement des données...']}
                    defaultValue={selectCategorie ? categ.find(fournis => fournis.id === selectCategorie)?.nom : ''}
                    onSelect={(value) => setIdCategorie(value === 'Sélectionnez une catégorie' ? '' : value)}
                    style={styles.infoitem}
                />
                </View>

                <View>

                    <Text style={styles.newcateg}>
                        Description
                    </Text>
                    <TextInput
                    style={styles.bigdescription}
                    value={description}
                    onChangeText={text => setDescription({ ...plat, description: text })}
                />
                </View>

            </View>

            <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText2}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleDeletePlat}>
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
    divhozi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    titreitem: {
        color: 'black',
        backgroundColor: '#ECAB03',
        width: 120,
        height: 60,
        fontSize: 20,
        paddingTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginLeft: 65,
        borderRadius: 5,
    },
    infoitem: {
        color: 'black',
        backgroundColor: '#ECAB03',
        width: 110,
        height: 60,
        fontSize: 20,
        paddingTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginRight: 65,
        borderRadius: 5,
    },
    bigdescription: {
        color: 'black',
        backgroundColor: '#ECAB03',
        width: 230,
        height: 100,
        fontSize: 20,
        paddingTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 65,
        borderRadius: 5,
    },
    

});

export default PlatsModification;