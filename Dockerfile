# 多阶段构建 Dockerfile
# 第一阶段：构建 React 应用
FROM node:16-alpine AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production

COPY client/ ./
RUN npm run build

# 第二阶段：构建最终镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制服务器端代码
COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

# 复制构建好的客户端文件
COPY --from=client-builder /app/client/build ./public

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 更改文件所有权
RUN chown -R nextjs:nodejs /app
USER nextjs

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "index.js"]
