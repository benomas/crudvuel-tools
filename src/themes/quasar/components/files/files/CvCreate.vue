<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 q-pa-md m-auto">
        <div class="row">
          <div class="col-xs-12">
            <q-field v-bind="defErrorInputProps('cat_file_id')">
            <cv-matcherizer
              v-if="cGetted"
              :cv-disable-fields="cAction.name==='edit' || cDisableFields"
              :cv-parent-ref="cSelfRef"
              ref="row.cat_file_id"
              v-bind="defMatcherizerProps('catFiles')"
              :cv-select-query="{'id':'cat_file_id','name':'cat_file_name','multiple':'cat_file_multiple','description':'cat_file_description','resource':'cat_file_resource','slug_resource':'cat_file_slug_resource','camel_resource':'cat_file_camel_resource'}"
              :cv-filter-query="{'name':''}"
              :cv-order-by="'name'"
              :cv-label-call-back="((rows,row)=>{return row['name']})"
              :cv-current-value="row.cat_file_id"
              :cv-current-label="row.cat_file_name"
              :cv-list-of-items-limit="10"
              @cv-single-selected="(() => {inputFocus('row.resource_id')})"
            >
            </cv-matcherizer>
            </q-field>
          </div>
        </div>
      </div>
      <div class="col-xs-12 q-pa-md m-auto">
        <div class="row">
          <div class="col-lg-12">
            <q-field v-bind="defErrorInputProps('resource_id')">
            <cv-matcherizer
              :cv-parent-ref="cSelfRef"
              v-if="cGetted && cCurrentCvResource"
              v-bind="defMatcherizerProps(cCurrentCvResource)"
              :cv-disable-fields="cAction.name==='edit' || cDisableFields"
              :cv-select-query="{'id':'resource_id','search_field':'resource_search_field'}"
              :cv-current-value="row.resource_id"
              :cv-current-label="row.resource_search_field"
              :cv-order-by="'search_field'"
              :cv-label-call-back="((rows,row) => {return row['search_field']})"
              @cv-single-selected="(() => {inputFocus('row.active'); reset()})"
              @cv-reset="reset"
              ref="row.active"
            >
            </cv-matcherizer>
            </q-field>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-3 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle
              ref="row.active" v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-9 col-sm-7 col-md-8 q-pa-md">
        <q-field v-bind="defErrorInputProps(cFileName)">
          <q-uploader
            :url="cAbsBaseUrl + (cAction.name==='edit'? '/' + row.id : '')"
            method="POST"
            :headers="cFileHeaders"
            :multiple="cAction.name==='edit'?false:cMultiple"
            :hide-upload-button="true"
            :auto-expand="true"
            :additional-fields="cFieldFormater"
            ref="uploader"
            :name="cFileName"
            :disable="cDisableFields"
            :readonly="cDisableFields"
            :clearable="cDisableFields"
            @fail="uploadFileFail"
            @upload="uploadFileCompleted"
            @finish="uploadFilesFinish"
            @start="uploadFileStart"
            :float-label="rLang('otherLabels.dropHere')"
          />
        </q-field>
      </div>
      <div class="col-xs-3 col-sm-2 col-md-1 t-center m-auto">
        <q-btn
          class="h-40px  m-auto"
          target="_blank"
          icon="fa fa-download"
          color="primary"
          small
          :disabled="!row.absolute_path"
          @click="openFile">
          <q-tooltip >
            {{!row.absolute_path?rLang('otherLabels.noDownload','files'):rLang('otherLabels.download','files')}}
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-lg-12 h-50px">
      </div>
      <div class="col-lg-12">
        <cv-buttons :cv-ready="ready" :cv-action="action" @cv-back="cancelAction" @cv-next="upload" >
        </cv-buttons>
      </div>
    </div>
  </cv-action-container>
</template>
<script>
import CvBaseCrud       from 'src/crudvuel/customs/themes/quasar/components/resource/CvBaseCrud'
import CvMatcherizer    from 'src/crudvuel/customs/themes/quasar/components/matcherizer-components/CvMatcherizer'
import QUploader        from 'src/crudvuel/customs/themes/quasar/components/others/QUploader'
import {QTooltip}       from 'quasar'
import CvMultiFileMenu  from 'src/crudvuel/customs/themes/quasar/components/others/CvMultiFileMenu'
import CvSingleFileMenu from 'src/crudvuel/customs/themes/quasar/components/others/CvSingleFileMenu'
export default {
  extends : CvBaseCrud,
  data    : function () {
    return {
      errorCount: 0
    }
  },
  components: {
    CvMatcherizer,
    QUploader,
    QTooltip,
    CvMultiFileMenu,
    CvSingleFileMenu
  },
  computed: {
    cFieldFormater: function () {
      return this.row ? [
        {
          name  : 'resource_id',
          value : this.row.resource_id
        },
        {
          name  : 'resource',
          value : this.row.cat_file_resource
        },
        {
          name  : 'cat_file_id',
          value : this.row.cat_file_id
        },
        {
          name  : 'active',
          value : this.row.active
        }
      ] : []
    },
    cUploadReference: function () {
      return this.$refs.uploader
    },
    cFileName: function () {
      return this.cCurrentResource
    },
    cMultiple: function () {
      if (typeof this.row.cat_file_multiple !== 'undefined' && this.row.cat_file_multiple)
        return true
      return false
    },
    cCurrentCvResource: function () {
      return this.row.cat_file_camel_resource != null ? this.row.cat_file_camel_resource : false
    },
    cCurrentResource: function () {
      return this.row.cat_file_resource != null ? this.row.cat_file_resource : null
    }
  },
  mounted: function () {
  },
  methods: {
    init: function () {
      this.$set(this.row,'cat_file_camel_resource',null)
    },
    openFile: function () {
      window.open(this.row.absolute_path)
    },
    uploadFileStart: function () {
      this.errorCount = 0
      this.ready      = false
      this.errors     = {}
    },
    uploadFilesFinish: function () {
      if (!this.errorCount)
        this.successRedirect()
    },
    uploadFileCompleted: function (file, xhr) {
      this.row   = xhr.response.data
      if (this.cShowSetMessages)
        this.collectSuccessMessages(this.action.getSetSuccessMessage() + this.cIdentText)
    },
    uploadFileFail: function (file, xhr) {
      if (this.cvComunicator.proccessErrorStatus(xhr))
        return false
      this.ready  = true
      this.errorCount++
      if (typeof xhr !== 'undefined' && typeof xhr.response !== 'undefined') {
        let parsed = JSON.parse(xhr.response)
        if (typeof parsed.errors !== 'undefined') {
          if (!this.cMultiple)
            this.errors = parsed.errors
          else {
            if (typeof parsed.errors['resource_id'] !== 'undefined')
              this.errors['resource_id'] = parsed.errors['resource_id']
            if (typeof parsed.errors['cat_file_id'] !== 'undefined')
              this.errors['cat_file_id'] = parsed.errors['cat_file_id']
            if (typeof parsed.errors['active'] !== 'undefined')
              this.errors['active'] = parsed.errors['active']
            if (this.row.cat_file_id) {
              if (typeof parsed.errors['request_file_' + this.row.cat_file_id] !== 'undefined') {
                if (typeof this.errors['request_file_' + this.row.cat_file_id] === 'undefined')
                  this.errors['request_file_' + this.row.cat_file_id] = parsed.errors['request_file_' + this.row.cat_file_id]
                /* fix error concat
                else {
                  let oldError = this.errors['request_file_' + this.row.cat_file_id][0]
                  for (let i = 0; i < parsed.errors['request_file_' + this.row.cat_file_id].length; i++)
                    oldError = oldError + ', ' + parsed.errors['request_file_' + this.row.cat_file_id][i]
                  //this.$set(this.errors['request_file_' + this.row.cat_file_id],0,'asdasdasd')
                  this.errors['request_file_' + this.row.cat_file_id].push()
                  //this.errors['request_file_' + this.row.cat_file_id][0] = 'asdasdasd'
                }
                */
              }
            }
          }
        }
      }

      if (this.cShowSetMessages)
        this.collectErrorMessages(this.action.getSetErrorMessage() + this.cIdentText)
      this.errorRedirect()
    },
    validator: function () {
      return true
    },
    upload: function () {
      this.cUploadReference.upload()
    },
    reset: function () {
      this.cUploadReference.reset()
    },
    transformResponse: function (response) {
      let row = response.data.data || response.data
      if (row != null) {
        if (row.cat_file != null) {
          row.cat_file_camel_resource = row.cat_file.camel_resource
          row.cat_file_resource       = row.cat_file.resource
        }
        if (row.resource != null)
          row.resource_search_field = row.resource.search_field
      }
      return row
    }
  }
}
</script>
<style lang="scss" scoped>
  .border-all{
    border:1px solid #CCCCCC;
  }
</style>
