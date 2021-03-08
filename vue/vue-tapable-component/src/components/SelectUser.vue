<template>
  <div>
    <ul>
      <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
    </ul>
    <button @click="query">条件查询</button>
    <button @click="saveSchema">保存自定义方案</button>
  </div>
</template>
<script>
import {
  SyncWaterfallHook,
  AsyncParallelHook,
  AsyncParallelBailHook
} from 'tapable'

export default {
  props: {
    plugins: Array
  },
  data() {
    return {
      config: {},
      userList: [],
      hooks: {
        getConfig: new SyncWaterfallHook(['config']),
        fetchUser: new AsyncParallelHook(['query', 'userList']),
        saveSchema: new AsyncParallelBailHook(['user', 'schema'])
      }
    }
  },
  async created() {
    this.plugins.forEach(plugin => plugin.apply(this))

    // 获取配置
    this.config = this.hooks.getConfig.call(this.config)
    console.log('config', this.config)

    // 获取用户信息
    await this.hooks.fetchUser.promise(null, this.userList)
    console.log('userList', this.userList)
  },
  methods: {
    async query() {
      await this.hooks.fetchUser.promise('admin', this.userList)
      console.log('userList', this.userList)
    },
    async saveSchema() {
      const res = await this.hooks.saveSchema.promise('admin', [
        { name: 'loseway', id: 6 }
      ])
      console.log('saveSchema', res)
    }
  }
}
</script>
