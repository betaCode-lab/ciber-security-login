# Cómo configurar el proyecto

## Primeros pasos
Abre una terminal, necesitas tener git instalado

Escribe los siguientes comandos:

    git clone [liga del repositorio]

Una vez hecho esto se te descargará el proyecto en la carpeta donde hayas hecho el git clone. Abre la carpeta del proyecto desde la terminal y ejecuta los siguientes comandos:

    npm install

Cuando todos los paquetes se instalen podemos ejecutar el proyecto con:

    npm run dev

En caso de requerir usar estilos de css, en la raíz del proyectos crearemos los siguientes archivos: postcss.config.cjs y tailwind.config.cjs

## Contenido de los archivos CSS
Dentro de la carpeta public y después en la carpeta de css creamos un archivo con el nombre de tailwind.css con el siguiente contenido:
```ruby
@tailwind base;
@tailwind components;
@tailwind utilities;
```

En el archivo de postcss.config.cjs colocamos el siguiente código:

```ruby
module.exports = {
    plugins: {
    tailwindcss: {},
    autoprefixer: {},
    }
}
```
En el archivo de tailwind.config.cjs colocamos el siguiente código:

```ruby
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

En la misma carpeta del proyecto y otra venta de la terminal ejecutamos 

    npm run css
Esto nos creará los estilos siempre y cuando usemos clases de tailwind css