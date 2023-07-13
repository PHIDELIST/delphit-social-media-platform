import sql from 'mssql'
import config from '../db/config.js'

export const createPost = async (req, res) => {
    const {content,postImg } = req.body
    const userID = req.user.userID;
    
  try{
    const pool = await sql.connect(config.sql)
    await pool.request()
    .input('userID',sql.Int,userID)
    .input('content',sql.VarChar,content)
    .input('postImg',sql.VarChar,postImg)
    
    .query('INSERT INTO Posts (userID,content,postImg) VALUES (@userID,@content,@postImg)')
    res.json({message:'Post created successfuly'})
  }catch(err){
    console.log(err)
  }finally{
    sql.close()
  }
}
    
  
//get all posts
export const getAllPosts = async (req, res) => {
  try{
    const pool = await sql.connect(config.sql)
    const posts = await pool.request().query('SELECT * FROM Posts')
    res.json(posts.recordset)
  }catch(err){
    console.log(err)
  }finally{
    sql.close()
  }

}
