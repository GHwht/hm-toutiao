<template>
    <div class="login-container">
        <el-card class="login-box">
            <h3>账号登录</h3>
            <div class="login-input">
                用户名: <input type="text"><br><br><br>
                密码: <input type="password">
                <br><br>
                <el-button class="login-btn" size="medium" round>登录</el-button>
            </div>
            <!-- <img src="../../assets/images/timg.jpg" alt=""> -->
        </el-card>
    </div>
</template>

<script>
export default {

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
            background-color: rgba(0, 238, 255, 0.322);
            width: 400px;
            height: 290px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                display: block;
                opacity: 0.5;
                width: 350px;
                height: 250px;
            }
            .login-input {
                opacity: 0.8;
                position: absolute;
                color: rgba(0, 0, 0, 0.623);
                top: 100px;
                left: 70px;
                .login-btn {
                    background-color: skyblue;
                    height: 30px;
                }
            }
        }
    }
</style>
