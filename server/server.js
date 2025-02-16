const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');

// Inicializar Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta al archivo JSON
const DATA_FILE = './data.json';

// Función para cargar los datos del archivo JSON
async function cargarDatos() {
  try {
    const data = await fs.readJSON(DATA_FILE);
    return data.registros || [];
  } catch (error) {
    return []; // Si el archivo no existe o está vacío, retornar un array vacío
  }
}

// Función para guardar los datos en el archivo JSON
async function guardarDatos(datos) {
  try {
    await fs.writeJSON(DATA_FILE, { registros: datos }, { spaces: 2 });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
}

// Crear un nuevo registro
app.post('/api/registros', async (req, res) => {
  try {
    const { title, definition, name, surname, email } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!title || !definition || !name || !surname || !email) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const registros = await cargarDatos();
    const format = (date,locale,options) =>
      new Intl.DateTimeFormat(locale,options).format(date);
      const now = new Date();
      // format(now, 'es')
      // format(now, 'es', {dateStyle: 'long'})
      // format(now, 'es', {weekday: 'short',day: 'numeric'})
      // format(now, 'en', {weekday: 'short',day: 'numeric'})
    // Crear el nuevo registro con un ID único y timestamp
    const nuevoRegistro = {
      id:  Date.now().toString(), // Generar un ID único
      title,
      definition,
      name,
      surname,
      email,
      timestamp:format(now, 'es'), // Agregar el timestamp
    };

    registros.push(nuevoRegistro);
    await guardarDatos(registros);

    res.status(201).json(nuevoRegistro); // Devolver el registro creado
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el registro' });
  }
});

// Obtener todos los registros
app.get('/api/registros', async (req, res) => {
  try {
    const registros = await cargarDatos();
    res.json(registros); // Devolver todos los registros
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los registros' });
  }
});

// Eliminar un registro
app.delete('/api/registros/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let registros = await cargarDatos();

    // Encontrar el índice del registro a eliminar
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    // Eliminar el registro
    registros.splice(indice, 1);
    await guardarDatos(registros);

    res.status(200).json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el registro' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});