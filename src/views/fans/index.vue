<template>
  <div class='fans-container'>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 粉丝列表 -->
          <div class="fans-item" v-for="item in fans" :key="item.id">
            <!-- Avatar头像 -->
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p>{{item.name}}</p>
            <el-button size="mini" plain type="primary">关注</el-button>
          </div>
          <!-- 分页功能 -->
          <div style="text-align:center">
            <el-pagination
              v-if="total>reqParams.per_page"
              :current-page="reqParams.page"
              :page-size="reqParams.per_page"
              @current-change="pager"
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝爱好" name="photo">
          <div ref="bar" style="width:600px; height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 引入echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      // 发送请求需要的参数
      reqParams: {
        page: 1,
        per_page: 20
      },
      // 粉丝列表数据
      fans: [],
      // ,判断显示默认显示是列表
      activeName: 'list',
      total: 0
    }
  },
  methods: {
    myecharts () {
      // 获取要操作的dom对象
      const dom = this.$refs.bar
      const myEcharts = echarts.init(dom)
      // 配置echarts
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myEcharts.setOption(option)
    },
    // 实现分页功能
    pager (newPage) {
      // 将当前页面的值赋值
      this.reqParams.page = newPage
      this.getFans()
    },
    // 创建获取粉丝信息的方法
    async getFans () {
      // 发送请求 获取数据
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      console.log(data)
      this.fans = data.results
      // 给总页数赋值
      this.total = data.total_count
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    this.myecharts()
  }
}
</script>

<style scoped lang='less'>
  .fans-item {
    display: inline-block;
    width: 156px;
    height: 190px;
    text-align: center;
    margin-right: 26px;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px dashed #ddd;
  }
  .fans-item:nth-child(6n) {
    margin-right: 0px;
  }
</style>
