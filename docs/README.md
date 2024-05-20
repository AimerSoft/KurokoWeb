<div align="center">
 <a href="https://toaru.huijiwiki.com/wiki/%E7%99%BD%E4%BA%95%E9%BB%91%E5%AD%90">
  <img src="img/kuroko.png" alt="Kuroko" width = "256">
 </a>
 <h1>KurokoWeb | 短链接服务前端 </h1>

 [![GitHub](https://img.shields.io/github/license/AimerSoft/KurokoWeb)](https://raw.githubusercontent.com/AimerSoft/KurokoWeb/main/LICENSE)
 [![Man hours](https://img.shields.io/endpoint?url=https%3A%2F%2Fmanhours.aiursoft.cn%2Fr%2Fgithub.com%2FAimerSoft%2FKurokoWeb.json)](https://manhours.aiursoft.cn/)

 “白井的能力是大能力者的<b>空间移动</b>（日文：空間移動；英文：Teleport），简单来说，就是可以把皮肤碰触到的东西包括自己在内，以无视三维空间规则的方式瞬间送至远方的能力。”
</div>

## 如何部署

```bash
yarn install
yarn build
```

使用你喜欢的 web server 托管 `./dist` 文件即可！

```bash
# Quickly start server with caddy
caddy file-server --listen :26743 --root ./dist
```
