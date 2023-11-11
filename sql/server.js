const express = require('express')
const connection = require('./connection.js')
const formidable = require('formidable'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');
const fs = require('fs');  

const app = express()

app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析表单数据
app.use(express.static('uploads'));

app.use(cors({
  origin: 'http://localhost:5173',  
})); 

//随机图片名生成
function generateUniqueImageName() {
  const timestamp = Date.now(); // 获取当前时间戳
  const randomSuffix = Math.floor(Math.random() * 1000); // 生成一个随机数作为后缀
  const uniqueName = `image_${timestamp}_${randomSuffix}`; // 构建唯一名称
  return uniqueName;
}

//注册
app.post('/enrollUser', (req, res) => {
  const user = [req.body]
  // console.log([user[0].name]);
  let sql = "select * from users where userId = ? "
  connection.query(sql,[user[0].userId],(err,result) =>{
    if(err){
      console.log(err.message);
      res.send("网络加载错误")
      return
    }
    else{
      if(result.length>0){
        res.send("账号已存在请重新输入")
      }else{
        let sql = "INSERT INTO users ( name,userId,passWord)VALUES( ?,?,?);"
        connection.query(sql,[user[0].name,user[0].userId,user[0].passWord],(err,result)=>{
          if(err){
            console.log(err.message);
            res.send("网络加载错误请重试")
            return
          }if(result){
            let user = {                          
              code:"账号创建成功"
            }
            res.send(user)
          }
        })
       
      }
    }
  })
})

//登录
app.post('/logonUser', (req, res) => {
  const user = [req.body]
  // console.log([user[0].name]);
  let sql = "select * from users where userId = ?"
  connection.query(sql,[user[0].userId],(err,result) =>{
    if(err){
      console.log(err.message);
      res.send("网络加载错误")
      return
    }else{
      if(result.length == 0){
        res.send("账号不存在，请确认输入正确！")
      }else{
        // console.log(result[0].passWord);
        if(result[0].passWord == user[0].passWord){                   
         let user = {            
            result,
            code:"登录成功"
          }
          res.send(user)
        }else{
          // console.log(2);
          res.send("密码错误,请确认后输入!")
        }
      }
    }
  })
})

//接收上传头像  //multiples是Formidable库的一个选项，用于指示是否允许多个文件上传。
app.post('/upload',(req, res) => {
  if (req.method.toLowerCase() === 'post' && req.url.endsWith('/upload')){
    // 创建Formidable表单实例
    const form = new formidable.IncomingForm({ multiples: true });

    // 指定上传文件的存储路径
    form.uploadDir = './uploads';

    // 解析表单数据和处理上传的文件
  form.parse(req, (err, fields, files) => {
  if (err) {
    console.log(err);
    res.statusCode = 500;
    res.end('服务器内部错误');
    return;
  }
  
  // 获取上传的文件信息
  const file = files.file;
  const oldPath = file[0].filepath;

  // 生成唯一的文件夹名称
  const folderName = fields.user
  const imgName = generateUniqueImageName()
  // 指定目标路径，包含新的文件夹名称和原始文件名
  const newPath = `./uploads/${folderName}/${imgName}.png`;

  // 判断文件夹是否存在
  if (!fs.existsSync(`./uploads/${folderName}`)) {
  // 如果文件夹不存在，则创建文件夹
  fs.mkdirSync(`./uploads/${folderName}`);
  }

  // 移动文件到新的目标路径
  try{
    fs.renameSync(oldPath, newPath);
    fs.readFile(newPath, function (err, data) {
      if (err) {
        // 处理错误
        res.statusCode = 500;
        res.end('Error reading file');
      } else {
        // 将文件内容传输给客户端 
        const imageUrl = `http://localhost:3000/${folderName}/${imgName}.png`;  //相对于静态文件目录的URL路径，并将其与服务器的基本URL拼接起来
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(imageUrl);
      }
    });

  }catch{
    console.log(err);
    res.statusCode = 500;
    res.end('服务器内部错误');
    return;
  }
})
} else {
    // 处理其它请求...
    res.statusCode = 404;
    res.end('Not Found');
  }
})

// 更新数据
app.post('/update',(req,res) => {
  const user = req.body
      // 执行更新语句
      connection.query('UPDATE users SET name = ?, signature = ?,head = ? WHERE userId = ?', [user.name,user.signature,user.head,user.userId], (error,results) => {
        if (error) {
          // 处理错误情况 
          console.log(3);
          res.statusCode = 500;
          res.send("更新出错")
        } else {          
          // 返回结果或处理其他逻辑
          console.log(results); 
          res.statusCode = 200;
          res.send({
            state:200,
            code:"修改成功"});
        }    
      })
})
// 启动服务器监听指定端口
app.listen(3000, () => {
  console.log('服务器已启动，监听端口 3000');
});
