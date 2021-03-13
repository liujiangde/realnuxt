/**
 * 
 * @param {验证是否登录的中间件} param0 
 */
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}