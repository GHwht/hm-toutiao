<template>
    <div class="login-container">
        <el-card class="login-box">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="ruleForm" :status-icon="true" :rules="rules" :model="loginForm" >
                <el-form-item prop="mobile">
                    <el-input ref="mobile" type="text" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="code" style="margin-bottom:16px">
                    <el-input style="width:240px" type="text" v-model="loginForm.code"></el-input>
                    <el-button class="login-yzm" style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item class="login-xy">
                    <el-checkbox :value="true" style="float:left" name="type">
                    <p>
                        我已阅读并同意
                        <a href="#">用户协议</a>
                        和
                        <a href="#">隐私条框</a>
                    </p>
                    </el-checkbox>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button style="width:100%" @click="submitForm('ruleForm')" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑   把value拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$refs.mobile.focus()
    console.log(this.checked)
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
              console.log(res)
              console.log(this.loginForm)
              // 编程式导航
              this.$router.push('/')
            })
            .catch(() => {
              console.log('登录失败')
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    },
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
    .login-container{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        // 在容器里全屏显示  背景图定位 / 背景图尺寸 必须连写 在
        background: url(../../assets/images/1.jpg) no-repeat center /cover;
        .login-box {
            position: relative;
            // opacity: 0.2;
            border: transparent;
            // text-align: center;
            background-color: rgba(255, 255, 255, 0.622);
            width: 410px;
            height: 340px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                display: block;
                width: 250px;
                height: 55px;
                margin: 15px auto;
                margin-top: 0px;
            };
            .login-yzk {
                width: 230px;
                float: left;
            }
            .login-yzm {
                padding: 12px, 14px;
                float: right;
                text-align: center;
            }
            .login-xy {
                color: #999;
                a {
                    color: rgb(8, 169, 243);
                }
                p {
                  color: #999;
                }
            }
        }
    }
</style>
