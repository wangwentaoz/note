module.exports = {
  getUserList(){
    return [
      {
        id:1,
        name:'eric',
        city:'shanghai'
      },
      {
        id:2,
        name:'小明',
        city:'beijing'
      },
      {
        id:3,
        name:'小王',
        city:'liaoning'
      },
    ]
  },
  addUser(userObj){
    console.log(userObj);
    return {
      code:0,
      msg:'新增成功',
      data:null
    }
  },
  delectUser(id){
    console.log(id);
    return {
      code:0,
      msg:'删除成功',
      data:null
    }
  },
  updateUser(id,userObj){
    console.log(id,userObj);
    return {
      code:0,
      msg:'更新成功',
      data:null
    }
  },
}