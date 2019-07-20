<template>
  <div class='comment-container'>
      <el-card>
        <div slot="header">
            <my-bread>评论管理</my-bread>
        </div>
        <el-table :data="comments" style="width: 100%">
            <el-table-column label="标题" prop="title" width="400">
            </el-table-column>
            <el-table-column label="总评论数" prop="total_comment_count">
            </el-table-column>
            <el-table-column label="粉丝评论数" prop="fans_comment_count">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.comment_status? '正常':'关闭'}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
                    <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align:center; margin-top:20px">
            <el-pagination
                background
                :current-page="reqParams.page"
                :page-size="reqParams.per_page"
                @current-change="pager"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取数据传入的参数
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      //   评论数据
      comments: [],
      //   评论总条数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    //   分页功能
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    //   实现打开和关闭评论功能
    toggleStatus (row) {
      const text1 = '您确定要打开该文章的评论的功能吗?'
      const text2 = '您确定要关闭评论功能吗?'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, {
          // body传参 文章状态取反
          allow_comment: !row.comment_status
        })
        row.comment_status = data.allow_comment
        if (row.comment_status) { this.$message.success('开启成功') }
        if (!row.comment_status) { this.$message.warning('关闭成功') }
      }).catch(() => {})
    },
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>

</style>
