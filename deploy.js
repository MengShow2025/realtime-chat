#!/usr/bin/env node

// 部署脚本 - 解决各种npm问题
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始部署流程...');

function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📦 执行: ${command}`);
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    return true;
  } catch (error) {
    console.error(`❌ 命令失败: ${command}`);
    console.error(error.message);
    return false;
  }
}

// 1. 安装根目录依赖
console.log('\n📦 安装根目录依赖...');
if (!runCommand('npm install --legacy-peer-deps')) {
  console.log('⚠️  尝试备用安装方法...');
  runCommand('npm install --force');
}

// 2. 安装服务器依赖
console.log('\n🖥️  安装服务器依赖...');
if (!runCommand('npm install --legacy-peer-deps', './server')) {
  console.log('⚠️  尝试备用安装方法...');
  runCommand('npm install --force', './server');
}

// 3. 安装客户端依赖
console.log('\n💻 安装客户端依赖...');
if (!runCommand('npm install --legacy-peer-deps', './client')) {
  console.log('⚠️  尝试备用安装方法...');
  runCommand('npm install --force', './client');
}

// 4. 构建客户端
console.log('\n🏗️  构建客户端应用...');
if (!runCommand('npm run build', './client')) {
  console.error('❌ 客户端构建失败！');
  process.exit(1);
}

// 5. 检查构建结果
const buildPath = path.join(__dirname, 'client', 'build');
if (fs.existsSync(buildPath)) {
  console.log('✅ 客户端构建成功！');
  console.log('🎉 部署准备完成！');
} else {
  console.error('❌ 构建文件夹不存在！');
  process.exit(1);
}

console.log('\n🚀 可以启动服务器了: npm start');
