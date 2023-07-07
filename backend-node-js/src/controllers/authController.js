import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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
                .input('email',sql.VarChar,email)
                .input('name',sql.VarChar,name)
                .input('password',sql.VarChar,hashedPassword)
                .query('INSERT INTO Users (email,name,password) VALUES (@email,@name,@password)');
            res.status(201).json({message:'User created successfully'});
            }}catch(error){
                res.status(500).json({message:error.message});
            }finally{
                sql.close();
            }
            
        }
            
            
            
        
    