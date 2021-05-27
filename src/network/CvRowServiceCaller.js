export default class CvRowServiceBuilder {
  constructor () {
    this.id       = null
    this.params   = null
    this.url      = null
    this.qString  = null
    this.endPoint = null
  }

// [Specific Logic]
  call() {
    return this.getEndPoint()(
      this.getId(),
      this.getParams(),
      this.getUrl(),
      this.getQString(),
    )
  }
// [End Specific Logic]
// [Getters]
  getId () {
    return this.id
  }

  getParams () {
    return this.params
  }

  getUrl () {
    return this.url
  }

  getQString () {
    return this.qString
  }

  getEndPoint () {
    return this.endPoint
  }
// [End Getters]
// [Setters]
  setId (id=null) {
    this.id = id

    return this
  }

  setParams (params=null) {
    this.params = params

    return this
  }

  setUrl (url=null) {
    this.url = url

    return this
  }

  setQString (qString=null) {
    this.qString = qString

    return this
  }

  setEndPoint (endPoint=null) {
    this.endPoint = endPoint

    return this
  }
// [End Setters]
}
