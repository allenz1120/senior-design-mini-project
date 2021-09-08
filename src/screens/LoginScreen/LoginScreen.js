import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles';
import * as Google from 'expo-google-app-auth';



  
export default function LoginScreen({navigation}) {
    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            androidClientId: '293213095726-su3o0t6c6t2irst7k9bj722uh7co8rf4.apps.googleusercontent.com',
            // behavior:'web',
            iosClientId: '293213095726-oacojpdlnpq1obdk52ba9to5ccaiseqi.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            navigation.navigate('Home')
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    return (
            <View>
                <TouchableOpacity
                    style={styles.button} onPress= {() =>signInWithGoogleAsync()}>
                    <Text style={styles.buttonTitle}>Log in with Google</Text>
                </TouchableOpacity>
            </View>

    )
}

// export default LoginScreen
