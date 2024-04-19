import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import ip from '../components/ip';

const Categories = ({ navigation }) => {
	const [categ, getcateg] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://"+ip+":8000/categorie/get");
				const data = await response.json();
				console.log(data);
				getcateg(data);
			} catch (error) {
				console.error('Erreur de fetch:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.Title}>Liste des Catégories</Text>
			{categ ? (
				categ.map((item) => (
					<View style={styles.div} key={item.id}>
						<Text style={styles.namecateg}>{item.nom}</Text>

						<View>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText} onPress={() => navigation.navigate('CategorieModification', { categorieId: item.id })}>Modifier</Text>
							</TouchableOpacity>
						</View>
					</View>
				))
			) : null}
			<View>
				<TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('CategorieCreation')}><Text style={styles.buttonText}>Ajouter une catégorie</Text></TouchableOpacity>
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
	div: {
		flexDirection: 'row',
		marginLeft: 15,
		marginBottom: 20,
	},
	namecateg: {
		color: '#1E1E1E',
		backgroundColor: '#ECAB03',
		width: 130,
		height: 40,
		fontSize: 20,
		paddingTop: 5,
		textAlign: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	button: {
		backgroundColor: '#ECAB03',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	buttonText: {
		color: '#1E1E1E',
	},

	button2: {
		backgroundColor: '#ECAB03',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginHorizontal: 50,
		alignItems: 'center',
		justifyContent: 'center',
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
		borderRadius: 5,
	},
});

export default Categories;