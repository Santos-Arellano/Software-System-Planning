import axios from 'axios';

// Configuración base de la URL - permite cambiar fácilmente entre entornos
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Crear una instancia de axios con configuración personalizada
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 segundos de timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para mejorar el manejo de errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Error de red - El servidor podría estar caído o inalcanzable:', error.message);
      // Puedes mostrar un mensaje al usuario aquí
    } else if (error.response) {
      console.error(`Error del servidor ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request);
    } else {
      console.error('Error durante la configuración de la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

export const obtenerFormulario = async (tipoUsuario) => {
  try {
    console.log(`Obteniendo datos de formulario para tipo de usuario: ${tipoUsuario}`);
    const response = await apiClient.get(`/formularios/${tipoUsuario}`);
    console.log('Datos de formulario recibidos:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener datos del formulario para ${tipoUsuario}:`, error);
    throw error;
  }
};

// Función para verificar la conexión al servidor
export const verificarConexionServidor = async () => {
  try {
    await apiClient.get('/health');
    return true;
  } catch (error) {
    console.error('Conexión al servidor fallida:', error);
    return false;
  }
};
