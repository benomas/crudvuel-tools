import cvSerialize   from './cvSerialize'
const CvParametrizer = function(paginate){
  this.params = {
    paginate     :{
          selectQuery  :[],
          page         :1,
          byColumn     :0,
          limit        :10,
          orderBy      :"id",
          ascending    :1,
          filterQuery  :{},
          generalSearch:"",
        }
  }

  this.getParameter=function(parameter){
    if(typeof this.params.paginate[parameter]!=="undefined")
      return this.params.paginate[parameter]
    return null
  }

  this.getSelectQuery=function(){
    return this.getParameter("selectQuery")
  }

  this.getPage=function(){
    return this.getParameter("page")
  }

  this.getByColumn=function(){
    return this.getParameter("byColumn")
  }

  this.getLimit=function(){
    return this.getParameter("limit")
  }

  this.getOrderBy=function(){
    return this.getParameter("orderBy")
  }

  this.getAscending=function(){
    return this.getParameter("ascending")
  }

  this.getFilterQuery=function(){
    return this.getParameter("filterQuery")
  }

  this.getGeneralSearch=function(){
    return this.getParameter("generalSearch")
  }

  this.getPaginate=function(){
    return this.params.paginate
  }

  this.getParameters=function(){
    return this.params
  }

  this.getSerialized=function(){
    return this.serialize(this.params,false)
  }

  this.setParameter=function(parameter,value){
    if(typeof this.params.paginate[parameter]!=="undefined")
      this.params.paginate[parameter]=value
  }

  this.setPage=function(value){
    if(typeof value !=="undefined")
      this.setParameter("page",value)
  }

  this.setByColumn=function(value){
    if(typeof value !=="undefined")
      this.setParameter("byColumn",value)
  }

  this.setLimit=function(value){
    if(typeof value !=="undefined")
      this.setParameter("limit",value)
  }

  this.setOrderBy=function(value){
    if(typeof value !=="undefined")
      this.setParameter("orderBy",value)
  }

  this.setAscending=function(value){
    if(typeof value !=="undefined")
      this.setParameter("ascending",value)
  }

  this.setFilterQuery=function(value){
    if(typeof value !=="undefined")
      this.setParameter("filterQuery",value)
  }

  this.setSelectQuery=function(value){
    if(typeof value !=="undefined")
      this.setParameter("selectQuery",value)
  }

  this.pushFilter=function(property,value){
    if(typeof property !=="undefined" && typeof value !=="undefined")
      this.params.paginate.filterQuery[property]=value
  }

  this.pushSelect=function(value){
    if(typeof value !=="undefined")
            this.params.paginate.selectQuery.push(value)
  }

  this.setGeneralSearch=function(value){
    if(typeof value !=="undefined")
      this.setParameter("generalSearch",value)
  }

  this.setPaginate=function(paginate){
    if(typeof paginate !=="undefined")
    this.params.paginate = paginate
  }

  this.serialize=cvSerialize

  if(typeof paginate !=="undefined")
    this.params.paginate=paginate
}

export default CvParametrizer
