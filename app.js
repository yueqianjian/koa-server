const Koa = require('koa')
const router = require('koa-router')()
const cors = require('koa2-cors')
const koaBody = require('koa-body');
const multer = require('koa-multer')
const { join } = require('path')

const app = new Koa

app.use(cors({
  origin: "*",  // 允许 所有的都可以跨域
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 50000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(koaBody({ 
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  } 
}))

const storage = multer.diskStorage({
  // 存储的位置
  destination: join(process.cwd(), "upload"),
  // 文件名
  filename(req, file, cb){
    const filename = file.originalname.split(".")
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
  }
})

const upload = multer({storage})

router.get('/getUserList', async ctx => {
  ctx.status = 201;
  let query = ctx.request.query || ctx.query
  console.log("query",query)
  ctx.body = {
    name: 123
  }
})


router.post('/eidtUser', async ctx => {
  let query = ctx.request.body
  console.log("query",query)
  ctx.body = {
    name: 123
  }
})


router.post('/profile', upload.single('file'), async ctx => {
  let body = ctx.req.body
  console.log("body",body)
  ctx.body = {
    name: 123
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(7777);

