
export default class CvComunicator {

  environmentProperty (property,defaultValue) {
		return process.env[property] || defaultValue
	}

	url() {
		return this.environmentProperty("URL","/")
  }

	apiUrl() {
		return this.environmentProperty("API_URL","/")
	}

	isPassportEnabled() {
		return this.environmentProperty("PASSPORT",false)
	}

	apiClient() {
		return this.environmentProperty("API_CLIENT",2)
	}

	apiSecret() {
		return this.environmentProperty("API_SECRET","devdevdevdevdevdevdevdevdevdevdevdevdevd")
	}

  ajaxTimeout() {
    return this.environmentProperty("AJAX_TIMEUOT","60000")
  }

  ajaxMaxContentLenght() {
    return this.environmentProperty("AJAX_MAX_CONTENT_LENGHT","20000")
  }

}
