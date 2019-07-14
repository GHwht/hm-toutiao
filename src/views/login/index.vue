<template>
<div class="loign-container">
  <el-card class="login-card">
      <div class="login-logo" style="text-align:center; margin-bottom:20px">
        <img src="../../assets/images/logo_admin.png" alt="">
      </div>
      <el-form style="opacity: 0.72" ref="loginForm" :rules="loginRules" :model="loginForm">
        <el-form-item prop="mobile" style="width:380px">
          <el-input v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code" style="width:100%">
          <el-input style="width:240px" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item class="login-xy">
          <el-checkbox :value="checked">
            <p>
              我已阅读并同意
              <a href="#">用户协议</a>
              和
              <a href="#">隐私条框</a>
            </p>
          </el-checkbox>
        </el-form-item>
        <el-form-item style="width:380px; margin-top:-10px">
          <el-button style="width:380px;" @click="onSubmit" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: true,
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号活动名称', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码必须为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // // 调用组件提供的函数 实现整体效验
      // this.$refs.loginForm.validate(valid => {
      //   // 发送ajax请求
      //   this.$http.post('authorizations', this.loginForm).then((res) => {
      //     console.log(res.data)
      //     // ajax请求 发送成功后 设置token值
      //     window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
      //     // 编程式导航 跳转到首页
      //     this.$router.push('/')
      //   })
      // })
      // 使用 async await 发送请求
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            // 使用await 获取服务器响应的数据
            const res = await this.$http.post('authorizations', this.loginForm)
            // 设置token值
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            // 跳转到首页
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号错误或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .loign-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/1.jpg') no-repeat center/cover;
    .login-card {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(57, 127, 219, 0.37);
      border: none;
      width: 420px;
      height: 340px;
      .login-xy {
        p {
          margin-left: -8px;
          color: #fff;
          a {
            color: rgb(0, 17, 255);
          }
        }
      }
    }
  }
</style>
