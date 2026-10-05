# FRONTEND RESTAURANTE

Aplicación web del proyecto **P5 Digital Academy - Restaurante**, desarrollada con Vue 3, Vite y Tailwind CSS. Este frontend es responsable de mostrar la interfaz de usuario, gestionar el estado de la aplicación, navegar entre pantallas y comunicarse con la API del backend.

---

## Stack técnico

- **Vue 3** con `<script setup>` (Composition API)
- **Vite** como bundler y servidor de desarrollo
- **Tailwind CSS** para estilos
- **Vue Router** para enrutado
- **Pinia** para estado global
- **Axios** para comunicación con la API
- **Vitest** para tests unitarios
- **Playwright** para tests e2e

---

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`
- npm, incluido con Node.js
- Backend corriendo en `http://localhost:8080` (ver [repositorio backend](https://github.com/FactoriaF5-Asturias/project-p5-digital-academy-team3-restaurant-backend))

---

## Instalación

```bash
git clone [URL_REPO_FRONTEND]
cd [NOMBRE_CARPETA]
npm ci
```

`npm ci` instala exactamente las versiones registradas en `package-lock.json`, garantizando que todo el equipo trabaje con el mismo árbol de dependencias.

---

## Arrancar en desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la URL local (por defecto `http://localhost:5173`).

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=http://localhost:8080
```

---

## Tests

### Tests unitarios

```bash
npm run test:unit
```

### Cobertura

```bash
npm run test:coverage
```

### Tests e2e

Requieren instalar los navegadores la primera vez:

```bash
npx playwright install chromium
```

Ejecutar:

```bash
npm run test:e2e
```

Playwright arranca automáticamente el servidor de Vite. Los tests mockean el backend, así que no es necesario arrancarlo.

---

## Scripts disponibles

| Script                  | Descripción                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Inicia el servidor de desarrollo de Vite con recarga automática.   |
| `npm run build`         | Genera en `dist/` la versión optimizada para producción.           |
| `npm run preview`       | Sirve localmente la compilación de producción para revisarla.      |
| `npm run lint`          | Analiza los archivos JavaScript y Vue con ESLint.                  |
| `npm run lint:fix`      | Corrige automáticamente los problemas que ESLint puede solucionar. |
| `npm run format`        | Formatea el proyecto con Prettier.                                 |
| `npm run format:check`  | Comprueba el formato sin modificar archivos.                       |
| `npm run test:unit`     | Ejecuta Vitest.                                                    |
| `npm run test:coverage` | Ejecuta los tests y genera el informe de cobertura.                |
| `npm run test:e2e`      | Ejecuta los tests e2e con Playwright.                              |

---

## Estructura del proyecto

```text
project-p5-digital-academy-team3-restaurant-frontend/
├── public/                     # Archivos estáticos servidos sin transformación
├── docs/                       # Documentación del proyecto (wiki)
├── e2e/                        # Tests end-to-end con Playwright
├── src/                        # Código fuente de la aplicación
│   ├── assets/                 # Imágenes, iconos y fuentes procesados por Vite
│   ├── components/             # Componentes Vue reutilizables
│   ├── composables/            # Composables de Vue (useAuth, useCart)
│   ├── router/                 # Definición de rutas y guardas de navegación
│   ├── services/               # Servicios de comunicación con la API
│   ├── styles/                 # Tokens de Tailwind y fuentes
│   ├── views/                  # Vistas asociadas a las rutas
│   ├── App.vue                 # Componente raíz
│   ├── main.css                # Importación de Tailwind y estilos globales
│   └── main.js                 # Punto de entrada y montaje de Vue
├── tests/                      # Tests unitarios con Vitest
├── .env                        # Variables de entorno (no se sube a Git)
├── .gitignore                  # Archivos y carpetas excluidos de Git
├── .prettierignore             # Archivos que Prettier no debe procesar
├── .prettierrc.json            # Reglas de formato de Prettier
├── eslint.config.js            # Configuración de ESLint para JavaScript y Vue
├── index.html                  # Documento HTML de entrada utilizado por Vite
├── package.json                # Scripts, dependencias y metadatos del proyecto
├── package-lock.json           # Versiones exactas del árbol de dependencias
├── playwright.config.js        # Configuración de Playwright
├── vite.config.js              # Configuración de Vite y sus plugins
└── README.md                   # Documentación del frontend
```

### Responsabilidad de las carpetas de `src`

- **`assets/`**: recursos importados desde los componentes, como imágenes y hojas de estilo. Vite los procesa, optimiza y añade a la compilación.
- **`components/`**: piezas de interfaz reutilizables. Por ejemplo, botones, tarjetas de producto, cabeceras o formularios.
- **`core/`**: elementos centrales que se configuran una sola vez, como el cliente HTTP de Axios, interceptores, autenticación o configuración de la API.
- **`router/`**: instancia de Vue Router, listado de rutas y guardas para controlar el acceso a vistas protegidas.
- **`shared/`**: código sin responsabilidad de negocio específica que se utiliza en varios módulos: constantes, helpers, validaciones o composables comunes.
- **`stores/`**: estado global administrado con Pinia. Aquí pueden vivir los stores de autenticación, carrito, productos y pedidos.
- **`views/`**: componentes que representan páginas completas y que normalmente se enlazan desde Vue Router.

---

## Documentación

- [Wiki del proyecto](https://github.com/FactoriaF5-Asturias/project-p5-digital-academy-team3-restaurant-frontend/wiki) — arquitectura, flujos de usuario, diseño, convenciones.
- [Repositorio backend](https://github.com/FactoriaF5-Asturias/project-p5-digital-academy-team3-restaurant-backend) — API y modelo de datos.

---

## Equipo

- [Ekaterina Zotova](https://github.com/zookatt)
- [Iulian Timofei](https://github.com/iulian640)
- [José Ángel Peña Díaz](https://github.com/joseang1)
- [Hanna Frolova](https://github.com/hannafr14)
- [Ruben Campal López](https://github.com/ruben-campal-1996)
- [Simone Ávila Arranz](https://github.com/simoneavilarranz)