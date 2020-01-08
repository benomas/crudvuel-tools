export default function(){
	this.validTypes        =["string","number"];
	this.synchronizingRows =[]

	this.toSync=function(row,rowKey,identifier){
		if(typeof identifier ==="undefined"){
      if(typeof row!=="undefined" && typeof rowKey!=="undefined" && typeof row[rowKey]!=="undefined")
        identifier = row[rowKey]
		}

		if(this.validIdentifier(identifier))
      this.synchronizingRows.push(identifier);
	}

	this.synchronized=function(row,rowKey,identifier){
		if(typeof identifier ==="undefined"){
      if(typeof row!=="undefined" && typeof rowKey!=="undefined" && typeof row[rowKey]!=="undefined")
        identifier = row[rowKey]
		}

		if(this.validIdentifier(identifier) && this.synchronizingRows && this.synchronizingRows.indexOf(identifier)>=0)
			this.synchronizingRows.splice(this.synchronizingRows.indexOf(identifier),1)
	},
	this.isSynchronizing=function(row,rowKey,identifier){
		if(typeof identifier ==="undefined"){
      if(typeof row!=="undefined" && typeof rowKey!=="undefined" && typeof row[rowKey]!=="undefined")
        identifier = row[rowKey]
		}
		if(this.validIdentifier(identifier) && this.synchronizingRows && this.synchronizingRows.indexOf(identifier)>=0)
      return true
		return false
	},

	this.validIdentifier=function(identifier){
		return this.validTypes.indexOf(typeof identifier);
	}

	this.someSyncInProgress=function(){
		return this.synchronizingRows && this.synchronizingRows.length >0;
	}
};
