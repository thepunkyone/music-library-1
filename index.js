const app = require('./src/app.js');
// eslint-disable-next-line no-undef
const APP_PORT = process.env.PORT || 4000;
app.listen(APP_PORT, () => {console.log(`App is listening on ${APP_PORT}`)});