<script>
import {QUploader} from 'quasar'

function initFile (file) {
  file.__doneUploading = false
  file.__failed = false
  file.__uploaded = 0
  file.__progress = 0
}
export default {
  extends : QUploader
}
</script>
