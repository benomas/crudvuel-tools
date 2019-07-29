<script>
import {QUploader} from 'quasar'

function initFile (file) {
  file.__doneUploading = false
  file.__failed = false
  file.__uploaded = 0
  file.__progress = 0
}
export default {
  extends : QUploader,
  methods: {
    abort () {
      /*
      this.xhrs.forEach(x => { x.abort() })

      if (this.promises.length > 0) {
        this.abortPromises = true
      }*/
    },

    upload () {
      if (this.canUpload === false) {
        return
      }

      const queue = this.queuedFiles.slice(0)
      this.queuedFiles = []

      if (this.xhrProps.batch(queue)) {
        this.__runFactory(queue)
      }
      else {
        queue.forEach(file => {
          this.__runFactory([ file ])
        })
      }
    },

    __runFactory (files) {
      this.workingThreads++

      if (typeof this.factory !== 'function') {
        this.__uploadFiles(files, {})
        return
      }

      const res = this.factory(files)

      if (!res) {
        this.$emit(
          'factory-failed',
          new Error('QUploader: factory() does not return properly'),
          files
        )
        this.workingThreads--
      }
      else if (typeof res.catch === 'function' && typeof res.then === 'function') {
        this.promises.push(res)

        const failed = err => {
          if (this._isBeingDestroyed !== true && this._isDestroyed !== true) {
            this.promises = this.promises.filter(p => p !== res)

            if (this.promises.length === 0) {
              this.abortPromises = false
            }

            this.queuedFiles = this.queuedFiles.concat(files)
            files.forEach(f => { this.__updateFile(f, 'failed') })

            this.$emit('factory-failed', err, files)
            this.workingThreads--
          }
        }

        res.then(factory => {
          if (this.abortPromises === true) {
            failed(new Error('Aborted'))
          }
          else if (this._isBeingDestroyed !== true && this._isDestroyed !== true) {
            this.promises = this.promises.filter(p => p !== res)
            this.__uploadFiles(files, factory)
          }
        }).catch(failed)
      }
      else {
        this.__uploadFiles(files, res || {})
      }
    },

    __uploadFiles (files, factory) {
      const
        form = new FormData(),
        xhr = new XMLHttpRequest()

      const getProp = (name, arg) => {
        return factory[name] !== void 0
          ? getFn(factory[name])(arg)
          : this.xhrProps[name](arg)
      }

      const url = getProp('url', files)

      if (!url) {
        console.error('q-uploader: invalid or no URL specified')
        this.workingThreads--
        return
      }

      const fields = getProp('formFields', files)
      fields !== void 0 && fields.forEach(field => {
        form.append(field.name, field.value)
      })

      let
        uploadIndex = 0,
        uploadIndexSize = 0,
        uploadedSize = 0,
        maxUploadSize = 0,
        aborted

      xhr.upload.addEventListener('progress', e => {
        if (aborted === true) { return }

        const loaded = Math.min(maxUploadSize, e.loaded)

        this.uploadedSize += loaded - uploadedSize
        uploadedSize = loaded

        let size = uploadedSize - uploadIndexSize
        for (let i = uploadIndex; size > 0 && i < files.length; i++) {
          const
            file = files[i],
            uploaded = size > file.size

          if (uploaded) {
            size -= file.size
            uploadIndex++
            uploadIndexSize += file.size
            this.__updateFile(file, 'uploading', file.size)
          }
          else {
            this.__updateFile(file, 'uploading', size)
            return
          }
        }
      }, false)

      xhr.onreadystatechange = () => {
        if (xhr.readyState < 4) {
          return
        }

        if (xhr.status && xhr.status < 400) {
          this.uploadedFiles = this.uploadedFiles.concat(files)
          files.forEach(f => { this.__updateFile(f, 'uploaded') })
          this.$emit('uploaded', { files, xhr })
        }
        else {
          aborted = true
          this.uploadedSize -= uploadedSize
          this.queuedFiles = this.queuedFiles.concat(files)
          files.forEach(f => { this.__updateFile(f, 'failed') })
          this.$emit('failed', { files, xhr })
        }

        this.workingThreads--
        this.xhrs = this.xhrs.filter(x => x !== xhr)
      }

      xhr.open(
        getProp('method', files),
        url
      )

      if (getProp('withCredentials', files) === true) {
        xhr.withCredentials = true
      }

      const headers = getProp('headers', files)
      headers !== void 0 && headers.forEach(head => {
        xhr.setRequestHeader(head.name, head.value)
      })

      const sendRaw = getProp('sendRaw', files)

      files.forEach(file => {
        this.__updateFile(file, 'uploading', 0)
        if (sendRaw !== true) {
          form.append(getProp('fieldName', file), file)
        }
        file.xhr = xhr
        file.__abort = xhr.abort
        maxUploadSize += file.size
      })

      this.$emit('uploading', { files, xhr })
      this.xhrs.push(xhr)

      if (sendRaw === true) {
        xhr.send(new Blob(files))
      }
      else {
        xhr.send(form)
      }
    }
  }
}
</script>
