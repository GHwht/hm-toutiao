<template>
  <div class='setting-container'>
      <el-card>
        <div slot="header">
            <my-bread>个人设置</my-bread>
        </div>
        <!-- 栅格布局 一行24栏 -->
        <el-row>
            <!-- 分成2列 一列12栏 -->
            <el-col :span="12">
                <!-- 表单 -->
                <el-form :model="userForm" label-width="120px">
                    <el-form-item label="编号 :">{{userForm.id}}</el-form-item>
                    <el-form-item label="手机 :">{{userForm.mobile}}</el-form-item>
                    <el-form-item label="媒体名称 :">
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍 :">
                        <el-input type="textarea" v-model="userForm.intro" :row="3"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱 :">
                        <el-input v-model="userForm.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12" style="text-align:center">
                <!-- 上传头像 -->
                <!-- el-upload 默认的上传方式是post 看文档可知 需要覆盖默认请求行为
                action name :header :on-success 这些都是配置默认行为的 所以需要删掉
                -->
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="myUpload"
                    :show-file-list="false"
                    >
                    <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p style="font-size:15px">修改头像</p>
            </el-col>
        </el-row>
      </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 请求数据是需要传入的参数
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      },
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (data) {
    //   console.log(data)
    // 实例化一个对象
      const formData = new FormData()
      //   将图片添加到实例对象中
      formData.append('photo', data.file)
      //   发送请求后台 修改头像
      this.$http.patch('user/photo', formData).then((res) => {
        //   上传图片成功
        const photoUrl = res.data.data.photo
        // 1. 更新home组件的头像
        eventBus.$emit('updateHeaderPhoto', photoUrl)
        // 上传后图片后 预览图片
        this.userForm.photo = photoUrl
        // 2. 更新本地存储的头像
        // 获取本地数据
        const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
        // 重新赋值
        userInfo.photo = photoUrl
        // 重新设置本地信息
        window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
        this.$message.success('修改头像成功')
      })
    },
    //   el-upload默认行为的方法 无用
    // handleSuccess (res) {
    //   console.log('fgafda')
    // },
    //   获取当前登录的用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      //   将数据赋值
      this.userForm = data
      console.log(data)
      //   const photoUrl = data.photo
      //   如果是公共的账号 有可能别人修改用户信息 本地没有立即刷新  实现点击刷新页面 刷新出别人修改的用户信息
      // 更新home组件的用户信息
      eventBus.$emit('updateHeader', data)
      // 2. 更新本地存储的头像
      // 获取本地数据
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
      // 重新赋值本地用户信息
      userInfo.photo = data.photo
      userInfo.name = data.name
      // 重新设置本地信息
      window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
    },
    // 点击修改信息触发的回调函数
    async updateUserInfo () {
      // 发送请求 修改信息
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      //   提示修改成功
      this.$message.success('修改用户信息成功')
      // 1. 修改home组件中的用户信息(把当前修改的用户信息发给home,让home修改用户信息)
      eventBus.$emit('updateHeaderName', this.userForm.name)
      //   2. 更新本地存储的用户信息
      //   取出本地信息
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
      //   给数据重新赋值
      userInfo.name = data.name
      //   重新设置本地信息
      window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
    }
  }
}
</script>

<style scoped lang='less'>

</style>
