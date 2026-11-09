# Desserts

Tienda de postres hecha como SPA con React, Vite y TypeScript. Consume una API local con json-server e incluye carrito persistente, CRUD de productos, paginación, búsqueda y filtro por categoría.

## Tecnologías

- React 19, Vite y TypeScript
- Tailwind CSS
- React Router
- TanStack Query y Axios
- React Hook Form y Zod
- Zustand
- Sonner (notificaciones)
- json-server

## Instalación

Requisitos: Node.js 20.19 o superior (o 22.12 o superior) y npm.

```bash
git clone --branch nivel-3 https://github.com/rtantahuatay/desserts.git
cd desserts
npm install
```

## Cómo ejecutar el proyecto

La app necesita la API, así que se usan dos terminales:

```bash
# Terminal 1: API en http://localhost:3000
npm run api
```

```bash
# Terminal 2: frontend en http://localhost:5173
npm run dev
```

## Scripts disponibles

| Script | Qué hace |
|---|---|
| `npm run dev` | Inicia el frontend en modo desarrollo |
| `npm run api` | Inicia json-server con `db.json` en el puerto 3000 |
| `npm run build` | Revisa los tipos con TypeScript y genera la versión de producción en `dist` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Listado, búsqueda, filtro, paginación y carrito |
| `/producto/nuevo` | Crear producto |
| `/producto/:id` | Detalle del producto, con opciones de editar y eliminar |
| `/producto/:id/editar` | Editar producto |
| `*` | Página 404 |

## Arquitectura

```text
src/
├── components/   Componentes de interfaz (ProductCard, ProductForm, CartDrawer, modales...)
├── hooks/        useProductsQueries, useProductsMutations, useCategoriesQueries, useDebouncedValue
├── interfaces/   Tipos de productos, categorías y carrito
├── pages/        Pantallas conectadas a las rutas
├── routes/       Definición de rutas
├── schemas/      Validación con Zod y conversión de datos del formulario
├── services/     Instancia de Axios y peticiones a la API
└── stores/       Carrito con Zustand
```

El flujo de datos es: **página → hook → servicio → API**. Las páginas no llaman a Axios directamente y los componentes visuales reciben lo que necesitan por props.

## Funcionamiento de la API

json-server crea una API REST a partir de `db.json`. Los cambios hechos desde la app se guardan en ese archivo, así que **siguen ahí al reiniciar la API**. Para volver a los datos originales:

```bash
git restore db.json
```

Después, reinicia la API.

La URL base está en `src/services/api.ts`.

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/products?_page=1&_per_page=8` | Listado paginado |
| `GET` | `/products?name:contains=vanilla` | Búsqueda por nombre |
| `GET` | `/products?category=Cake` | Filtro por categoría |
| `GET` | `/products/:id` | Detalle de un producto |
| `POST` | `/products` | Crear producto; json-server genera el `id` |
| `PUT` | `/products/:id` | Reemplazar un producto |
| `DELETE` | `/products/:id` | Eliminar un producto |
| `GET` | `/categories` | Listado de categorías |

El listado paginado responde con esta forma:

```json
{
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 2,
  "pages": 2,
  "items": 9,
  "data": []
}
```

Ejemplo de producto:

```json
{
  "id": "1",
  "name": "Waffle with Berries",
  "category": "Waffle",
  "price": 6.5,
  "image": {
    "thumbnail": "/images/image-waffle-thumbnail.jpg",
    "mobile": "/images/image-waffle-mobile.jpg",
    "tablet": "/images/image-waffle-tablet.jpg",
    "desktop": "/images/image-waffle-desktop.jpg"
  }
}
```

## Decisiones técnicas

**Datos del servidor**

- TanStack Query maneja la caché, los estados de carga y los errores. Las lecturas están en `useProductsQueries` y las escrituras en `useProductsMutations`.
- Después de cada mutación exitosa se llama a `invalidateQueries` con `["products"]`. Compara por prefijo, así que cubre las listas y el detalle.
- Al editar, `setQueryData` guarda el producto nuevo en la caché para que el detalle no muestre datos viejos. Al eliminar, `removeQueries` borra su detalle de la caché.
- La búsqueda y el filtro se hacen en la API, no en memoria. La búsqueda espera 400 ms desde la última tecla (debounce).
- `keepPreviousData` mantiene la lista anterior visible mientras carga la siguiente página.
- Los productos tienen una demora artificial de 1.2 segundos, pedida en la prueba técnica para mostrar los skeletons.
- Las consultas se reintentan una vez si fallan, salvo el detalle cuando la respuesta es 404, porque volver a pedir un producto inexistente no ayuda.

**Carrito**

- Usa Zustand con `persist`, que lo guarda en `localStorage` con la clave `desserts-cart`.
- Guarda una copia del nombre, el precio y la imagen. Por eso se actualiza al editar un producto y lo quita al eliminarlo.
- En pantallas grandes se muestra como columna lateral y en pantallas pequeñas como drawer.

**Formularios**

- `ProductForm` se reutiliza para crear y editar: recibe `defaultValues`, `submitLabel` y `onSubmit` por props.
- El formulario de edición se muestra cuando el producto ya cargó, porque `useForm` lee `defaultValues` una sola vez.
- Zod define las reglas en `schemas/productSchema.ts`, y de ahí sale también el tipo de los valores del formulario.

**Imágenes y categorías**

- No hay subida de archivos. Al crear o editar se elige una de las fotos de `public/images`, y `toProductInput` arma las 4 rutas que necesita la API.
- Los productos se relacionan con su categoría por el nombre, como en `db.json`.

## Limitaciones conocidas

- Solo se pueden usar las fotos incluidas en el proyecto.
- La página y los filtros del listado se reinician al volver desde el detalle.
- Al eliminar un producto puede verse una petición con 404 en las herramientas del navegador, porque el detalle intenta recargarse justo antes de salir de la página. No afecta a la app.

## Ramas

| Rama | Contenido |
|---|---|
| `nivel-1` | Interfaz con datos locales |
| `nivel-2` | Consumo de la API, búsqueda, filtros, rutas y detalle |
| `nivel-3` | Carrito, CRUD, formularios, paginación y notificaciones |