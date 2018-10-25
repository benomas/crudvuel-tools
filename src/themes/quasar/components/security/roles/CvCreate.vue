<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-sm-6 col-md-5 q-pa-md">
        <q-field v-bind="defErrorInputProps('name')">
          <q-input v-bind="defInputProps('name')" v-model.trim="row.name"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-5 q-pa-md">
        <q-field v-bind="defErrorInputProps('slug')">
          <q-input v-bind="defInputProps('slug')" v-model.trim="row.slug"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-9 col-md-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('description')">
          <q-input v-bind="defInputProps('description')" v-model="row.description" type="textarea" :max-height="100" :min-rows="7"/>
        </q-field>
      </div>
      <div class="col-xs-12 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('permissions')">
          <br>
          <label for="message-text" class="control-label">
            {{$tc('crudvuel.resources.permissions.rowsLabel')}}:
          </label>
          <br>
          <div v-if="cPermissions && cRelatedPermissions && cPermissionsLoaded">
            <cv-relationator
              :cv-source="cPermissions"
              :cv-related="cRelatedPermissions"
              :cv-label-property="'name'"
              :cv-related-identifier="'permissions'"
              :cv-disable-fields="cDisableFields"
              @related-changed="checkRelatedPermissions"
            >
            </cv-relationator>
          </div>
        </q-field>
      </div>
      <div class="col-xs-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('roles')">
          <br>
          <label for="message-text" class="control-label">
            {{$tc('crudvuel.resources.roles.dominedRoles')}}:
          </label>
          <br>
          <div v-if="cRoles && cRelatedRoles && cRolesLoaded">
            <cv-relationator
              :cv-source="cRoles"
              :cv-related="cRelatedRoles"
              :cv-label-property="'name'"
              :cv-related-identifier="'roles'"
              :cv-disable-fields="cDisableFields"
              @related-changed="checkRelatedRoles"
            >
            </cv-relationator>
          </div>
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
import CvBaseCrud     from '../../resource/CvBaseCrud'
import CvRelationator from '../../input-components/CvRelationator'
export default {
  extends    : CvBaseCrud,
  components : {
    CvRelationator
  },
  data: function () {
    return {
      cvParams           : null,
      permissions        : null,
      permissionsLoaded  : false,
      relatedPermissions : null,
      relatedRoles       : null,
      roles              : null,
      rolesLoaded        : false
    }
  },
  computed: {
    cPermissions: function () {
      return this.permissions || []
    },
    cRelatedPermissions: function () {
      return this.relatedPermissions || []
    },
    cRoles: function () {
      return this.roles || []
    },
    cRelatedRoles: function () {
      return this.relatedRoles || []
    },
    cPermissionsLoaded: function () {
      return this.permissionsLoaded
    },
    cRolesLoaded: function () {
      return this.rolesLoaded
    }
  },
  mounted: function () {
    this.setUnReady()
    if (!this.rowKeyValue)
      this.getAdittionalData()
  },
  methods: {
    getAdittionalData: function () {
      this.services.permissions.index(null,null,this.cvParams.getSerialized())
        .then((response) => {
          this.permissions = response.data.data || response.data
          this.$nextTick().then(() => {
            this.permissionsLoaded = true
          })
          this.services.roles.index(null,null,this.cvParams.getSerialized())
            .then((rolesResponse) => {
              this.$set(this,'roles',rolesResponse.data.data || rolesResponse.data)
              this.setReady().then(() => {
                this.rolesLoaded = true
              })
            })
            .catch((rolesResponse) => {
              this.$set(this,'roles',[])
              this.setReady().then(() => {
                this.rolesLoaded = true
              })
            })
        })
        .catch((response) => {
          this.permissions = []
          this.setReady().then(() => {
            this.permissionsLoaded = true
            this.rolesLoaded       = true
          })
        })
    },
    getSuccess: function (response) {
      this.setUnReady()
      this.row                = response.data.data || response.data
      this.relatedPermissions = this.row.permissions.filter(row => row != null)
      this.relatedRoles       = this.row.roles.filter(row => row != null)
      this.getAdittionalData()
      if (this.cShowGetMessages)
        this.collectSuccessMessages(this.action.getGetSuccessMessage())
    },
    checkRelatedPermissions: function (data) {
      if (data.cRelatedIdentifier === 'permissions')
        this.relatedPermissionsChanged(data)
    },
    relatedPermissionsChanged: function (data) {
      this.row.permissions = []
      for (let i = 0; i < data.related.length; i++)
        this.row.permissions.push(data.related[i].id)
    },
    checkRelatedRoles: function (data) {
      if (data.cRelatedIdentifier === 'roles')
        this.relatedRolesChanged(data)
    },
    relatedRolesChanged: function (data) {
      this.row.roles = []
      for (let i = 0; i < data.related.length; i++)
        this.row.roles.push(data.related[i].id)
    },
    init: function () {
      this.row = {active: true}
      this.cvParams = new this.CvParametrizer({
        selectQuery : ['id','name'],
        orderBy     : 'id',
        ascending   : 1
      })
    }
  }
}
</script>
