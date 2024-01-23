# Examen programador NodeJS
Se necesita desarrollar una aplicación web en NodeJS con un front en React(+Vite) que
posea un conjunto reducido de características propias de un Blog de Internet.

La funcionalidad que deberá de proveer será la siguiente:

- Alta de entradas
- Mostrar un listado de entradas
- Búsquedas
- Mostrar detalle de una entrada.

# Pre requisitos
Se debe tener la API:

https://github.com/esliCastillo/back_blog

para completar todas las acciones y configurar corsOptions en el archivo server.js indicando la url que va a permitir.

`
var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
`