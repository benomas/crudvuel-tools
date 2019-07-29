<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-md-5 q-pa-md m-auto">
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
      <div class="col-xs-12 col-md-5 q-pa-md m-auto">
        <div class="row">
          <div class="col-xs-12">
            <q-field v-bind="defErrorInputProps('resource_id')">
            <cv-matcherizer
              :cv-parent-ref="cSelfRef"
              ref="row.resource_id"
              v-if="cGetted && cCurrentCvResource"
              v-bind="defMatcherizerProps(cCurrentCvResource)"
              :cv-disable-fields="cAction.name==='edit' || cDisableFields"
              :cv-select-query="{'id':'resource_id','search_field':'search_field'}"
              :cv-current-value="row.resource_id"
              :cv-current-label="row.search_field"
              :cv-order-by="'search_field'"
              :cv-filter-query="{'search_field':''}"
              :cv-label-call-back="((rows,row) => {return row['search_field']})"
              @cv-single-selected="(() => {inputFocus('row.active'); reset()})"
              @cv-reset="reset"
            >
            </cv-matcherizer>
            </q-field>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('active')"  >
          <cv-toggle
            ref="row.active" v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-9 col-sm-10 col-md-11 q-pa-md">
        <q-field v-bind="defErrorInputProps(cFileName)">
          <q-uploader
            class="w-100"
            no-thumbnails
            :url="cFileUrl + (cAction.name==='edit'? '/' + row.id : '')"
            method="POST"
            :headers="cQFieldFileHeaders"
            :multiple="cAction.name==='edit'?false:cMultiple"
            :hide-upload-button="true"
            :auto-expand="true"
            :form-fields="cFieldFormater"
            ref="uploader"
            :field-name="cFileName"
            :disable="cDisableFields"
            :readonly="cDisableFields"
            :clearable="cDisableFields"
            @failed="uploadFileFail"
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
      <div class="col-xs-12 h-50px">
      </div>
      <div class="col-xs-12">
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
import CvFileManager    from 'src/crudvuel/customs/themes/quasar/components/others/CvFileManager'
import {QTooltip}       from 'quasar'
import CvMultiFileMenu  from 'src/crudvuel/customs/themes/quasar/components/others/CvMultiFileMenu'
import CvSingleFileMenu from 'src/crudvuel/customs/themes/quasar/components/others/CvSingleFileMenu'
export default {
  mixins: [CvBaseCrud,CvFileManager],
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
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .border-all{
    border:1px solid #CCCCCC;
  }
</style>
