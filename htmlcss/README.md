- [Jonas HTML&CSS Courses](#jonas-htmlcss-courses)
  - [CHEATSHEET](#cheatsheet)
    - [FLEXBOX](#flexbox)
    - [GRID](#grid)
  - [HTML](#html)
  - [CSS](#css)
    - [计算优先级](#计算优先级)
      - [IMPORTANCE](#importance)
      - [SPECIFICITY](#specificity)
      - [SOURCE ORDER](#source-order)
    - [CSS 单位计算方式](#css-单位计算方式)
      - [百分比](#百分比)
      - [em 和 rem（font-based），rem 不支持 ie9 以下版本](#em-和-remfont-basedrem-不支持-ie9-以下版本)
      - [vh 和 vw](#vh-和-vw)
    - [渲染，The Visual Formatting Model](#渲染the-visual-formatting-model)
      - [盒模型](#盒模型)
      - [盒子的类型：display 属性](#盒子的类型display-属性)
      - [定位](#定位)
      - [stacking context，层叠上下文](#stacking-context层叠上下文)
    - [BEM (Block Element Modifier)](#bem-block-element-modifier)
    - [冷门选择器整理](#冷门选择器整理)
  - [响应式布局](#响应式布局)
    - [媒体查询，media queries](#媒体查询media-queries)
    - [responsive images](#responsive-images)
  - [浏览器兼容性](#浏览器兼容性)
  - [网站优化](#网站优化)

# Jonas HTML&CSS Courses

## CHEATSHEET

### FLEXBOX

![image-20200902153449234](.\images\image-20200902153449234.png)

### GRID

![image-20200910135738552](.\images\image-20200910135738552.png)

## HTML

1. 语义化，header，section，figure（画布）

## CSS

### 计算优先级

#### IMPORTANCE

1. 用户声明的!important
2. 作者声明的!important
3. 作者声明的
4. 用户声明的
5. 浏览器默认的

#### SPECIFICITY

1. 写在 html 中的 style
2. IDs
3. Classes，pseudo-classes、attribute
4. Elements、pseudo-elements

#### SOURCE ORDER

1. 后声明的后加载，永远把自己写的放在最后引用

---

### CSS 单位计算方式

#### 百分比

1. 字体：% \* 父元素的 font-size
2. 长度单位：% \* 父元素的 width

#### em 和 rem（font-based），rem 不支持 ie9 以下版本

1. em(font-size):乘以父元素的 font-size

2. em(length):乘以当前元素的 font-size

3. rem:乘以 root 的 font-size（通常是 16px）

#### vh 和 vw

1. viewport 的 height 和 width

---

### 渲染，The Visual Formatting Model

#### 盒模型

1. 定义的长宽=content+padding+border

#### 盒子的类型：display 属性

1. block：100%父元素宽度，换行，对盒模型生效
2. inline：只占据 content 的空间，不换行，没有高度和宽度，只有水平方向的 padding 和 margin
3. inline-block：只占据 content 的空间，不换行，但对盒模型生效

#### 定位

1. normal flow（正常文档流）：默认布局，position:relative
2. float：
   1. 浮动到父容器或者其他浮动元素的 left 或者 right
   2. text 和 inline 元素会包围 float 的元素
   3. 父容器的高度不再生效，需要 clearfix
3. 绝对定位：position：absolute 和 fixed，使用 top、left 以 relative 的父元素为基准进行定位

#### stacking context，层叠上下文

1. 元素加载的顺序，z-index、tranform 等等

### BEM (Block Element Modifier)

1. block：含有意义的独立组件
2. element：无法表示独立含义，附属于 block
3. modifier：block 或 element 的不同版本

### 冷门选择器整理

1. `selector + selector`:选择紧邻其后的同级元素
2. `selector ~ selector`：选择后面的同级元素，不需要紧邻其后
3. `selector > *`：选择所有的直属子元素
4. input 标签
   - `::-webkit-input-placeholder`：只对 chrome、firefox 有效
   - `:placeholder-shown`：input 的 placeholder 展示的时候
   - `:invalid`：input 校验失败时
5. `:not(:last-child)`：除了最后一个 child，都选中

---

## 响应式布局

### 媒体查询，media queries

1. desktop-first，用 max-width
2. mobile-first，用 min-width

<img src=".\images\image-20200825222207223.png" alt="image-20200825222207223"  />

### responsive images

1. resolution switching：在更小尺寸的设备上缩小图片的分辨率
2. density switching：高清屏或手机设备是低分辨率屏幕的 2 倍 pixel
3. art direction：在更小尺寸的设备上使用不同的图片

## 浏览器兼容性

1. graceful degradation：在 css 中使用@supports：feature query
2. autoprefixer 插件，自动补全 css 文件
3. 在 body 最后引入第三方脚本，在页面加载后加载 js：
   1. respond
   2. html5shiv：让老浏览器可以使用 html5 元素
   3. selectivizr：让 ie678 可以使用伪类

## 网站优化

1. 图片压缩：最大尺寸的 2 倍
2. 压缩大图片，optimizilla
3. 压缩 css、js
4. SEO(search engine optimization)，<meta name="description" content="">
5. html validation
