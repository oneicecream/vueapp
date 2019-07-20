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
      <van-cell title="头像" is-link @click="handleShowFile" >
        <div slot="default">
          <img style="width: 30px" :src="user.photo" alt="">
        </div>
        <input ref="file" style="display: none;" type="file">
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfilePhoto
} from '@/api/user'

export default {
  name: 'UserSettings',
  data () {
    return {
      user: {}
    }
  },

  computed: {
    file () {
      return this.$refs['file']
    }
  },

  created () {
    this.loadUser()
  },

  mounted () {
    this.file.addEventListener('change', this.handleFileChange)
  },

  methods: {
    handleFileChange () {
      const file = this.file.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.user.photo = reader.result
      })
    },

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
        let r1 = Promise.resolve()

        // 1.请求上传图片
        if (this.file.files[0]) {
          r1 = this.uploadPhoto()
        }

        // 2.请求更新用户信息
        const r2 = updateUserProfile({
          name: this.user.name,
          gender: this.user.gender,
          birthday: this.user.birthday
        })

        await Promise.all([r1, r2])

        this.$toast('更新成功')
      } catch (err) {
        this.$toast.fail('更新用户信息失败')
      }
    },

    uploadPhoto () {
      // 《接口要求 Content-Type 为 multipart/form-data 的处理》
      const formData = new FormData()
      formData.append('photo', this.file.files[0])
      return updateUserProfilePhoto(formData)
    },

    uploadUserProfile () {

    },

    handleShowFile () {
      this.file.click()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
