<template>
  <div class='MyImg-container'>
    <!-- 注册点击事件 点击打开对话框 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value || defaultImage" alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog
    :visible.sync="dialogVisible"
    width="750px"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户管理" name="image">
          <el-radio-group v-model="reqParams.collect" @change="search" size="small">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片素材列表 -->
          <ul style="overflow:hidden; padding-left:0px">
            <li v-for="item in images" :key="item.id" class="img-list" :class="{selected:selectedImageUrl==item.url}" @click="selectedImage(item.url)">
              <img :src="item.url" alt="">
            </li>
          </ul>
          <!-- 分页 -->
          <div style="text-align:center">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="reqParams.page"
              :page-size="reqParams.per_page"
              @current-change="pager"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="upload">
          <!-- 需要配置头部信息  还需要改变数据格式 默认是file -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess">
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 配置头部信息
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      },
      // 请求图片素材需要的数据
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 判断对话框是否激活
      dialogVisible: false,
      // 单选择器的默认为全部还是收藏
      activeName: 'image',
      // 上传图片后会显示图片 是图片预览的地址
      uploadImageUrl: null,
      // 点击图片素材库中图片时 当前图片的地址
      selectedImageUrl: null,
      // 图片素材列表数据
      images: [],
      // 图片总条数
      total: 0,
      // 接受父组件传来的数据
      // 如果父组件传入的数据为空 图片按钮默认显示的图片
      defaultImage
    }
  },
  // props 并不是在data中 定义的数据 而是配置项 是和data同级的
  props: ['value'],
  methods: {
    confirmImage () {
      // 判断是选择图片 还是上传图片
      if (this.activeName === 'image') {
        // 判断this.selectedImageUrl 是否为空 不存在则提醒选择图片
        if (!this.selectedImageUrl) { return this.$message.warning('请选择图片') }
        // 和父组件交互
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 如果是上传图片 判断this.uploadImageUrl地址是否为空 为空提示上传图片
        if (!this.uploadImageUrl) { return this.$message.warning('请上传图片') }
        this.$emit('input', this.uploadImageUrl)
      }
      // 点击确定后 管理对话框
      this.dialogVisible = false
    },
    // 上传图片成功后 执行的函数
    handleSuccess (res) {
      // // 上传成功后 显示上传成功的显示信息
      // this.$message.success('上传成功')
      // // 将图片地址复制给this.uploadImageUrl
      // this.uploadImageUrl = url
      // this.value = url
      this.uploadImageUrl = res.data.url
      console.log(res)
    },
    // 实现 点击图片出现对勾的功能
    selectedImage (url) {
      this.selectedImageUrl = url
      console.log(this.selectedImageUrl)
    },
    // 实现 显示全部图片还是收藏图片
    search () {
      // 不用重新赋值 this.reqParams.collect 因为数据用v-model绑定 点击时就已经切换了布尔值 所以直接调用搜索方法就可以
      // 搜索前跳转到第一页
      this.reqParams.page = 1
      this.getImages()
    },
    // 点击页码切换数据
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 点击图片按钮 加载图片素材列表
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      // 发送请求 获取数据
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
  .MyImg-container {
    display: inline-block;
    margin-right: 10px;
  }
  .img-list {
    position: relative;
    float: left;
    list-style: none;
    width: 153px;
    height: 130px;
    margin-right: 30px;
    margin-bottom: 20px;
    &.selected {
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4) url(../assets/images/selected.png) no-repeat center/50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;

    }
  }
  .img-list:nth-child(4n) {
    margin-right: 0px;
  }
  .img-btn {
    width: 150px;
    height: 130px;
    border: 1px dashed #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
