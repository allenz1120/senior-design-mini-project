import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles';
import * as Google from 'expo-google-app-auth';



  
export default function LoginScreen({navigation}) {
    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            // Replace ANDROID_CLIENT_ID with android client id
            androidClientId: 'ANDROID_CLIENT_ID',
            // behavior:'web',
            // Replace IOS_CLIENT_ID with ios client id
            iosClientId: 'IOS_CLIENT_ID',
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
