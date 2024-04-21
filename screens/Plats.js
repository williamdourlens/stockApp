import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import ip from '../components/ip';

const Plats = ({ navigation }) => {
	const [plats, setPlats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://"+ip+":8000/plat/get");
        const data = await response.json();
        console.log(data);
        setPlats(data);
      } catch (error) {
        console.error('Erreur de fetch:', error);
      }
    };
  
    fetchData();
  }, []);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.Title}>Liste des Plats</Text>
			<View style={styles.div} >
						<Text style={styles.nameplat}>Nom</Text>
						<Text style={[styles.infoplat, styles.quantite]} >qte</Text>
						<Text style={[styles.infoplat, styles.prix]}>prix</Text>


			

					</View>
			{plats ? (
				plats.map((item) => (
					<View style={styles.div} key={item.id_categorie}>
						<Text style={styles.nameplat}>{item.nom}</Text>
						<Text style={[styles.infoplat, styles.quantite]} >{item.quantite}</Text>
						<Text style={[styles.infoplat, styles.prix]}>{item.prix}</Text>


						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText} onPress={() => navigation.navigate('PlatsModification', { PlatId: item.id })}>Modifier</Text>
						</TouchableOpacity>

					</View>
				))
			) : null}
			<View>
				<TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('PlatsCreation')}><Text style={styles.buttonText}>Ajouter un plat</Text></TouchableOpacity>
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
		marginLeft: 20,
		marginBottom: 20,
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
});

export default Plats;
