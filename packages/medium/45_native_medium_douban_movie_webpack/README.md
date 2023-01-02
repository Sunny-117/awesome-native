> 效果展示地址：https://study.duyiedu.com/movie
>
> 接口地址：http://mock.duyiedu.com/project/72/interface/api/234

# 功能模块划分

![image-20210510105351710](http://mdrs.yuanjin.tech/img/20210510105351.png)

# 分包

如果站点中的所有依赖都打包到一个js文件中，势必会导致打包结果过大

![image-20210510110356818](http://mdrs.yuanjin.tech/img/20210510110356.png)

而实际上，在页面初始的时候，不需要那么多代码参与运行。

比如在这个项目中，一开始必须要运行的只有封面模块，因为它是用户一开始就必须要能够看见的。而电影模块可以慢慢加载。

基于此，我们可以使用动态导入的方式加载电影模块

```js
// main.js
import './cover'; // 静态导入，表示初始就必须要依赖 cover 模块
import('./movie'); // 动态导入，表示运行到此代码时才会去远程加载 movie 模块
```

webpack能够识别动态导入的代码，当它发现某个模块是使用动态导入时，该模块会单独形成打包结果

![image-20210510110909513](http://mdrs.yuanjin.tech/img/20210510110909.png)

在浏览器运行时，会首先加载初始的打包结果，然后在后续的运行过程中，动态加载其他模块。这样就可以尽量提升初始加载效率，又不影响后续模块的加载

![image-20210510111343103](http://mdrs.yuanjin.tech/img/20210510111343.png)

# 跨域代理

**大部分时候，为了安全，服务器都是不允许跨域访问的**

所以，将来部署应用的时候，通常会使用下面的方式进行部署

![image-20210510123323486](http://mdrs.yuanjin.tech/img/20210510123323.png)

你无须彻底理解上图，只需要知道：**最终部署之后，不存在跨域问题**

但是，**跨域问题在开发阶段是存在的**！

![image-20210510123708048](http://mdrs.yuanjin.tech/img/20210510123752.png)

所以，我们要做的，**仅仅是消除开发阶段的跨域问题，便于在开发阶段查看效果**

如何实现：

1. 在`webpack.config.js`中，找到下面的部分，设置代理

   ```js
   devServer: {
     proxy: {
       '/api': { // 当请求地址以 api 开头时，代理到另一个地址
         target: 'http://study.duyiedu.com', // 代理的目标地址
         changeOrigin: true, // 更改请求头中的host，无须深究，为避免出问题，最好写上
       },
     },
   },
   ```

2. 在`ajax`请求时，仅需给上请求路径即可

   ```js
   axios.get('http://study.duyiedu.com/api/movies'); // ❌ 无须指定源
   axios.get('/api/movies')； // ✅
   ```

来看看这样做的效果是什么

![image-20210510124724077](http://mdrs.yuanjin.tech/img/20210510124724.png)

这样一来，在跨域问题上，就做到了**开发环境和生产环境的统一**

![image-20210510125000499](http://mdrs.yuanjin.tech/img/20210510125000.png)

# 电影模块

![image-20210510134430136](http://mdrs.yuanjin.tech/img/20210510134430.png)

## list模块

该模块很简单，按照下面的思路实现即可

```js
/**
 * 初始化函数，负责创建容器
 */
function init(){
  
}

init();

/**
 * 根据传入的电影数组，创建元素，填充到容器中
 * @params movies 电影数组
 */
export function createMovieTags(movies){
  
}
```

## pager模块

该模块整体思路如下：

```js
/**
 * 初始化函数，负责创建容器
 */
function init(){
  
}

init();

/**
 * 根据传入的页码、页容量、总记录数，创建分页区域的标签
 * @params page 页码
 * @params limit 页容量
 * @params total 总页数
 */
export function createPagers(page, limit, total){
  
}
```

### createPagers

该函数的实现可以按照下面的思路进行

```js
/**
 * 根据传入的页码、页容量、总记录数，创建分页区域的标签
 * @params page 页码
 * @params limit 页容量
 * @params total 总页数
 */
export function createPagers(page, limit, total){
  /**
   * 辅助函数，负责帮忙创建一个页码标签
   * @params text 标签的文本
   * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
   */
  function createTag(text, status, targetPage){
    
  }
  
  //1. 创建首页标签
  //2. 创建上一页标签
  //3. 创建数字页码标签
  //4. 创建下一页标签
  //5. 创建尾页标签
}
```

