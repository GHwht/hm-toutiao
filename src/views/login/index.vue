<template>
    <div class="login-container">
        <!-- <el-card class="login-box">
            <- <img src="../../assets/images/timg.jpg" alt=""> -
        </el-card> -->
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
            width: 400px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%)
            // img {
            //     display: block;
            //     width: 200px;
            //     height: 200px;
            // }
        }
    }
</style>
