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
    <RecommendArticle />
    <RecommendSearch />
    <CommentList />
    <ReplyList />
    <WriteComment />
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import CommentList from './components/comment-list'
import MoreAction from './components/more-action'
import RecommendArticle from './components/recommend-article'
import RecommendSearch from './components/recommend-search'
import ReplyList from './components/reply-list'
import WriteComment from './components/write-comment'
import { getArticleDetail } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    CommentList,
    MoreAction,
    RecommendArticle,
    RecommendSearch,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      article: {}
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
