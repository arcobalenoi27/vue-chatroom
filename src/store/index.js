import Vue from 'vue'
import vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import validations  from '../validation/validation.js'
import mutations from './mutations'


Vue.use(vuex);

import en from '@/i18n/en.json'
import tw from '@/i18n/tw.json'

const locales = {
  en: en,
  tw: tw
};

let state = {
    lang: 'en',
    socket: null,
    userList: null,
    userSelf: {
        name: '',
        accountId: '',
        avatar: '',
        avatarPos: {
            offsetX: 0,
            offsetY: 0
        }
    },
    loginHint: {
        username: ''
    },
    publicRoom: [],
    validations: validations,
    meetingsData: [],
    selectMeetings: [],
    youtubeHistory: {
        history: [],
        now: 0
    },
    systemInfo: {
        message: '',
        type: '',
        show: false
    }

}



export default new vuex.Store(
    {
        state,
        getters,
        actions,
        mutations
    }
);