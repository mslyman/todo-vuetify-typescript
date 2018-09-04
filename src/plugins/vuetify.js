import Vue from 'vue'
import Vuetify from 'vuetify/es5/components/Vuetify'
import VApp from 'vuetify/es5/components/VApp'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VFooter from 'vuetify/es5/components/VFooter'
import VList from 'vuetify/es5/components/VList'
import VBtn from 'vuetify/es5/components/VBtn'
import VIcon from 'vuetify/es5/components/VIcon'
import VToolbar from 'vuetify/es5/components/VToolbar'
import transitions from 'vuetify/es5/components/transitions'
import VSelect from 'vuetify/es5/components/VSelect'
import VMenu from 'vuetify/es5/components/VMenu'
import VDatePicker from 'vuetify/es5/components/VDatePicker'
import VTextField from 'vuetify/es5/components/VTextField'
import VCombobox from 'vuetify/es5/components/VCombobox'
import VForm from 'vuetify/es5/components/VForm'
import * as VGrid from 'vuetify/es5/components/VGrid'
import VCard from 'vuetify/es5/components/VCard'
import VSubheader from 'vuetify/es5/components/VSubheader'
import { Touch } from 'vuetify/es5/directives'
import VDialog from 'vuetify/es5/components/VDialog'
import VSpeedDial from 'vuetify/es5/components/VSpeedDial'
import VTextarea from 'vuetify/es5/components/VTextarea'
import VDivider from 'vuetify/es5/components/VDivider'

import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VToolbar,
    transitions,
    VSelect,
    VMenu,
    VDatePicker,
    VTextField,
    VCombobox,

    ...VGrid,

    VCard,
    // VCardActions, 
    // VCardText,

    // ...VCard,
    // ...VGrid,
    // VContext,
    // VContainer, VContent, VFlex, VLayout, VSpacer,
    // VCard, VCardActions, VCardText,    
    VForm,
    VSubheader,
    VDialog,
    VSpeedDial,
    VTextarea,
    VDivider
  },
  directives: {
    Touch
  },
  theme: {
    primary: '#3F51B5',
    secondary: '#F48FB1',
    accent: '#EF9A9A',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
})


// My comps
import NIcon from '../components/NIcon.vue';
import NIcons from '../components/NIcons.vue';
Vue.component(NIcon.name, NIcon);
Vue.component(NIcons.name, NIcons);