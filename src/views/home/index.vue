<template>
    <el-container class="home-container">

        <!-- 侧边栏 -->
        <el-aside :width="collapse?'80px':'200px'" class="home-aside">
            <div style="text-align:center" class="home-logo" :class="{close:collapse}"></div>
             <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#002033"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="border-right:none"
                :collapse="collapse"
                :collapse-transition=false
                router
            >
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>

            <!-- 头部 -->
            <el-header class="home-herder">
                <span @click="toggleMenu" style="font-size: 24px; vertical-align: middle;" class="el-icon-s-fold"></span>
                <b style="font-size: 16px; vertical-align: middle; margin-left:4px">江苏传智播客科技教育有限公司</b>

                <el-dropdown style="float:right" trigger="click">
                    <span class="el-dropdown-link">
                        <img style="vertical-align: middle;" width="45px" height="35px" :src="avatar" alt="">
                        <b style="margin-left:10px">{{name}}</b>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
                        <!-- 因为用的组件 本标签不存在 所以事件没有绑定上 所以需要加 .nativu 给原生的标签绑定事件 -->
                        <el-dropdown-item @click.native="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <!-- 主体内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('hm-toutiao')
      this.$router.push('/login')
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
    this.avatar = user.photo
    this.name = user.name
  }
}
</script>

<style lang="less" scoped>
    .home-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .home-aside {
            background: #002033;
            .home-logo {
                width: 100%;
                height: 60px;
                background: url('../../assets/images/logo_admin.png') no-repeat center/ auto;
            }
            .close {
                background: url('../../assets/images/logo_admin_01.png') no-repeat center ;
                background-size: 34px
            }
        }
        .home-herder {
            border-bottom: 1px solid #999;
            line-height: 60px;
            vertical-align: middle;
            color: #444;
        }
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>
