import express from 'express';
import config from './src/db/config.js';
import delphitsocialRoutes from './src/routes/delphitsocialRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
delphitsocialRoutes(app);
app.get('/', (req, res) => {
    res.send('Hello World!');

});




app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);

});