import sql from 'mssql'
import config from '../db/config.js'

export const sendComment = async (req,res) =>{
    const{userID,postID,content} = req.body;
    try{
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('userID', sql.Int, userID)
        .input('postID',sql.Int, postID)
        .input('content',sql.VarChar,content)
        .query('INSERT INTO Comments (userID,postID,content) VALUES(@userID,@postID,@content)');
    res.status(200).json({message:"comments sent successfuly"});
    }catch(error){
        res.status(500).json({message:error.message});
    }finally{
        sql.close();
    }
}

//get comments

export const getPostComment =async(req,res) => {
    const {postID} = req.params;

    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .query(`SELECT * FROM Comments WHERE postID = ${postID}`);
        if(result.recordset.length === 0 ){
            return res.status(202).json({message:'no comments now'});
        }
        res.status(200).json(result.recordset);
    }catch(error){
        res.status(500).json({error:'oops error ocurred'});
    }finally{
        sql.close();
    }
};