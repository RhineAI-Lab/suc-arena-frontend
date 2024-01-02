
# Suc Arena Frontend

<br/>

## Environment

在 `https://nodejs.org/en` 安装 NodeJs。

推荐使用 `20.x.x` LTS版本。


```text
# clone 仓库
git clone https://github.com/Rhine-AI-Lab/suc-arena-frontend

# 进入目录
cd suc-arena-frontend

# 安装依赖
npm i
```

<br/>

## Quick Start


```text
npm run dev
```

浏览器访问 `http://localhost:3310/show` 即可

<br/>

## SSR Deploy

```text
npm run build
npm run start
```

浏览器访问 `http://localhost:3310/show` 即可

<br/>

### Service Mode Deploy

```text
# 复制 ./deploy/suc-arena-web.service 到 /etc/systemd/system/suc-arena-web.service
cp ./deploy/suc-arena-web.service /etc/systemd/system/suc-arena-web.service

# 设为开机启动
systemctl enable suc-arena-web.service

# 启动服务
systemctl start suc-arena-web.service
```

更多见 `./deploy` 目录下的文件。

