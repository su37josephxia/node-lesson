# 定制node镜像
FROM node:10-alpine
ADD . /app/
# 进入工作目录
WORKDIR /app
RUN npm install
EXPOSE 3000
# 启动脚本
CMD ["node", "app.js"]