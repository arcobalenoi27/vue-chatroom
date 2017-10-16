import Vue from 'vue'
import * as types from './mutations_types'
import _ from 'lodash'

export default {
    [types.LANGUAGE] (state, setLang) {
        state.lang = setLang;
        Vue.i18n.set(state.lang);
    },
    [types.USERLIST] (state, userList) {
        state.userList = userList;
    },
    [types.USERPROFILE] (state, userSelf) {
        state.userSelf = userSelf;
    },
    [types.LOGINHINT] (state, username) {
        state.loginHint.username = username;
    },
    [types.PUBLICMSG] (state, postMsg) {
        state.publicRoom.unshift(postMsg);
    },
    [types.CREATEPERSONALMEETING] (state, meetings) {
        state.meetingsData = meetings;
    },
    [types.ADDSELECTIVEMEETING] (state, object_id) {
        let index = _.findIndex(state.selectMeetings, object_id)
        if(state.selectMeetings.length < 3 && index === -1) {
            state.selectMeetings.push(object_id);
        } else {
            // showPopupMeetingLimit
            state.systemInfo = Object.assign({}, {
                message: '',
                type: 'chatlimit',
                show: true
            })
        }
    },
    [types.DELETESELECTIVEMEETING] (state, index) {
        state.selectMeetings.splice(index, 1);
    },
    [types.ADDPMTOMEETING] (state, msgObj) {
        let index = _.findIndex(state.meetingsData, {id: msgObj.match_id })
        if(index !== -1) {
            // let cache = state.meetingsData[index].conversation.slice();
            // let result = cache.push(msgObj);
            // Vue.set(state.meetingsData[index], 'conversation', result);
            state.meetingsData[index].conversation.push(msgObj);
            state.meetingsData[index].unread += 1; 
        } else {
            console.error('Can not find meetingsData');
        }
    },
    [types.ADDPMTOMEETINGSELF] (state, msgObj) {
        let index = _.findIndex(state.meetingsData, {id: msgObj.destination_id });
        if(index !== -1) {
            // let cache = state.meetingsData[index].conversation.slice();
            // let result = cache.push(msgObj)
            // Vue.set(state.meetingsData[index], 'conversation', result);
            state.meetingsData[index].conversation.push(msgObj);
        } else {
            console.error('Can not find meetingsData');
        }
    },
    [types.DECREASEUNREAD] (state, meeting) {
        let index = _.findIndex(state.meetingsData, {id: meeting.id});
        if(index !== -1) {
            state.meetingsData[index].conversation.filter(function(emt) {
                emt.message.isUnread = false;
                return emt;
            });
            // Vue.set(state.meetingsData[index], 'unread', 0);
        }
    },
    [types.CALCULATEUNREAD] (state, meeting) {
        let index = _.findIndex(state.meetingsData, {id: meeting.who_id});
        if(index !== -1) {
            let num = state.meetingsData[index].conversation.filter(function(msg) {
                return msg.message.isUnread;
            }).length;
            Vue.set(state.meetingsData[index], 'unread', num);
        }
    },
    [types.YOUTUBEHISTORY] (state, data) {
        // data.map(function(emt) {
        //     state.youtubeHistory.history.push(emt);
        //     return emt;
        // });
        state.youtubeHistory.history = data;
        state.youtubeHistory.now = state.youtubeHistory.history.length - 1;
    },
    [types.ADDLOGINFO] (state, msg) {
        state.systemInfo = Object.assign({}, msg);
    },
    [types.DELETELOGINFO] (state, msg) {
        state.systemInfo = Object.assign({}, msg);
    },
    [types.CHANGEYTINDEX] (state, PrevOrNext) {
        if (PrevOrNext === 'prev') {
            if (state.youtubeHistory.now === 0) {
                state.youtubeHistory.now = state.youtubeHistory.history.length - 1;
            } else {
                state.youtubeHistory.now -= 1;
            }
        } else {
            if (state.youtubeHistory.now === (state.youtubeHistory.history.length - 1)) {
                state.youtubeHistory.now = 0;
            } else {
                state.youtubeHistory.now += 1;
            }
        }
    }
}