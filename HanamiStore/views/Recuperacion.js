import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import ButtonAction from '../components/ButtonAction';

const Recuperacion = ({ navigation }) => {
    const [email, setEmail] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <Image
                        source={require('../assets/logounohanami.png')} // Ruta de tu imagen
                        style={styles.imagedos}
                    />
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
                            navigation.navigate('CodigoContra');
                        }}
                        style={styles.actionButton}
                    >
                        Enviar código
                    </ButtonAction>
                    <TouchableOpacity onPress={() => navigation.navigate('Cuenta')}>
                        <Text style={styles.linkText}>Regresar al inicio de sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#FFC8DD',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '50%',
        height: 200,
        marginBottom: 5,
    },
    imagedos: {
        width: '100%',
        height: 250,
        marginBottom: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textdos: {
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 50,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    whiteContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    linkText: {
        marginTop: 30,
    },
    actionButton: {
        marginTop: 20,
    },
});

export default Recuperacion;
