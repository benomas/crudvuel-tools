import cvSerialize   from './cvSerialize'
const CvParametrizer = function (paginate) {
  this.params = {
    paginate: {
      selectQuery  : [],
      page         : 1,
      byColumn     : 0,
      limit        : 10,
      orderBy      : 'id',
      ascending    : 1,
      filterQuery  : {},
      searchMode   : 'cv-simple-paginator',
      searchObject : ''
    }
  }

  this.getParameter = function (parameter) {
    if (this.params.paginate[parameter] !== undefined)
      return this.params.paginate[parameter]
    return null
  }

  this.getSelectQuery = function () {
    return this.getParameter('selectQuery')
  }

  this.getPage = function () {
    return this.getParameter('page')
  }

  this.getByColumn = function () {
    return this.getParameter('byColumn')
  }

  this.getLimit = function () {
    return this.getParameter('limit')
  }

  this.getOrderBy = function () {
    return this.getParameter('orderBy')
  }

  this.getAscending = function () {
    return this.getParameter('ascending')
  }

  this.getFilterQuery = function () {
    return this.getParameter('filterQuery')
  }

  this.getSearchMode = function () {
    return this.getParameter('searchMode')
  }

  this.getSearchObject = function () {
    return this.getParameter('searchObject')
  }

  this.getPaginate = function () {
    return this.params.paginate
  }

  this.getParameters = function () {
    return this.params
  }

  this.getSerialized = function (param = null) {
    if (!param)
      param = this.params
    return this.serialize(param,false)
  }

  this.getParams = function () {
    return this.params
  }

  this.setParameter = function (parameter = null,value = null) {
    if (this.params.paginate[parameter] !== undefined)
      this.params.paginate[parameter] = value
    return this
  }

  this.setPage = function (value = null) {
    return this.setParameter('page',value)
  }

  this.setByColumn = function (value = null) {
    return this.setParameter('byColumn',value)
  }

  this.setLimit = function (value = null) {
    return this.setParameter('limit',value)
  }

  this.setOrderBy = function (value = null) {
    return this.setParameter('orderBy',value)
  }

  this.setAscending = function (value = null) {
    return this.setParameter('ascending',value)
  }

  this.setFilterQuery = function (value = {}) {
    return this.setParameter('filterQuery',value)
  }

  this.setSelectQuery = function (value = []) {
    return this.setParameter('selectQuery',value)
  }

  this.pushFilter = function (property,value = '') {
    if (property !== undefined &&  value !== undefined)
      this.params.paginate.filterQuery[property] = value
    return this
  }

  this.pushSelect = function (value = null) {
    this.params.paginate.selectQuery.push(value)
    return this
  }

  this.setSearchMode = function (value = null) {
    return this.setParameter('searchMode',value)
  }

  this.setSearchObject = function (value = null) {
    return this.setParameter('searchObject',value)
  }

  this.setPaginate = function (paginate) {
    if (paginate !== undefined)
      this.params.paginate = paginate
    return this
  }

  this.serialize = cvSerialize

  if (paginate !== undefined)
    this.params.paginate = paginate
}

export default CvParametrizer
