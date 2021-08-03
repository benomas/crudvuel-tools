import cvSerialize   from 'crudvuel-tools/src/cvSerialize'
export default function () {
  this.serialize = cvSerialize
  this.getSerialized = function (param = null) {
    return this.serialize(param,false)
  }
}
