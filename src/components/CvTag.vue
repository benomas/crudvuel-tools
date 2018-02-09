<script>
export default {
  render:function( createElement){
    return createElement(
      this.tag,   // tag name
      this.$slots.default // array of children
    );
  },
  props:[
    "tag"
  ]
}
</script>