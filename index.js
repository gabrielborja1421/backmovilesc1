const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1421',
    database: 'usuarios'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para registrar un nuevo usuario
app.post('/registrar', (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, email, contraseña], (err, result) => {
        if (err) {
            res.status(500).send('Error al registrar usuario');
            return;
        }
        res.send('Usuario registrado exitosamente');
    });
});

// Ruta para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
    const { email, contraseña } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';
    connection.query(sql, [email, contraseña], (err, result) => {
        if (err) {
            res.status(500).send('Error al iniciar sesión');
            return;
        }
        if (result.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.send('Credenciales inválidas');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
