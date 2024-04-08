import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'
import ModalDropdown from 'react-native-modal-dropdown';

const PlatsIngredients = () => {
    const [data, getData] = useState(null);

    useEffect(() => {
        getData(jsonData['compositionPlats']);
    }, []);
    useEffect(() => {
        getData(jsonData['ingredients']);
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Ajouter les ingrédients au plat</Text>


            
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