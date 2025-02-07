export default {
  methods: {
    loginConfirm () {
      const token = this.$store.state.user.userInfo.token
      if (!token) {
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此时需要先登录才能操作饿',
            confirmButtonText: '去登陆',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch((e) => {
            // on cancel
            console.log(e)
          })
        return true
      }
      return false
    }
  }
}
