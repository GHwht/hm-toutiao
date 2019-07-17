<template>
    <el-select :value="value" @change="fn">
        <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id ">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      // 多重解构获取数据
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) {
      this.$emit('input', value)
    }
  },
  created () {
    this.getChannelOptions()
  }

}
</script>

<style>

</style>
