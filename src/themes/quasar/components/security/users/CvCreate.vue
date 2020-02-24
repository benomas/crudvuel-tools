<template>
  <cv-action-container v-if="cResource && cAction" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('first_name')" v-model.trim="row.first_name"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('last_name')" v-model.trim="row.last_name"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('username')" v-model.trim="row.username" autocomplete="off"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('email')" v-model.trim="row.email" autocomplete="off"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('password')" v-model.trim="row.password" :type="isPwd ? 'password' : 'text'" autocomplete="off" >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-input v-bind="defInputProps('confirm_password')" v-model.trim="row.confirm_password" :type="isPwd ? 'password' : 'text'" autocomplete="off" >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('roles')">
          <label for="message-text" class="control-label">Roles:</label>
          <div v-if="cRoles && cRelatedRoles && cRolesLoaded" class="row w-100">
            <cv-relationator
              :cv-source="cRoles"
              :cv-related="cRelatedRoles"
              :cv-label-property="'name'"
              :cv-related-identifier="'roles'"
              @related-changed="checkRelated"
              :cv-disable-fields="cDisableRelationator || cDisableFields"
              class="w-100"
            >
            </cv-relationator>
          </div>
        </q-field>
      </div>
      <div class="col-xs-12 h-50px">
      </div>
      <div class="col-xs-12">
        <cv-buttons :cv-ready="ready" @cv-back="cancelAction()" @cv-next="setService()" :cv-action="cAction">
        </cv-buttons>
      </div>
    </div>
  </cv-action-container>
</template>
<script>
//import CvBaseCrud     from 'src/customs/crudvuel/themes/quasar/components/resource/CvBaseCrud'
import CvRelationator     from 'src/customs/crudvuel/themes/quasar/components/input-components/CvRelationator'
export default {
  //extends    : CvBaseCrud,
  components : {
    CvRelationator
  },
  data: function () {
    return {
      cvParams     : null,
      roles        : null,
      relatedRoles : null,
      rolesLoaded  : false,
      isPwd        : true
    }
  },
  computed: {
    cRoles: function () {
      return this.roles || []
    },
    cRelatedRoles: function () {
      return this.relatedRoles || []
    },
    cRolesLoaded: function () {
      return this.rolesLoaded
    },
    cDisableRelationator: function () {
      return false
    }
  },
  mounted: function () {
    this.mSetUnReady()
    this.row.password = ''
    if (!this.rowKeyValue)
      this.getAdittionalData()
  },
  methods: {
    getAdittionalData: function () {
      this.services.roles.index(null,null,this.cvParams.getSerialized())
        .then((response) => {
          this.roles = response.data.data || response.data
          this.mSetReady().then(() => {
            this.rolesLoaded = true
            this.row.password = ''
          })
        })
        .catch((response) => {
          this.roles = []
          this.mSetReady().then(() => {
            this.rolesLoaded = true
            this.row.password = ''
          })
        })
    },
    getSuccess: function (response) {
      this.row          = response.data.data || response.data
      this.relatedRoles = this.row.roles
      this.getAdittionalData()
      if (this.cShowGetMessages)
        this.collectSuccessMessages(this.cAction.getGetSuccessMessage())
    },
    checkRelated: function (data) {
      if (data.cRelatedIdentifier === 'roles')
        this.relatedRolesChanged(data)
    },
    relatedRolesChanged: function (data) {
      this.source = data.source
      this.row.roles = []
      for (let i = 0; i < data.related.length; i++)
        this.row.roles.push(data.related[i].id)
    },
    init: function () {
      this.row = {active: 1,email: '',password: ''}
      this.cvParams = new this.CvParametrizer({
        selectQuery : ['id','name'],
        orderBy     : 'id',
        ascending   : 1
      })
    }
  }
}
</script>
