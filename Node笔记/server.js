
const http = require('http')
const routerModel = require('./index.js')

const getPostData = (req) =>{
  return new Promise((resolve, reject) =>{
    if(req.method !== 'POST'){
      resolve({})
      return
    }
    //postData获取数据
    let postData = ''
    req.on('data',chunk =>{
      postData += chunk
    })
    req.on('end',() =>{
      console.log(postData)
      resolve(JSON.parse(postData))
    })
  })
}

const server = http.createServer((req,res) =>{
  //允许跨域。正常第二个参数是一个数组，里面有允许跨域的域名
  //通过判断req.url在不在数组中就可以动态设置
  res.serHeader("Access-Control-Allow-Origin","*") 
  //编码设置
  res.writeHead(200,{'content-type':'application/json;charset=UTF-8'})
  //post请求
  getPostData(req).then(data=>{
    //把postData复制给req.body,之后在routerModel方法中可以进行处理
    req.body = data
    //把请求体复制给req.body
    let resultData = routerModel(req,res)
    if(resultData){
      res.end(JSON.stringify(resultData))
    }else{
      res.writeHead(404,{'content-type':'text/html'})
      res.end('404 not found')
    }
  })
})

server.listen(3000,()=>{
  console.log('监听300端口')
})