import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, TextInput, Title, IconButton } from 'react-native-paper';

const Perfil = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="close"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Title>Información del Usuario</Title>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={80} icon="account" />
        <Button mode="text" onPress={() => {}}>Cambiar foto</Button>
      </View>
      <TextInput
        label="Nombre del usuario"
        value="Emily Guadalupe"
        style={styles.input}
      />
      <TextInput
        label="Apellidos del usuario"
        value="Murillo Ajueta"
        style={styles.input}
      />
      <TextInput
        label="Correo del usuario"
        value="emi.murillo@gmail.com"
        style={styles.input}
      />
      <TextInput
        label="Clave"
        value="********"
        secureTextEntry
        right={<TextInput.Icon name="pencil" />}
        style={styles.input}
      />
      <TextInput
        label="Dirección"
        value="San Salvador, El Salvador"
        style={styles.input}
      />
      <Button mode="contained" style={styles.button} onPress={() => {}}>
        CERRAR SESIÓN
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Perfil;
