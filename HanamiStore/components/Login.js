import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Clave'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.LoginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                    <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        width: '110%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        marginTop: -20, // Ajuste para superponer sobre el contenedor principal
    },
    actionButton: {
        backgroundColor: '#FF8BA7',
        marginTop: 10,
        padding: 12,
        alignItems: 'center',
    },
    linkText: {
        marginTop: 10,
        color: '#FF8BA7',
        textAlign: 'center',
    },
    LoginText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default LoginScreen;
