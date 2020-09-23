# OUTLINE

1. 基本概念，定义grid布局有几行几列、设置某个cell的位置
2. 定义cell位置的三种方式
   1. 通过 line numbers
   2. 通过 line names
   3. 通过 grid area names
3. 定位
   1. Explicit vs Implicit
   2. align items
   3. align tracks
4. 容纳内容的方式
   1. 都会努力容纳所有的内容，但max-content不换行，min-content会取最宽的一个子元素尽可能地换行
   2. minmax()
   3. auto-fill、auto-fit