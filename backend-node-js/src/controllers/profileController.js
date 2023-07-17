import sql from 'mssql'
import config from '../db/config.js'

export const updateprofile = async (req, res) => {
    try{
    const {bio} = req.body;
    const userID = req.user.userID;
    const avatarID = req.user.userID;
    const pool = await sql.connect(config.sql);
    await pool.request()
    .input('userID', sql.NVarChar, userID)
    .input('bio', sql.NVarChar, bio)
    .input('avatarID', sql.VarChar, avatarID)
    .query('UPDATE Users SET bio = @bio, avatarID = @avatarID WHERE userID = @userID');
    res.status(200).send('Profile updated successfully');
}catch(err){
    res.status(500).send(err);

}finally{
    sql.close();
}};

export const getbio = async (req, res) => {
    try{
    const userID = req.user.userID;
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
    .input('userID', sql.NVarChar, userID)
    .query('SELECT bio FROM Users WHERE userID = @userID');
    res.status(200).send(result.recordset[0].bio);
}catch(err){
    res.status(500).send(err);

}finally{
    sql.close();
}
}
