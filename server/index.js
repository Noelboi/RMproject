/* eslint no-console: "off" */
const server = require('./server');

const PORT = process.env.PORT;

server.listen(PORT, () => console.log('Server is listening on http://localhost:' + PORT));
