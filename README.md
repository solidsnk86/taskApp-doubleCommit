# 🧩 Aplicación de Tareas - Proyecto UTN-FRSR Mendoza

Este proyecto fue desarrollado como parte de la presentación final en la **Universidad Tecnológica Nacional - Facultad Regional San Rafael (UTN-FRSR), Mendoza**.  
Se trata de una **aplicación web de gestión de tareas (Task App)** construida con el stack **PERN (PostgreSQL, Express.js, React y Node.js)**, con enfoque en **arquitectura limpia, reutilización de código y buenas prácticas de programación orientada a objetos (POO)**.

---

## Link del Proyecto:
Pueden ver el proyecto en línea 👉 [aquí.](https://task-app-double-commit.vercel.app/)

## 🚀 Características principales

- **Login y registro de usuarios** con cookies seguras.
- **CRUD completo** de tareas y usuarios.
- **Perfil de usuario editable**, incluyendo la posibilidad de **subir fotos de perfil**.
- **Notas con inteligencia artificial (IA)** generadas mediante la API de **Cohere (plan gratuito)**.
- **Envío de correos automáticos** utilizando **Nodemailer** y servicio de **Gmail**.
- **Animaciones suaves** con **View Transitions API** y animaciones en **SVG**.
- **Interfaz moderna y responsive** construida con **TailwindCSS**.
- **Código mantenible y modular** con estructura basada en capas:
  - `controllers/`
  - `routes/`
  - `middlewares/`
  - `utils/`
  - `libs/`
- Uso de **POO**: las clases inyectan dependencias de base de datos (**NeonDB** o **PostgreSQL local**) sin afectar la lógica de negocio. 
  > Solo es necesario cambiar un parámetro para alternar entre entornos, garantizando independencia y flexibilidad.
```javascript
export const authRouter = Router()
// Esto permite que si mañana cambias la DB, solo pases otra instancia sin tocar la lógica interna del controlador.
const userController = new UserController({ authDb: serverNeonDB }); // <- Inyectamos la dependencia de NeonDB server-less
// const userController = new UserController({ authDb: pgLocalDB }) <- si queremos usar la DB de pgAdmin

authRouter.get("/users", userController.getAllUsers)
authRouter.get("/user/:id", userController.getUserById)
authRouter.post("/login", userController.userLogin);
authRouter.post("/signup", userController.createUser);
authRouter.put("/update/user", isAuth, userController.updateUser)
authRouter.delete("/delete/user/:id", isAuth, userController.deleteUser)
authRouter.get("/logout", isAuth, userController.userLogout)
authRouter.get("/profile", isAuth, userController.userProfile)
authRouter.patch("/update/user/password", isAuth, userController.updatePassword)
authRouter.get("/comments", isAuth, commentsControlller.getAllCommets)
```

---

## 🧱 Tecnologías utilizadas

### Backend
- **Node.js + Express**
- **PostgreSQL / NeonDB**
- **Nodemailer**
- **Cookies y autenticación con JWT**
- **Programación Orientada a Objetos**

### Frontend
- **React (Vite)**
- **TailwindCSS**
- **View Transitions API**
- **SVG Animations**

### IA
- **Cohere API** (generación de contenido con IA)

---

## 🧩 Estructura del proyecto

```
📦 project-root
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── libs/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── utils/
│   └── main.jsx
│
└── README.md
```

---

## 🔐 Autenticación

El sistema maneja sesiones de usuario mediante **cookies HTTPOnly**.  
El middleware de autenticación valida el token antes de permitir el acceso a rutas protegidas.  
Los usuarios pueden:
- Registrarse con email y contraseña.
- Iniciar y cerrar sesión.
- Editar su información y foto de perfil.

---

## 🧠 Funcionalidad IA

Permite generar **notas o descripciones automáticas** mediante la API de **Cohere**.  
La integración fue diseñada con una capa de abstracción que facilita reemplazar el proveedor IA si se desea.

---

## ✉️ Notificaciones por correo

El sistema envía correos de bienvenida y notificaciones de cuenta a través de **Nodemailer**, con configuración de transporte vía **Gmail**.

---

## 🎨 Interfaz

- Estilos basados en **TailwindCSS**.
- Animaciones entre páginas usando la **View Transitions API**.
- SVGs animados para mejorar la experiencia del usuario.

---

## ⚙️ Instalación y ejecución

### Requisitos previos
- Node.js v18+
- PostgreSQL o cuenta en NeonDB
- Variables de entorno configuradas

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧩 Arquitectura y principios

El proyecto sigue principios de **Clean Architecture**:
- Separación clara entre capas.
- Controladores enfocados en la lógica de negocio.
- Rutas simples y reutilizables.
- Inyección de dependencias para desacoplar módulos.
- Código preparado para **escalabilidad y mantenibilidad**.

---

## 👨‍💻 Autor

**Gabriel Calcagni**  
Estudiante | UTN-FRSR Mendoza  
Proyecto presentado como trabajo académico con enfoque en arquitectura profesional de software.
