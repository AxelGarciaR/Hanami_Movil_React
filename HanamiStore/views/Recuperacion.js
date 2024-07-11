import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { IconButton, Portal, Dialog } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import CustomAlert from 'react-native-dialog';

const Recuperacion = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSendCode = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setShowAlert(true);
            return;
        }
        // Aquí puedes enviar el código de recuperación por correo
        // y luego navegar a la pantalla adecuada
        navigation.navigate('CodigoContra');
    };

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
                            source={require('../assets/cancelar.png')}
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
    actionButton: {
        marginTop: 20,
    },
    dialogContent: {
        alignItems: 'center',
        padding: 20,
    },
    dialogImage: {
        width: 100,
        height: 100,
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
