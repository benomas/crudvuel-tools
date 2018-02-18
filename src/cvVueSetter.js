//use this function to extend other javascript clases, it is not necesary into the vue context
export default function(vueSet,target,source){
  if(typeof vueSet==="undefined" || typeof target==="undefined" || typeof propertys==="undefined")
    return false;
  let sourceKeys = Object.keys(source)
  if(sourceKeys && sourceKeys.length)
    for(let i=0; i< sourceKeys.length; i++)
      vueSet.set(target, sourceKeys[i], source[sourceKeys[i]])
};