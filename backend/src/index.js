const express = require('express');
require('dotenv').config();
const article = require('./controllers/article/article.routes');
const user = require('./controllers/user/user.routes');
const event = require('./controllers/event/event.routes');
const mongoose = require("mongoose");
const config = require('config');
const logger = require('./utils/logger');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');


const app = express();

//auth
const authenticationByJWT = require('./auth/authenticate');
const swaggerDocument = YAML.load('./src/docs/swager.yaml');
const angularAppPath = path.join(__dirname, "..", "public", "angular")

app.use(cors({
  origin: 'http://localhost:4200'
}));

mongoose
    .connect(`mongodb+srv://${config.database.username}:${config.database.password}${config.database.host}`)
    .then(() => console.log('MongoDb connection established!'))
    .catch((err) => {
      logger.error(err);
      process.exit();
    });

app.use(express.json());

app.post('/api/login', require('./auth/login'));

app.use('/api/article', article);
app.use('/api/user', user);
app.use('/api/event', event);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//angular statikus kiszolgálása
app.use("/", express.static(angularAppPath))

app.get("*", (req, res) => {
  res.sendFile(angularAppPath + "/index.html")
})

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.statusCode).send(err.message);
})

app.listen(3000, () => {
  logger.info(`App is listening at localhost:${config.port}`);
});
