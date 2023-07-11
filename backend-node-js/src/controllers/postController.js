import sql from 'mssql'
import config from '../db/config.js'

export const createPost = async (req, res) => {
    const {userID, content,postImg} = req.body
  try{
    const pool = await sql.connect(config.sql)
    await pool.request()
    .input('userID',sql.Int,userID)
    .input('content',sql.VarChar,content)
    .input('postImg',sql.VarChar,postImg)
    
    .query('INSERT INTO post (userID,content,postImg) VALUES (@userID,@content,@postImg)')
    res.json({message:'Post created successfuly'})
  }catch(err){
    console.log(err)
  }finally{
    sql.close()
  }
}
    
  
 