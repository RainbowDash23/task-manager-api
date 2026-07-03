# Task Manager API

API REST para gestión de tareas con autenticación de usuarios, construida con Node.js, Express y PostgreSQL.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

---

## Características

- Registro e inicio de sesión de usuarios
- Contraseñas encriptadas con bcrypt
- Autenticación con JSON Web Tokens (JWT)
- CRUD completo de tareas por usuario autenticado
- Cada usuario solo puede ver y modificar sus propias tareas

---

## Stack tecnológico

| Componente     | Tecnología              |
|----------------|-------------------------|
| Runtime        | Node.js                 |
| Framework      | Express                 |
| Base de datos  | PostgreSQL              |
| Autenticación  | JSON Web Tokens (JWT)   |
| Encriptación   | bcrypt                  |
| Variables de entorno | dotenv            |

---

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo
- npm

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/RainbowDash23/task-manager-api.git
cd task-manager-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales de PostgreSQL

# 4. Crear la base de datos y las tablas
# Abre tu cliente de PostgreSQL y ejecuta:
```

```sql
CREATE DATABASE task_manager;

\c task_manager

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```bash
# 5. Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor corre en `http://localhost:3000`

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_clave_secreta_larga
```

---

## Probar la API

Puedes probar todos los endpoints con cualquiera de estas herramientas:

- [Thunder Client](https://www.thunderclient.com/) — extensión de VS Code, recomendada
- [Postman](https://www.postman.com/) — aplicación de escritorio
- [Insomnia](https://insomnia.rest/) — alternativa a Postman
- `curl` desde la terminal

---

## Endpoints

### Autenticación

#### Registrar usuario
```
POST /auth/register
```
Body:
```json
{
  "email": "usuario@email.com",
  "password": "tu_contraseña"
}
```
Respuesta `201 Created`:
```json
{
  "id": 1,
  "email": "usuario@email.com",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

#### Iniciar sesión
```
POST /auth/login
```
Body:
```json
{
  "email": "usuario@email.com",
  "password": "tu_contraseña"
}
```
Respuesta `200 OK`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Copia el token y úsalo en el header `Authorization` de las siguientes peticiones.

---

### Tareas

Todas las rutas de tareas requieren el header:
```
Authorization: Bearer tu_token_aqui
```

---

#### Obtener todas las tareas
```
GET /tasks
```
Respuesta `200 OK`:
```json
[
  {
    "id": 1,
    "title": "Mi primera tarea",
    "completed": false,
    "user_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### Obtener una tarea por id
```
GET /tasks/:id
```
Respuesta `200 OK`:
```json
{
  "id": 1,
  "title": "Mi primera tarea",
  "completed": false,
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

#### Crear una tarea
```
POST /tasks
```
Body:
```json
{
  "title": "Nueva tarea"
}
```
Respuesta `201 Created`:
```json
{
  "id": 2,
  "title": "Nueva tarea",
  "completed": false,
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

#### Actualizar una tarea
```
PUT /tasks/:id
```
Body (todos los campos son opcionales):
```json
{
  "title": "Título actualizado",
  "completed": true
}
```
Respuesta `200 OK`:
```json
{
  "id": 2,
  "title": "Título actualizado",
  "completed": true,
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

#### Eliminar una tarea
```
DELETE /tasks/:id
```
Respuesta `200 OK`:
```json
{
  "message": "Tarea eliminada"
}
```

---

## Códigos de respuesta

| Código | Significado                              |
|--------|------------------------------------------|
| 200    | Petición exitosa                         |
| 201    | Recurso creado exitosamente              |
| 400    | Datos inválidos o faltantes              |
| 401    | No autenticado o token inválido          |
| 404    | Recurso no encontrado                    |
| 500    | Error interno del servidor               |

---

## Estructura del proyecto

```
task-manager-api/
├── src/
│   ├── middleware/
│   │   └── auth.js         # Verificación de token JWT
│   ├── routes/
│   │   ├── auth.js         # Registro y login
│   │   └── tasks.js        # CRUD de tareas
│   ├── db.js               # Conexión a PostgreSQL
│   └── index.js            # Punto de entrada del servidor
├── .env                    # Variables de entorno (no se sube a GitHub)
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
└── package.json
```
