# 🌐 路由器端口转发设置指南

## 📋 准备工作

### 1. 获取本机IP地址
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
# 或
ip addr show
```
记录你的内网IP地址（通常是192.168.x.x）

### 2. 获取公网IP地址
访问 [whatismyipaddress.com](https://whatismyipaddress.com/) 查看你的公网IP

## ⚙️ 路由器设置步骤

### 1. 登录路由器管理界面
- 打开浏览器访问：`192.168.1.1` 或 `192.168.0.1`
- 输入管理员用户名和密码

### 2. 找到端口转发设置
不同品牌路由器位置不同：
- **TP-Link**: 高级设置 → NAT转发 → 虚拟服务器
- **华为**: 高级设置 → 安全设置 → 虚拟服务器
- **小米**: 高级设置 → 端口转发
- **华硕**: 外部网络 → 虚拟服务器/端口转发

### 3. 添加端口转发规则
```
服务名称: RealTime-Chat
外部端口: 3001
内部IP: 你的电脑内网IP (如192.168.1.100)
内部端口: 3001
协议: TCP
状态: 启用
```

### 4. 保存并重启路由器

## 🔒 安全注意事项

### 1. 设置防火墙规则
```bash
# Windows防火墙
# 控制面板 → 系统和安全 → Windows Defender防火墙 → 高级设置
# 新建入站规则 → 端口 → TCP → 特定本地端口 → 3001

# macOS防火墙
sudo pfctl -f /etc/pf.conf

# Linux防火墙
sudo ufw allow 3001
```

### 2. 使用动态DNS（推荐）
如果你的公网IP经常变化：
- 注册花生壳、No-IP等动态DNS服务
- 在路由器中配置DDNS
- 使用域名访问而不是IP地址

## 🎯 访问方式

设置完成后，朋友可以通过以下方式访问：
- `http://你的公网IP:3001`
- `http://你的动态域名:3001`

## ⚠️ 注意事项

1. **安全风险**: 直接暴露端口有安全风险
2. **运营商限制**: 部分运营商可能封禁80、443等端口
3. **动态IP**: 家庭宽带IP可能会变化
4. **网络稳定性**: 家庭网络可能不如专业服务器稳定

## 🔧 故障排除

### 无法访问
1. 检查路由器端口转发设置
2. 检查电脑防火墙设置
3. 确认应用正在运行
4. 测试内网访问是否正常

### IP地址变化
1. 使用动态DNS服务
2. 定期检查公网IP变化
3. 考虑使用内网穿透方案
