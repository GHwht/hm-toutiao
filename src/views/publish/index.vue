<template>
  <div class='publish-container'>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>{{articleId ? '修改' : '发布'}}文章</my-bread>
      </div>
      <!-- 主体 -->
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题 :" style="width:500px">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容 :">
          <!-- 使用富文本编辑器 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面 :">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-form-item v-if="articleForm.cover.type==1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </el-form-item>
          <el-form-item v-if="articleForm.cover.type==3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </el-form-item>
        </el-form-item>
        <el-form-item label="频道 :">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId" size="small">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(false)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else size="small">
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(false)">修改草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  // 注册
  components: { quillEditor },
  data () {
    return {
      // 富文本编辑器的配置选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 发表文章需要的数据
      articleForm: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      articleId: null
    }
  },
  methods: {
    // 实现发表功能 或存入草稿功能
    async publish (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // draft为true 为存入草稿成功  draft为false 显示发表成功
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      // 发表成功后 跳转到内容管理
      this.$router.push('/article')
    },
    // 获取当前要修改的数据
    async getArticles () {
      this.articleId = this.$route.query.id
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}?`)
      console.log(this.articleId)
      // 将数据赋值
      this.articleForm = data
    },
    // 实现修改功能
    async edit (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success('修改成功')
      this.$router.push('/article')
    }
  },
  created () {
    // 获取id值
    this.articleId = this.$route.query.id
    // 判断是否有id 有id值 说明是修改状态 调用获取文章数据的方法
    if (this.articleId) {
      this.getArticles()
    }
  },
  watch: {
    // 监听$route $route变化触发watch事件
    $route () {
      // 判断是否有id值
      if (!this.$route.query.id) {
        // 没有id值 清空数据
        this.articleId = null
        this.articleForm = {
          title: '',
          content: '',
          channel_id: null,
          cover: {
            type: 1,
            images: []
          }
        }
      } else {
        // 有id值 调用获取文章数据 实现后退功能
        this.getArticles()
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .my-image {
    display: inline-block;
  }
</style>
