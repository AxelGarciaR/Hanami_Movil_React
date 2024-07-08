import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { IconButton, Portal, Dialog } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

const NuevaContra = ({ navigation }) => {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [cambiodeContraExitoso, setCambioDeContraExitoso] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const hideDialog = () => {
        setCambioDeContraExitoso(false);
        navigation.navigate('Cuenta');
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
                    Nueva contraseña
                </Text>
                <View style={styles.whiteContainer}>
                    <Image
                        source={require('../assets/logotreshanami.png')} // Ruta de tu imagen
                        style={styles.imagedos}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Contraseña'
                            value={pass}
                            onChangeText={setPass}
                            style={styles.input}
                            secureTextEntry={!showPassword}
                        />
                        <IconButton
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                            color='#757575'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nueva contraseña'
                            value={newPass}
                            onChangeText={setNewPass}
                            style={styles.input}
                            secureTextEntry={!showPassword}
                        />
                        <IconButton
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                            color='#757575'
                        />
                    </View>
                    <ButtonAction
                        mode="contained"
                        onPress={() => {
                            // Lógica para restablecer la contraseña
                            setCambioDeContraExitoso(true);
                        }}
                        style={styles.actionButton}
                    >
                        Restablecer contraseña
                    </ButtonAction>
                    <Portal>
                        <Dialog visible={cambiodeContraExitoso} onDismiss={hideDialog}>
                            <View style={styles.dialogContent}>
                                <Image
                                    source={require('../assets/cheque.png')}
                                    style={styles.dialogImage}
                                />
                                <Text style={styles.dialogText}>¡Cambio de contraseña exitoso!</Text>
                            </View>
                        </Dialog>
                    </Portal>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
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
});

export default NuevaContra;
