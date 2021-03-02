# Production-Grade Vue

## github

https://github.com/bencodezen/production-grade-vue

## Best Practices

1. v-bind 和 v-on 太多时，可以用对象和解构

```html
<Comp v-bind="vmsProps" v-on="vmsEvents" />
```

2. 相比<style scoped>更推荐<style module>
