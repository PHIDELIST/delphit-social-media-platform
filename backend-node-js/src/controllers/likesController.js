import config from "../db/config.js"
import sql from "mssql"

export const sendLike = async (req,res) => {
    try{
        const{postID,userID} = req.body;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('postID', sql.Int,postID)
        .input('userID', sql.Int,userID)
        .query('INSERT INTO Likes (postID,userID) VALUES(@postID,@userID)');
    res.status(201).json({message:"you liked it"});
    }catch(error){
        res.status(500).json({message:error.message})
    }finally{
        sql.close();
    }
}

//get all likes