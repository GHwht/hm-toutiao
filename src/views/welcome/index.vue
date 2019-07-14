<template>
    <div class="welcome">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  mounted () {
    this.$http.get('articles').then((res) => {
      console.log(res.data)
    })
  }
}
</script>

<style lang="less">
    .welcome {
        text-align: center;
    }
</style>
