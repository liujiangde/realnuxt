<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ?  'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <!-- <a href="">Have an account?</a> -->
          <nuxt-link v-if="isLogin" to = "/register">need an account?</nuxt-link>
          <nuxt-link v-else to= '/login'>Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
            {{ error }}
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input v-model="user.username" class="form-control form-control-lg"  type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" required type="email"   v-model="user.email" placeholder="email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" required  type="password" v-model="user.password"  placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ?  'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>

import { login,register } from "@/api/user.js"

// 仅在客户端加载js-Cookie
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // 在路由匹配组件渲染之前会执行中间件处理
  middleware: 'Notauthenticated',
  name: 'loginpage',
  computed: {
    isLogin(){
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      error: ""
    }
  },
  // 13579@163.com 13579qwer
  methods:{
    async onSubmit() {
      try {
        
        const   data   = this.isLogin ? await login({
        user: this.user
      }) : await register({
        user: this.user
      })
      
      console.log(data.data)
      this.$store.commit('setUser', data.data.user)
      Cookie.set('user',data.data.user)
      this.$router.push('/home')
      // console.log( this.$route )
      } catch (error) {
        // console.log(error)
        console.dir(error)
        this.error = error
      }

      
    }
  }



}
</script>

<style>

</style>