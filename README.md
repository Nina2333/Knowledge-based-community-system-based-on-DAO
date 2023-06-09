# Knowledge-based-community-system-based-on-DAO
这是一个基于区块链的知识共享系统，它还没有完成。在后续我会对其积分交换模块进行更新。
It's a blockchain-based knowledge sharing system, and it's not done yet. I will update its integral switch module in the future。

我们的系统将分为四个主要部分：
- 决议管理：负责论坛的管理员进行社区管理员人员调动、社区活动、黑名单等管理，包含决议创建、发布、生效。
- 积分管理：负责系统积分的管理和分配，包括积分的发行、兑换、转移等。
- 用户管理：负责系统用户信息的管理和安全，包括用户注册、登录、身份验证、个人信息维护等。
- 论坛管理：负责系统内部论坛的管理和运营，包括帖子发布、评论管理、内容审核等。

这四个部分相互关联，形成了系统的基本架构。决议管理部分是DAO系统的核心；积分管理部分可以激励用户积极参与系统的使用，增加用户黏性；用户管理部分可以保障用户信息的安全和隐私，提升用户体验；论坛管理部分可以为用户提供交流和学习的平台，增加用户互动。整个系统的目标是建立一个安全可靠、公平公正、开放透明的知识型社区平台，为用户提供一个高效的知识交流和共享的平台。

# 系统环境
|软件	|ganache	|Nodejs	|NPM	|Mysql	|Web3.js	|hardhat	|geth|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|版本	|2.7.0	|11.12.0	|6.7.0	|5.7.35	|1.9.0	|2.13.0|1.10.8|

# 安装
1. 拉取项目后安装更新node依赖
```
npm install
```
2. 还需要自行安装 IPFS 和 ganache

- IPFS：[https://ipfs.tech/#install](https://ipfs.tech/#install)
- ganache：[https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/)

3. 启动时需要开启 ganache 和 IPFS
```
ipfs daemon
```
# 总结
在系统实现方面，我们使用了 Solidity、web3.js 和 express 框架开发了智能合约和前端页面。智能合约包括了 DAO 核心功能和奖励机制的实现，通过前端页面，用户可以浏览、搜索、发布和评价知识内容。同时，为了提高用户参与度，我们使用了积分和黑名单机制，激励用户积极参与和贡献。
最后也发现了一些未完成和需要优化完善的任务，例如黑名单、举报机制的完善和积分池的实现、页面排版优化等。通过这篇论文，我们相信能够提供有用的参考和思路，为其他基于 DAO 的知识型社区系统的设计和实现提供帮助。

