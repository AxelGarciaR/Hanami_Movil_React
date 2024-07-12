// Importación de constantes desde el archivo de utilidades
import * as constantes from '../utils/constantes';

// Función asincrónica para manejar las solicitudes de datos
const fetchData = async (filename, action, form = null) => {
    // Objeto OPTIONS para configurar las opciones de la solicitud
    const OPTIONS = {};

    // Si se proporciona un formulario, la solicitud será POST; de lo contrario, GET
    if (form) {
        OPTIONS.method = 'POST';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'GET';
    }

    try {
        // Construir la URL para la solicitud usando la IP y la ruta del servicio PHP
        const PATH = new URL(`${constantes.IP}/Hanami_Movil_React/HanamiStore/api/service/${filename}.php`);
        PATH.searchParams.append('action', action);

        // Realizar la solicitud fetch con la URL y las opciones configuradas
        const RESPONSE = await fetch(PATH.href, OPTIONS);

        // Manejar errores si la respuesta no es exitosa
        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }

        // Obtener el tipo de contenido y el texto de la respuesta
        const contentType = RESPONSE.headers.get('content-type');
        const text = await RESPONSE.text();

        // Mostrar información de depuración en la consola
        console.log('Response content-type:', contentType);
        console.log('Response text:', text);

        // Si el contenido es JSON, parsearlo y devolverlo; de lo contrario, lanzar un error
        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(text);
        } else {
            throw new Error('Expected JSON, but received: ' + contentType);
        }
    } catch (error) {
        // Capturar y manejar errores de la solicitud
        console.error('Fetch error:', error);
        return { error: true, message: error.message }; // Devolver un objeto con error y mensaje
    }
};

export default fetchData; // Exportar la función fetchData para su uso en otros archivos
