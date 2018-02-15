export default {
  update: function (el,binding) {
  	if(binding.value!==binding.oldValue){
  		if(binding.value===true)
  			el.classList.add("in-progress-cursor")
  		else
  			el.classList.remove("in-progress-cursor")
  	}
  }
}