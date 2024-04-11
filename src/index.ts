import { createServer } from 'http';

const port = process.env.PORT || 3400;

const server = createServer((req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end();
    return;
  }

  if (req.url !== '/calculator') {
    res.statusCode = 404;
    res.end();
    return;
  }

  const queryString = req.url.split('?')[1];

  if (!queryString) {
    res.statusCode = 400;
    res.end('No has introducido parámetros en la query :(');
    return;
  }

  const urlParams = new URLSearchParams(queryString);
  const paramA = parseFloat(urlParams.get('a') || '');
  const paramB = parseFloat(urlParams.get('b') || '');

  const resultAddition = paramA + paramB;
  const resultSubtraction = paramA - paramB;
  const resultMultiplication = paramA * paramB;

  if (paramB === 0) {
    res.statusCode = 400;
    res.end('El parámetro b no puede valer 0');
    return;
  }

  const resultDivision = paramA / paramB;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(
    `Resultados:` +
      `${paramA} + ${paramB} = ${resultAddition}\n` +
      `${paramA} - ${paramB} = ${resultSubtraction}\n` +
      `${paramA} * ${paramB} = ${resultMultiplication}\n` +
      `${paramA} / ${paramB} = ${resultDivision}\n`
  );
});

server.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
