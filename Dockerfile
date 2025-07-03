# 简化的单阶段 Dockerfile
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制所有文件
COPY . .

# 安装所有依赖
RUN npm install --legacy-peer-deps || npm install
RUN cd server && (npm install --legacy-peer-deps || npm install)
RUN cd client && (npm install --legacy-peer-deps || npm install)

# 构建客户端
RUN cd client && npm run build

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["npm", "start"]
