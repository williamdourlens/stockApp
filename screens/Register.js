import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.Header}>
      <Text style={styles.TxTHeader}>Inscription</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.TxtInput}>Adresse email</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.TxtInput}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View >
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.ValideLogin}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Register}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[ styles.Register]}
        >
        <Text style={styles.buttonOutlineText}>Déjà un compte?</Text>
        <Text style={styles.buttonOutlineText}>Cliquez ici !</Text>
 
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    
  },
  Header: {
    width: '80%',
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#ECAB03',
    borderRadius: 20,
  },
  TxTHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  inputContainer: {
    width: '80%',
    backgroundColor: '#ECAB03',
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  TxtInput: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: 5,
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 3,
    borderColor: 'black',
    
  },

  button: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ECAB03',
  },
  ValideLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    
    textAlign: 'center',
    backgroundColor: '#ECAB03',    
  },
  buttonOutlineText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  Register: {
    padding: 5,
    borderRadius: 20,
  },
})