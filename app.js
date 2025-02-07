const express = require('express');
const cors = require('cors');
const maorgan = require('morgan')

const indexRouter = require('./routes');
const app = express();
//解析客户端请求json格式
app.use(express.json());
//解析请求体中的 URL 编码格式数据（通常是表单提交的数据）
app.use(express.urlencoded());
//解决跨域
app.use(cors());
//记录日志
app.use(maorgan('dev'));
//更改访问地址
app.use('/api/v1', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
