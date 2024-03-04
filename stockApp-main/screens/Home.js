import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';


const db = getFirestore();

export default function Home() {
  const [RepasData, setRepasData] = useState([]);

  useEffect(() => {
    async function fetchRepas() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Repas'));
        const repasArray = [];

        querySnapshot.forEach((documentSnapshot) => {
          repasArray.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });

        setRepasData(repasArray);
      } catch (error) {
        console.error('Error fetching repas: ', error);
      }
    }

    fetchRepas();
  }, []);

  return (
    <View style={styles.container}>
      <Text>STOCKAGE DES REPAS ACCES RESTREINT</Text>
      {RepasData.map((Repas) => (
        <View key={Repas.id}>

          <Text>{`Nom : ${Repas.data.nom}`}</Text>
          <Text>{`Nombre : ${Repas.data.quantite}`}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});