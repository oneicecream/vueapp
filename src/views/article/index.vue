<template>
  <div class="article-wrap">
    <van-nav-bar
      title="黑马头条"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <h2 class="article-title">{{ article.title }}</h2>
    <AuthInfo class="auto-info" :article="article" />
    <div class="article-content" v-html="article.content">
    </div>
    <MoreAction :article="article" />
    <!-- <RecommendArticle /> -->
    <!-- <RecommendSearch /> -->
    <CommentList
      :source="articleId"
      @is-replylist-show="handelIsReplyListShow"/>
    <!-- 回复列表组件 -->
    <ReplyList
      v-model="isReplyListShow"
      :comment-id="commentId"
      :article-id="articleId"
    />
    <!-- /回复列表组件 -->
    <WriteComment :target="articleId" />
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import CommentList from './components/comment-list'
import MoreAction from './components/more-action'
// import RecommendArticle from './components/recommend-article'
// import RecommendSearch from './components/recommend-search'
import ReplyList from './components/reply-list'
import WriteComment from './components/write-comment'
import { getArticleDetail } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    CommentList,
    MoreAction,
    // RecommendArticle,
    // RecommendSearch,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      article: {},
      isReplyListShow: false, // 控制回复组件的显示状态
      commentId: null // 点击回复的评论 id
    }
  },

  // 当你出现要在某个后代组件中访问组件成员的时候，那么可以使用依赖注入的方式
  // 使用方式：
  // 1. 在组件中声明 provide 向后台提供数据
  // 2. 然后在后代组件中使用 inject 声明接收祖先组件提供的数据
  provide: function () {
    return {
      articleId: this.$route.params.articleId
    }
  },

  computed: {
    articleId () {
      return this.$route.params.articleId.toString()
    }
  },

  created () {
    this.loadArticleDetail()
  },

  methods: {
    async loadArticleDetail () {
      try {
        const data = await getArticleDetail(this.$route.params.articleId)
        this.article = data
      } catch (err) {
        console.log(err)
      }
    },

    handelIsReplyListShow (id) {
      this.commentId = id
      this.isReplyListShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  padding: 20px;
  .article-title {
    font-size: 50px;
    font-weight: 400;
  }
  .article-content {
    font-size: 24px;
  }
  .auth-info {
    position: sticky;
    top: 0;
    background: #fff;
  }
}
</style>
