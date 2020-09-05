## 封装Button组件
- 对Button组件实现`Size`和`Type`的可配置型
- 对`a`链接的`hover，focus，disabled`分别配置

### 通过 定义接口枚举变量的类型 
实现`Button`组建的可定制化

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gifua2d3glj31wg0rw7gu.jpg)

## 封装Alert组件
### 原型图
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gifu84ze46j30eb03574b.jpg)

### 功能特点：
1 点击 `close` 整个元素消失 
2 ⽀持四种主题颜⾊ export type AlertType = ‘success’ | ‘default’ | ‘danger’ | 'warning’ 
3 可以包含标题和内容，解释更详细的警告 
4 右侧是否显⽰关闭按钮可配置
