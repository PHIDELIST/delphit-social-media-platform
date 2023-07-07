import dotenv from 'dotenv'
import assert from 'assert'

dotenv.config()

const {PORT,HOST_URL,HOST,SQL_SERVER,SQL_DB,SQL_PWD,SQL_USER,JWT_SECRET} = process.env

const sqLEncrypt = process.env.SQL_ENCRYPT === 'true'

assert(PORT, 'PORT is required')
assert(HOST_URL, 'HOST_URL is required')

const config = {
    port:PORT,
    host:HOST,
    url:HOST_URL,
    sql:{
        server:SQL_SERVER,
        database:SQL_DB,
        user:SQL_USER,
        password:SQL_PWD,
        options:{
            encrypt:sqLEncrypt,
            enableArithAbort:true
        }
    },
    jwt_secret:JWT_SECRET,
};
export default config;