<template>
    <el-select :value="value" @change="fn" placeholder="请选择">
        <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'MyChanne',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) {
      this.$emit('input', value)
      console.log(value)
    }
  },
  created () {
    this.getChannelOptions()
  }

}
</script>

<style>

</style>
