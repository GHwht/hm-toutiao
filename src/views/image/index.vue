<template>
  <div class="image-comtainer">
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 头部 -->
      <div style="margin-bottom:25px">
        <!-- 给单选框按钮添加change事件 值变化触发 -->
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="small" @click="dialogVisible = true" style="float:right" type='success'>添加素材</el-button>
      </div>
      <!-- 图片素材列表 -->
      <div>
        <ul class="img-list">
          <li v-for="item in images" :key="item.id">
            <img :src="item.url" alt="">
            <div class="fot">
              <span class="el-icon-star-off" @click="toggleFav(item)" :class="{red:item.is_collected}"></span>
              <span class="el-icon-delete" @click="del(item)"></span>
            </div>
          </li>
        </ul>
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
          :total="50">
        </el-pagination>
      </div>
    </el-card>
    <!-- 点击添加素材按钮 弹出对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // 判断显示收藏还是全部的依据
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片素材的总条数
      total: 0,
      // 图片的列表
      images: [],
      // 判断是否弹出对话框
      dialogVisible: false,
      // 判断是否显示上传按钮
      imageUrl: false,
      // 设置发送请求的头部信息
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      }
    }
  },
  methods: {
    // 实现点击页码切换数据的功能
    pager (newPage) {
      // 将reqParams中的page重新赋值
      this.reqParams.page = newPage
      // 点击之后 重新刷新数据
      this.getImages()
    },
    // 实现删除图片素材功能
    async del (item) {
      // 发送请求 删除数据
      await this.$http.delete(`user/images/${item.id}`)
      this.$message.success('删除成功')
      this.getImages()
    },
    // 实现收藏和删除收藏功能
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      console.log(data.collect)
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    // 上传成功后 触发的回调函数
    handleSuccess (res) {
      // 预览图片 2s
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 设置定时器 2s 后 关闭对话框
      window.setTimeout(() => {
        // 2s后关闭对话框
        this.dialogVisible = false
        // 关闭对话框后 刷新数据
        this.getImages()
        // 刷新数据后 修改imageUrl的值  下次打开对话框 显示的是上传按钮
        this.imageUrl = null
      }, 2000)
    },
    // 实现 切换显示 收藏或者全部素材
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取图片素材 页面一加载获取
    async getImages () {
      // 发送请求
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 给images赋值
      this.images = data.results
      // console.log(data)
      // 定义总条数
      this.total = data.total_count
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
  .img-list {
    margin: 0;
    padding: 0;
    overflow: hidden;
    li {
      list-style: none;
      float: left;
      margin-right: 36px;
      margin-bottom: 25px;
      width: 180px;
      height: 150px;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .fot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 28px;
        line-height: 30px;
        text-align: center;
        background: rgba(0,0,0,.3);
        color: #fff;
        span {
          display: inline-block;
          margin: 0 20px;
          &.red {
            color: red;
          }
        }
      }
    }
    li:nth-child(5n) {
      margin-right: 0px;
    }
  }
</style>
