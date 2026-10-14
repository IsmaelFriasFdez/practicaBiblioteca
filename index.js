import express from 'express';
const app = express();
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
const libros = [
  { id: 1, titulo: 'Dune', autor: 'Frank Herbert' },
  { id: 2, titulo: 'Harry Potter', autor: 'J.K. Rowling' },
];

//4. Middleware
app.use((req, res, next) => {
  const inicio = Date.now();

  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duracion}ms`);
  });
  next();
});

//1.
app.get('/', (req, res) => {
  return res.status(200).json(libros);
});

//2.
app.get('/api/libros', (req, res) => {
  res.status(200).json(libros);
});

//3.
app.get('/api/libros/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  const libro = libros.find((item) => item.id === id);
  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  return res.status(200).json(libro);
});

//6.
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(express.static('public'));