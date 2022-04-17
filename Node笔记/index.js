const url = require('url')
const { getUserList,addUser,delectUser,updateUser } = require('./user')
function handleRequest(req,res){
  let urlObj = url.parse(req.url,true)
  if(urlObj.pathname === '/api/getUserList' && req.method === 'GET'){
    let resultData = getUserList()
    return resultData
  }
  if(urlObj.pathname === '/api/addUser' && req.method === 'POST'){
    let resultData = addUser(req.body)
    return resultData
  }
  if(urlObj.pathname === '/api/delectUser' && req.method === 'POST'){
    //这个也行 let resultData = delectUser(req.body.id)
    //现在id值通过url传入http://localhost:3000/api/delectUser?id=1
    let resultData = delectUser(urlObj.query.id)
    return resultData
  }
  if(urlObj.pathname === '/api/updateUser' && req.method === 'POST'){
    let resultData = updateUser(urlObj.query.id,req.body)
    return resultData
  }
}

module.exports = handleRequest