import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { IconButton, Portal, Dialog } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction'; // Componente personalizado de botón
import CustomAlert from 'react-native-dialog'; // Importación de componente de alerta personalizado (no utilizado en el código actual)

const Recuperacion = ({ navigation }) => {
    const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico ingresado
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

    // Función para manejar el envío del código de recuperación
    const handleSendCode = () => {
        const emailRegex = /\S+@\S+\.\S+/; // Expresión regular para validar el formato del correo electrónico
        if (!emailRegex.test(email)) { // Validación del correo electrónico
            setShowAlert(true); // Mostrar alerta si el correo no es válido
            return;
        }
        // Aquí deberías implementar la lógica para enviar el código de recuperación por correo electrónico
        // y luego navegar a la pantalla adecuada para ingresar el código
        navigation.navigate('CodigoContra'); // Navegar a la pantalla 'CodigoContra' una vez enviado el código
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/hanami.png')} // Ruta de tu imagen de cabecera
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.text}>
                    Recuperación
                </Text>
                <View style={styles.whiteContainer}>
                    <Image
                        source={require('../assets/logounohanami.png')} // Ruta de tu imagen de logo
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
                        onPress={handleSendCode}
                        style={styles.actionButton}
                    >
                        Enviar código
                    </ButtonAction>
                </View>
            </View>

            <Portal>
                <Dialog visible={showAlert} onDismiss={() => setShowAlert(false)}>
                    <View style={styles.dialogContent}>
                        <Image
                            source={require('../assets/cancelar.png')} // Ruta de tu imagen de cancelar
                            style={styles.dialogImage}
                        />
                        <Text style={styles.dialogText}>Ingresa un correo válido</Text>
                        <ButtonAction onPress={() => setShowAlert(false)} style={styles.dialogButton}>
                            OK
                        </ButtonAction>
                    </View>
                </Dialog>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#FFC8DD', // Color de fondo del scroll view
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '50%', // Ancho de la imagen de cabecera
        height: 200, // Altura de la imagen de cabecera
        marginBottom: 5,
    },
    imagedos: {
        width: '100%', // Ancho de la imagen de logo
        height: 250, // Altura de la imagen de logo
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
        backgroundColor: '#FFFFFF', // Color de fondo del contenedor blanco
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    actionButton: {
        marginTop: 20,
    },
    dialogContent: {
        alignItems: 'center',
        padding: 20,
    },
    dialogImage: {
        width: 100, // Ancho de la imagen de alerta de cancelación
        height: 100, // Altura de la imagen de alerta de cancelación
        marginBottom: 10,
    },
    dialogText: {
        fontSize: 18,
        textAlign: 'center',
    },
    dialogButton: {
        marginTop: 20,
    },
});

export default Recuperacion;
