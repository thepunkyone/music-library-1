const app = require('./src/app.js');
const APP_PORT = 4000;
app.listen(APP_PORT, () => {console.log(`App is listening on ${APP_PORT}`)});