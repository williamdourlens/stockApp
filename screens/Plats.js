import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import jsonData from '../components/database.json'

const Plats = ({ navigation }) => {
	const [data, getData] = useState(null);

	useEffect(() => {
		getData(jsonData['plats']);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.Title}>Liste des Plats</Text>
			{data ? (
				data.map((item) => (
					<View style={styles.div} key={item.id_categorie}>
						<Text style={styles.nameplat}>{item.nom}</Text>
						<Text style={[styles.infoplat, styles.quantite]} >{item.quantite}</Text>
						<Text style={[styles.infoplat, styles.prix]}>{item.prix}</Text>


						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Modifier</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Supprimer</Text>
						</TouchableOpacity>
					</View>
				))
			) : null}
			<View>
				<TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('PlatsCreation')}><Text style={styles.buttonText}>Ajouter un plat</Text></TouchableOpacity>
			</View>
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
		marginLeft: 20,
		marginBottom: 20,
	},
	nameplat: {
		color: '#1E1E1E',
		backgroundColor: '#ECAB03',
		width: 150,
		height: 40,
		fontSize: 20,
		paddingTop: 5,
		textAlign: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	infoplat: {
		color: '#1E1E1E',
		backgroundColor: '#ECAB03',
		height: 40,
		fontSize: 20,
		paddingTop: 5,
		textAlign: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	quantite: {
		width: 30,
	},
	prix: {
		width: 50,
	},
	button: {
	  backgroundColor: '#ECAB03',
	  paddingVertical: 10,
	  paddingHorizontal: 10,
	  borderRadius: 5,
	  marginHorizontal: 10,
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

export default Plats;