import express from 'express';
import config from './src/db/config.js';
import delphitsocialRoutes from './src/routes/delphitsocialRoutes.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();


app.use(express.json());
//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));


//JWT middleware
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if(err) req.user = undefined;
            req.user = decode;
            next();
        })
    }else{
        req.user = undefined;
        next();
    }});



//ROUTES
delphitsocialRoutes(app);
app.get('/', (req, res) => {
    res.send('Hello World!');

});




app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);

});