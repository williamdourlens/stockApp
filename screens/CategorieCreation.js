import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'
import ModalDropdown from 'react-native-modal-dropdown';

const Plats = () => {
    const [data, getData] = useState(null);

    useEffect(() => {
        getData(jsonData['categories']);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Ajouter une catégorie</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.newcateg}
                    placeholder="Nom de la categorie"
                />
            </View>
            <TouchableOpacity style={styles.button2}
            //</View>onPress={handleAddCategory}
            >
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
    div: {
        flexDirection: 'row',
        marginLeft: 15,
        marginBottom: 20,
    },
    button2: {
        backgroundColor: '#ECAB03',
        alignItems: 'center',
        justifyContent: 'center',
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

export default Plats;