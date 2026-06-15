# # ⚡ TechStore — Gestión de Productos

<div align="center">

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Moderno-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Desplegado-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Aplicación CRUD completa para gestión de productos tecnológicos**  
Desarrollada con ReactJS · Diseño oscuro moderno · 100% responsive

[🚀 Ver Demo en Vivo](https://tienda-tech-nwnfk1a24-fernandamv96s-projects.vercel.app) · [📁 Repositorio](https://github.com/Fernandamv96/tienda-tech)

</div>

---

## 📸 Vista previa

> Interfaz oscura con colores tecnológicos, tarjetas animadas y diseño responsive.

---

## ✨ Funcionalidades

| Función | Descripción |
|---|---|
| ➕ **Agregar producto** | Formulario completo con validaciones en tiempo real |
| ✏️ **Editar producto** | Modificar cualquier campo con un clic |
| 🗑️ **Eliminar producto** | Confirmación antes de borrar |
| 🔢 **Contador dinámico** | Se actualiza automáticamente al agregar o eliminar |
| 📷 **Carga de imagen** | Vista previa + validación de tamaño máximo 2 MB |
| 📦 **Control de stock** | Indicador visual: verde / amarillo / rojo según cantidad |
| ✅ **Validaciones** | Todos los campos validados antes de guardar |
| 📱 **Responsive** | Adaptado a móvil, tablet y escritorio |

---

## 🛠️ Tecnologías

- **ReactJS** — Componentes funcionales
- **useState** — Manejo de estado local
- **Formularios controlados** — Inputs sincronizados con el estado
- **CSS3** — Grid, Flexbox, variables CSS, animaciones, dark theme
- **JavaScript ES6+** — Validaciones, FileReader API, Intl para precios
- **Vercel** — Deploy automático desde GitHub

---

## 📁 Estructura del proyecto

```
tienda-tech/
├── public/
│   └── index.html
├── src/
│   ├── App.js        # Componente principal + lógica CRUD
│   ├── App.css       # Estilos globales (dark theme)
│   ├── index.js      # Punto de entrada React
│   └── index.css     # Reset CSS
└── package.json
```

---

## 🚀 Cómo ejecutar localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/Fernandamv96/tienda-tech.git

# 2. Entrar a la carpeta
cd tienda-tech

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📋 Campos del formulario

- **Nombre** — Texto obligatorio
- **Descripción** — Textarea obligatoria
- **Precio** — Número mayor a 0 (formato CLP)
- **Categoría** — Selector con 8 opciones
- **Stock** — Número mayor o igual a 0
- **Imagen** — Archivo de imagen máx. 2 MB con vista previa

---

## 👩‍💻 Autora

**Fernanda** · [@Fernandamv96](https://github.com/Fernandamv96)

---

<div align="center">
Desarrollado con ❤️ usando ReactJS
</div>
