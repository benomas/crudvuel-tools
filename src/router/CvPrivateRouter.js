import CvBaseRouter     from 'src/router/CvBaseRouter'

export default class CvPrivateRouter extends CvBaseRouter {
  async guard (to, from, next) {
    if (!this.mGetStCvPassport().autenticated())
      return this.noAutenticated(to, from, next)

    let state = this.loadAndValidateUser(to, from, next)

    if (state !== this.UNDETERMINED)
      return state

    await this.mStReloadUserData()
    state = this.loadAndValidateUser(to, from, next)

    if (state !== this.UNDETERMINED)
      return state

    return this.noAutenticated(to, from, next)
  }
}
