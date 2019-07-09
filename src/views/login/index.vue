<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="标题"
    />
    <!-- /头部 -->
    <!-- 表单 -->
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errors.mobile"
        />

        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error-message="errors.code"
          required
        />
      </van-cell-group>
      <div class="login-btn-box">
        <van-button type="info" :loading="loginLoading" class="login-btn" @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
    <!-- /表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: { // 提交登录的表单数据
        mobile: '15886761501',
        code: '123456'
      },
      loginLoading: false, // 控制登录按钮的 loading 状态
      errors: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const { mobile, code } = this.user
        const errors = this.errors

        if (mobile.length) {
          errors.mobile = ''
        } else {
          errors.mobile = '手机号不能为空'
          return
        }

        if (code.length) {
          errors.mobile = ''
        } else {
          errors.code = '验证码不能为空'
          return
        }

        this.loginLoading = true

        const data = await login(this.user)
        this.$store.commit('setUser', data)
        // 这里先简单粗暴的跳转到首页
        // 真实的业务要处理成跳转到之前过来的页面
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log('err')
        console.log('登录失败')
      }
      this.loginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-box {
  padding: 15px;
  .login-btn {
    width: 100%;
  }
}
</style>
