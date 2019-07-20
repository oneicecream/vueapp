<template>
  <div>
    <UnLogin v-if="!$store.state.user"/>
    <UserInfo v-else/>
    <app-tabbar></app-tabbar>
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'

export default {
  name: 'MyIndex',
  components: {
    UnLogin,
    UserInfo
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
