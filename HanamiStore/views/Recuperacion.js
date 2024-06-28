import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import ButtonAction from '../components/ButtonAction';

const Recuperacion = ({ navigation }) => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/hanami.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.text}>
                Recuperación
            </Text>
            <View style={styles.whiteContainer}>
                <Text style={styles.textdos}>
                    Correo electrónico
                </Text>
                <TextInput
                    placeholder='correo@ejemplo.com'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <ButtonAction
                    mode="contained"
                    onPress={() => {
                        // Aquí puedes enviar el código de recuperación por correo
                        // y luego navegar a la pantalla adecuada
                    }}
                    style={styles.actionButton}
                >
                    Enviar código
                </ButtonAction>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.linkText}>Regresar al inicio de sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#FFC8DD',
    },
    image: {
        width: '75%',
        height: 250,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textdos: {
        marginTop: 60,
        marginRight: 175,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 50,
        width: '100%',
    },
    whiteContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF', // Color blanco
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    linkText: {
        marginTop: 30,
    },
});

export default Recuperacion;
