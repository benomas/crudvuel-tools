export default (()=>{
  let toExport
  try{
    toExport = require('src/customs/crudvuel/themes/quasar/components/grid-components/CvSimpleFilters')
  }catch(e){

  }
  try{
    toExport = require('crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilters')
  }catch(e){

  }
  try{
    toExport = require('crudvuel-tools/src/components/grid-components/CvSimpleFilters')
  }catch(e){
    console.log('No definition to be loaded')
  }
  return toExport.default
})()
