const query = require('../db/conn')
module.exports = {
 async getUserList(urlParams){
    let {name,city} = urlParams
    let sql = 'select * from user where 1=1 '
    if(name){
      sql += 'and name = ?'
    }
    if(city){
      sql += 'and city = ?'
    }
    let resultData = await query(sql,[name,city])
    return resultData
  },
  async addUser(userObj){
    console.log(userObj);
    let {name,city,sex} = userObj
    let sql = 'insert into user (name,city,sex) values (?,?,?)'
    let resultData = await query(sql,[name,city,sex])
    if(resultData){
      return {
        msg:'新增成功'
      }
    }else{
      return {
        msg:'新增失败'
      }
    }
    
  },
  async delectUser(id){
    let sql = 'delete from user where id = ?'
    let resultData = await query(sql,[id])
    if(resultData.affectedRows > 0){
      return {
        msg:'删除成功'
      }
    }else{
      return {
        msg:'删除失败'
      }
    }
  },
  async updateUser(id,userObj){
    // console.log(id,userObj);
    let {name,city,sex} = userObj
    let sql = 'update user set name = ?,city = ?,sex = ? where id = ?'
    let resultData = await query(sql,[name,city,sex,id])
    if(resultData.affectedRows > 0){
      return {
        msg:'更新成功'
      }
    }else{
      return {
        msg:'更新失败'
      }
    }
    
  }
}