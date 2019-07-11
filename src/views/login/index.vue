<template>
    <div class="login-container">
        <el-card class="login-box">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="ruleForm" :rules="rules" :model="loginForm" >
                <el-form-item prop="mobile">
                    <el-input ref="mobile" type="text" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input class="login-yzk" type="text" v-model="loginForm.code"></el-input>
                    <el-button class="login-yzm" type="primary">发送验证码</el-button>
                </el-form-item>
                <el-form-item class="login-xy">
                    <el-checkbox style="float:left" name="type">
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
    return {
      checked: true,
      loginForm: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 13, message: '长度在 13 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$refs.mobile.focus()
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
            text-align: center;
            background-color: rgba(255, 255, 255, 0.622);
            width: 410px;
            height: 340px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                // position: absolute;
                width: 250px;
                height: 55px;
            };
            .login-yzk {
                width: 230px;
                float: left;
            }
            .login-yzm {
                padding: 12px, 14px;
                float: right;
                width: 116px;
                text-align: center;
            }
            .login-xy {
                color: #999;
                a {
                    color: rgb(8, 169, 243);
                }
            }
        }
    }
</style>
