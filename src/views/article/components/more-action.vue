<template>
  <div class="more-action">
    <van-button
      icon="star-o"
      round
      type="default"
      @click="handleLike"
    >点赞</van-button>
    <van-button
      icon="delete"
      round
      type="default"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle } from '@/api/article'
export default {
  name: 'MoreAction',
  props: {
    article: Object,
    default: () => {}
  },
  data () {
    return {

    }
  },
  created () {},
  methods: {
    async handleLike () {
      try {
        const articleId = this.article.art_id
        // 如果已赞，则取消点赞
        if (this.article.attitude === 1) {
          await unLikeArticle(articleId)
        } else {
          // 如果没有赞，则赞
          await likeArticle(articleId)
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
