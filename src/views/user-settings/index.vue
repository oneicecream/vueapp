<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleSave"
    />
    <van-cell-group>
      <van-cell title="头像" is-link >
        <div slot="default">
          <img style="width: 30px" :src="user.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'

export default {
  name: 'UserSettings',
  data () {
    return {
      user: {}
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    async loadUser () {
      try {
        const data = await getUserProfile()
        this.user = data
      } catch (err) {
        this.$toast.fail('加载用户信息失败')
      }
    },

    async handleSave () {
      try {
        const data = await updateUserProfile({
          name: '就叫这个啦'
        })
        console.log(data)
      } catch (err) {
        this.$toast.fail('更新用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
