﻿# Tài liệu cài đặt:
 # # Cài đặt môi trường:
 - Nodejs version 17 trở lên
 - Mongodb phiên bản mới nhất
# # Cài đặt chương trình
- Truy cập trang https://github.com/thanhlam0241/nodejs-react-web, vào nhánh test và tải toàn bộ project về
- Trong thư mục backend, thêm vào file ```.env``` có nội dung:
 ```
   DATABASE_URL=mongodb://127.0.0.1:27017/chat_application
   ACCESS_TOKEN_SECRET=a2cfe516d67898576f7e7052c80b329922fdba69c1a89d8900a9b55261734d3854ef198204079d468c8159f0b9ffd92c941afc4162bad5be068560556cd4701c
   REFRESH_TOKEN_SECRET=c8a01d632ac79411a337e936b6a3719f5d6a716a2223ea90afaac91c4ac102c9925361852fc90105cb9798c3f78c69245a83db11fc2d39ebeccbe4cf4a07f196
```
- Trong terminal, dùng lệnh cd vào các folder backend và frontend, gõ ```npm install```
- Chờ các dependency được tải xong, dùng lệnh ```npm start``` để khởi chạy trong từng thư mục ```backend``` và ```frontend```
- Gõ ```http;//localhost:3000``` vào trình duyệt để chạy chương trình
