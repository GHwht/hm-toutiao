<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" label-width="85px">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期 ：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 搜索结果区域 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b>
        条结果
      </div>
      <!-- 文章显示区域 -->
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
              <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
                <div slot="error">
                  <img src="../../assets/images/error.gif" width="100" height="75" alt />
                </div>
              </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">
              草稿
            </el-tag>
            <el-tag v-if="scope.row.status===1">
              待审核
            </el-tag>
            <el-tag v-if="scope.row.status===2" type="success">
              审核通过
            </el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">
              审核失败
            </el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">
              已删除
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.channel_id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.channel_id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div>
        <el-pagination
          style="text-align:center;
          margin-top:20px"
          @current-change="pager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
          background
          layout="prev, pager, next">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交后的筛选条件数据
      reqParams: {
        // 默认数据 '' 与 null 区别
        // 如果是 null 该字段是不会提交给后台的。
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 页面刚加载 页码值
        page: 1,
        // 每一页数据的数量
        per_page: 10
      },
      // 日期数据
      dateValues: [],
      articles: [],
      total: 0
    }
  },
  methods: {
    del (id) {
      this.$confirm('亲 确定要删除这条数据吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    // 编辑方法
    edit (id) {
      this.$router.push(`/publish?${id}`)
    },
    // 确认日期选择器 触发事件 保存时间 并赋值
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 实现筛选功能 给筛选按钮添加事件
    search () {
      this.reqParams.page = 1
      this.getActicle()
    },
    // 获取不同页的数据
    pager (newPage) {
      this.reqParams.page = newPage
      this.getActicle()
    },
    // 发送请求 获取文章数据
    async getActicle () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 发送请求 获取频道数据
    async getChannelOptions () {
      // 使用结构 获得数据
      const { data: { data } } = await this.$http.get('channels')
      // 将获取的数据赋值给channelOptions
      this.channelOptions = data.channels
    }
  },
  created () {
    this.getActicle()
  }
}
</script>

<style lang="less" scoped>
 .el-card {
   margin-bottom: 20px
 }
</style>
