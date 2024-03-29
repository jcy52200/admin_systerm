# vue-admin-template

## Extra

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

### 工程结构解析

```
├── build                      # 构建脚本目录
├── mock                       # 模拟测试文件
├── node_modules               # node依赖包
├── public                     # 静态文件（无需构建）
├── src                        # 源代码
│   ├── apis                     # 所有请求
│   ├── assets                   # 静态资源
│   ├── components               # 全局组件
│   ├── icons                    # svg图标
│   ├── layout                   # 布局
│   ├── router                   # 路由设置
│   ├── stores                   # 全局 vuex
│   ├── styles                   # 全局样式
│   ├── utils                    # 全局方法
│   ├── views                    # 路由级组件
│       ├── dashboard               # 首页
│       ├── category                # 分类页
│       ├── cart                    # 购物车
│       ├── my                      # 我的
│       └── login                   # 登录页
│   ├── App.vue                  # 根组件
│   ├── main.js                  # Vue初始化入口文件
│   ├── permission.js            # 导航守卫放置页
│   ├── setting.js               # 页面设置  
├── test                       # 自动化测试 jest 测试文件目录
├── .editorconfig              # editorconfig 配置
├── .env.development           # 开发环境下的配置文件
├── .env.production            # 生产环境下的配置文件
├── .eslintignore              # eslint忽略项
├── .eslintrc.cjs              # eslint 配置
├── .gitignore                 # git 忽略文件
├── .travis.yml                # 配置Travis CI（持续集成服务）的配置文件
├── babel.config.js            # babel 配置文件
├── jest.config.js             # jest 配置文件
├── jsconfig.json              # js项目的根目录
├── LICENSE                    # 文件开源声明
├── package-lock.json          # 包版本控制文件
├── package.json               # package.json 版本及依赖
├── postcss.config.js          # PostCSS 配置文件
├── vue.config.js              # 可选配置文件
├── yarn.lock                  # yarn包版本控制文件 

```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

完整gitee项目代码地址: https://gitee.com/shuiruohanyu/heimahr/tree/master


项目接口文档地址: https://www.apifox.cn/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076/api-49562537


项目演示地址: https://heimahr.itheima.net/
接口实际地址: 示例-https://heimahr.itheima.net/api/sys/login


项目演示备份地址: https://heimahr-t.itheima.net/ 


备份接口实际地址: 示例-https://heimahr-t.itheima.net/prod-api/sys/login


项目笔记地址(语雀-在线，线下笔记已经在资源中): https://www.yuque.com/shuiruohanyu/agxcua


登录密码：网络安全需要，密码以由原来的123456 变更为hm#qd@23! ， 管理员不可修改密码，新建用户的密码仍为123456
