<script>
import CvRowAction from './CvEdit'
export default {
  extends  : CvRowAction,
  computed : {
    cDisableRelationator: function () {
      return true
    }
  },
  methods: {
    successRedirect: function () {
    }
  }
}
</script>
