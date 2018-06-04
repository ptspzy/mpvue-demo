# mpvue-demo

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 问题
- 组件命名问题, 原生HTML标签冲突（如footer,article...） [mpvue保留字](https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/util/index.js#L7-L14)