<template>
    <div class="image-container" v-loading="loading">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <div style="margin-bottom:15px">
                <!-- 添加选择事件  值变化是会触发事件 -->
                <el-radio-group size="small" @change="search" v-model="reqParams.collect">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button size="small" @click="dialogVisible=true" style="float:right" type="success">添加素材</el-button>
            </div>
            <!-- 图片列表 -->
            <ul class="img-list">
                <li v-for="item in images" :key="item.id">
                    <!-- 若是不写死地址 必须把src必须加冒号 作为表达式 -->
                    <img :src="item.url" alt="">
                    <!-- 判断在收藏状态下 不需要小按钮 -->
                    <div class="fot" v-if="!reqParams.collect">
                        <!-- 绑定点击事件 实现是否收藏功能 -->
                        <span @click="toggleFav(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                        <span @click="delImage(item.id)" class="el-icon-delete"></span>
                    </div>
                </li>
            </ul>
            <div style="text-align:center">
                <el-pagination
                    v-if="total>reqParams.per_page"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="pager"
                    background
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!-- 对话框 -->
        <el-dialog
            title="添加素材"
            :visible.sync="dialogVisible"
            width="300px">
            <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="image">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      //   loading加载
      loading: false,
      //   总条数
      total: 1,
      dialogVisible: false,
      imageUrl: null,
      //   设置请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    delImage (id) {
      this.$confirm('亲 确定要删除图片吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    //   切换收藏
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      //   成功
      this.$message.success('操作成功')
      //   把当前的图片的状态改成后台给的状态
      item.is_collected = data.collect
    },
    //   上传成功
    handleAvatarSuccess (res) {
      // 预览2s 上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        //   自动关闭对话框
        this.dialogVisible = false
        // 刷新界面
        this.getImages()
        // 上传完毕 再次打开对话框 是上传按钮
        this.imageUrl = null
      })
    },
    //   实现点击页码功能 点击页码
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    //   搜索功能
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    //   发送请求获取图片素材
    async getImages () {
      // 在发送请求前 开启loading效果
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      //   获取数据成功
      this.images = data.results
      //   发送请求完成后 关闭loading加载
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
    .img-list {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        li {
            width: 180px;
            height: 160px;
            border: 1px dashed #111;
            float: left;
            margin-right: 31px;
            margin-bottom: 20px;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
            .fot {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: rgba(0,0,0,.5);
                color: #fff;
                span {
                    margin: 0 20px;
                    &.red {
                        color: red;
                    }
                }
            }
        }
    }
</style>
