import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginrequired = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.status(401).json({message:'Unauthorized user'});
    }

}

export const register = async (req, res) => {
    const { name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 1);
    try {
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('email',sql.VarChar,email)
            .input('name',sql.VarChar,name)
            .query('SELECT * FROM Users WHERE email = @email OR name = @name');
            const user = result.recordset[0];
            if(user){
                res.status(400).json({message:'User already exists'});
            }else{
                await pool.request()
                .input('name',sql.VarChar,name)
                .input('email',sql.VarChar,email)
                .input('password',sql.VarChar,hashedPassword)
                .query('INSERT INTO Users (name,email,password) VALUES (@name,@email,@password)');
            res.status(201).json({message:'User created successfully'});
            }}catch(error){
                
                res.status(500).json({message:error.message});
            }finally{
                sql.close();
            }
            
        }


export const login = async (req, res) => {
    let {email, password} = req.body;
    try {
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('email',sql.VarChar,email)
            .query('SELECT * FROM Users WHERE email = @email');
            const user = result.recordset[0];
            if(!user){
                res.status(400).json({message:'User does not exist'});
            }else{
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    res.status(400).json({message:'Invalid credentials'});
                }else{
                    const token = `JWT ${jwt.sign({userID:user.userID,name:user.name,email:user.email},config.jwt_secret)}`;
                    res.status(200).json({token:token,user:user.name,userID:user.userID});
                }
            }
    } catch (error) {
        res.status(500).json({message:error.message});
    } finally{
        sql.close();
    }
    

}
            
            
        
    