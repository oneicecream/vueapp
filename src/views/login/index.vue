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
          v-validate="'required'"
          name='mobile'
          :error-message="errors.first('mobile')"
        />

        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          v-validate="'required'"
          name='code'
          :error-message="errors.first('code')"
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
        code: '246810'
      },
      loginLoading: false, // 控制登录按钮的 loading 状态
      myErrors: {
        mobile: '',
        code: ''
      }
    }
  },

  created () {
    this.configFormErrorMessages()
  },

  methods: {
    async handleLogin () {
      try {
        // 调用JS触发验证
        const valid = await this.$validator.validate()

        // 如果校验失败，则停止后续代码执行
        if (!valid) {
          return
        }

        // 表单验证通过，发送请求，loading 加载
        this.loginLoading = true

        const data = await login(this.user)

        this.$store.commit('setUser', data)
        // 这里先简单粗暴的跳转到首页
        // 真实的业务要处理成跳转到之前过来的页面
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$toast('登录失败')
      }
      this.loginLoading = false
    },
    configFormErrorMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
            // mobile: '请输入一个有效的手机号'
          },
          code: {
            required: '密码不能为空'
            // code: '请输入一个有效的密码'
          }
        }
      }
      // 如果需要错误消息提示全局生效
      // Validator.localize('en', dict)

      // 组建中这样注册生效
      // or use the instance method
      this.$validator.localize('zh-CN', dict)
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
