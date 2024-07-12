// ButtonAction.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Componente funcional ButtonAction que recibe dos props: onPress y children
const ButtonAction = ({ onPress, children }) => {
  return (
    // TouchableOpacity para manejar el evento onPress y aplicar estilos
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      {/* Texto del botón */}
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

// Estilos del componente usando StyleSheet.create para optimización
const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#FF8BA7', // Color de fondo del botón
    marginTop: 10, // Margen superior de 10 unidades
    padding: 10, // Padding interior de 10 unidades
    alignItems: 'center', // Centrado de contenido horizontal
    borderRadius: 5, // Bordes redondeados de 5 unidades
  },
  buttonText: {
    color: 'white', // Color del texto en blanco
    fontSize: 16, // Tamaño de fuente de 16 unidades
    fontWeight: 'bold', // Texto en negrita
  },
});

export default ButtonAction; // Exportar el componente ButtonAction por defecto
