import cvDinDep from 'crudvuel-tools/src/cvDinDep'
import CvEnv    from 'crudvuel-tools/src/CvEnv'

export default class CvPassport {
  constructor (globals = null) {
    this.cvDinDep = cvDinDep
    this.cvEnv    = this.cvDinDep('CvEnv',globals) || new CvEnv()
    this.enabled  = this.cvEnv.isPassportEnabled()
    this.loadTokens()
  }

  loadTokens () {
    if (!this.enabled)
      return this
    this.accessToken  = JSON.parse(localStorage.getItem('accessToken') || 'null')
    this.refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null')
    return this
  }

  setAccessToken (accessToken = null) {
    if (!this.enabled)
      return this
    this.accessToken = accessToken != null ? `Bearer ${accessToken}` : null
    if (this.accessToken)
      localStorage.setItem('accessToken', JSON.stringify(this.accessToken))
    else
      localStorage.removeItem('accessToken')
    return this
  }

  destroyAutentication () {
    this.setAccessToken().setRefreshToken()
  }

  setRefreshToken (refreshToken = null) {
    if (!this.enabled)
      return this
    this.refreshToken = refreshToken != null ? `Bearer ${refreshToken}` : null
    if (this.refreshToken)
      localStorage.setItem('refreshToken', JSON.stringify(this.refreshToken))
    else
      localStorage.removeItem('refreshToken')
    return this
  }

  autenticated () {
    if (!this.enabled)
      return true
    this.loadTokens()
    return this.accessToken != null
  }

  injectHeaders (headers = null) {
    if (!this.enabled)
      return headers
    return {...headers,...{Authorization:this.accessToken}}
  }

  reactToResponse (response = null) {
    if (!this.enabled)
      return this
    if (response != null && response.response != null && response.response.status != null && response.response.status === 401)
      return this.setAccessToken().setRefreshToken()
    if (response != null && response.data != null && response.data.token_type != null && response.data.token_type==='Bearer') {
      if (response.data.access_token != null)
        this.setAccessToken(response.data.access_token)
      else
        this.setAccessToken()
      if (response.data.refresh_token != null)
        this.setRefreshToken(response.data.refresh_token)
      else
        this.setRefreshToken()
    }
    return this
  }
}
