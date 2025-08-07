// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001; // Có thể chọn port khác nếu bị trùng

app.use(cors());

app.use(
  '/proxy',
  createProxyMiddleware({
    target: 'https://iotplatform.intelli.com.vn/portal', // Thay bằng portal bạn gọi
    changeOrigin: true,
    pathRewrite: {
      '^': '', // bỏ /proxy khi gọi đến target
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
