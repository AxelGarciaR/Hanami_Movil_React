import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import LoginScreen from '../components/Login';
import RegisterScreen from '../components/Registro';

const Cuenta = () => {
    const [screen, setScreen] = useState('login');

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/hanami.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => setScreen('login')}
                    style={[styles.button, screen === 'login' && styles.selectedButton]}
                    labelStyle={screen === 'login' ? styles.selectedLabel : styles.label}
                >
                    Login
                </Button>
                <Button
                    mode="contained"
                    onPress={() => setScreen('register')}
                    style={[styles.button, screen === 'register' && styles.selectedButton]}
                    labelStyle={screen === 'register' ? styles.selectedLabel : styles.label}
                >
                    Registro
                </Button>
            </View>
            {screen === 'login' ? <LoginScreen onNavigate={setScreen} /> : <RegisterScreen onNavigate={setScreen} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFC8DD'
    },
    image: {
        width: '80%',
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 5,
        backgroundColor: '#FFC8DD',
    },
    selectedButton: {
        backgroundColor: '#FF8BA7',
    },
    label: {
        color: 'black',
    },
    selectedLabel: {
        color: 'white',
    },
});

export default Cuenta;
