<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 后端架构

### 技术栈
- **核心框架**：Nest.js (企业级Node.js框架)
- **运行环境**：Docker (容器化部署)
- **服务器**：阿里云ECS (应用托管)
- **数据库**：MySQL (通过Hmysql服务)
- **存储服务**：阿里云OSS (对象存储服务)
- **数据库工具**：MySQL Workbench (数据库管理)

### 开发流程
1. **本地开发**：基于Nest.js框架开发RESTful API
2. **数据库管理**：使用MySQL Workbench进行数据建模和调试
3. **容器化**：通过Docker打包应用
4. **部署**：发布到阿里云服务器
5. **存储**：静态资源托管在阿里云OSS

### 技术亮点
- **微服务架构**：Nest.js提供良好的分层结构
- **容器化**：Docker保证环境一致性
- **高可用存储**：阿里云OSS提供可靠的静态资源存储
- **高效协作**：GitHub统一管理代码版本

- ## 协作流程

### 代码管理
- **版本控制**：GitHub仓库管理
- **自动化**：
  - Webhook监听代码提交事件
  - GitHub Actions实现CI/CD流程

### 部署流程
1. **前端**：代码提交后触发Vercel自动部署
2. **后端**：Docker镜像构建并部署到阿里云服务器
3. **数据库**：通过MySQL Workbench进行数据维护

### 团队协作
- **角色分工**：明确的前端/后端开发人员
- **开发环境**：Windows开发环境
- **流程自动化**：最大程度减少人工干预

## 项目优势
1. **全栈TypeScript**：前后端统一使用TS，提高开发效率
2. **完善的自动化**：从代码提交到部署全链路自动化
3. **云原生架构**：结合Docker和云服务，保证系统可靠性
4. **移动优先**：前端针对移动端体验优化
5. **标准化流程**：规范的代码管理和部署流程
   
## 全栈架构图

![1 drawio](https://github.com/user-attachments/assets/1af58eb2-f25e-4d43-b326-7fb288ce4232)



