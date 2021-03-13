const cookieparser = process.server ? require("cookieparser") : undefined

export const state = () => {
  return {
    user: null
  }
}


export const mutations = {
  setUser(state, data) {
    state.user = data
  }

}

export const actions = {

  // 这是一个特殊的action方法 会在服务端渲染期间自动调用
  // 作用是初始化容器数据 传递给客户端调动
  nuxtServerInit({ commit }, { req }) {
    let user = null

    if (req.headers.cookie) {
      // 把cookie字符串转换成javaScript对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (error) {

      }
    }

    commit("setUser", user)

  }

}