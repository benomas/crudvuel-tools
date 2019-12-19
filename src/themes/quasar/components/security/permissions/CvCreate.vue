<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-sm-6 q-pa-md">
        <q-field v-bind="defErrorInputProps('name')">
          <q-input v-bind="defInputProps('name')" v-model.trim="row.name"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 q-pa-md">
        <q-field v-bind="defErrorInputProps('slug')">
          <q-input v-bind="defInputProps('slug')" v-model.trim="row.slug"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-9 col-md-10 q-pa-md m-auto">
        <div class="col-xs-12">
          <q-field v-bind="defErrorInputProps('cat_permission_type_id')">
          <cv-matcherizer
            v-if="cGetted"
            :cv-parent-ref="cSelfRef"
            v-bind="defMatcherizerProps('catPermissionTypes')"
            :cv-select-query="{'id':'cat_permission_type_id','cv_search':'cat_permission_type_cv_search'}"
            :cv-search-label="fLang('cat_permission_type_cv_search')"
            :cv-current-value="row.cat_permission_type_id"
            :cv-current-label="row.cat_permission_type_cv_search"
            @cv-single-selected="(() => {inputFocus('row.description')})"
          >
          </cv-matcherizer>
          </q-field>
        </div>
      </div>
      <div class="col-xs-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('description')" items-aligned>
          <q-input
            v-bind="defInputProps('description')"
            v-model="row.description"
            ref="row.description"
            type="textarea"
            :max-height="100"
            :min-rows="7"/>
        </q-field>
      </div>
      <div class="col-xs-12 h-50px">
      </div>
      <div class="col-xs-12">
        <cv-buttons :cv-ready="ready" @cv-back="cancelAction()" @cv-next="setService()" :cv-action="action">
        </cv-buttons>
      </div>
    </div>
  </cv-action-container>
</template>
<script>
import CvBaseCrud    from '../../resource/CvBaseCrud'
import CvMatcherizer from '../../matcherizer-components/CvMatcherizer'
export default {
  extends    : CvBaseCrud,
  components : {
    CvMatcherizer
  },
  methods: {
    validator: function () {
      return true
    }
  }
}
</script>
