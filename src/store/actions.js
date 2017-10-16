import * as types from './mutations_types'

export const setLanguage = ({commit}, lang) => {
    commit(types.LANGUAGE, lang);
}

export const updateUserList = ({commit}, userList) => {
    commit(types.USERLIST, userList);
}

export const updateUserProfile = ({commit}, userSelf) => {
    commit(types.USERPROFILE, userSelf);
}

export const updateLoginHint = ({commit}, username) => {
    commit(types.LOGINHINT, username);
}


export const addPostMsgToPublic = ({commit}, postMsg) => {
    commit(types.PUBLICMSG, postMsg);
}

export const createPersonalMeetings = ({commit}, meetings) => {
    commit(types.CREATEPERSONALMEETING, meetings);
}

export const addSelectivePersonalMessage = ({commit}, object_id) => {
    commit(types.ADDSELECTIVEMEETING, object_id);
}

export const deleteSelectivePersonalMessage = ({commit}, index) => {
    commit(types.DELETESELECTIVEMEETING, index);
}

export const addMessageToMeeting = ({commit}, msgObj) => {
    //把聊天訊息加到會議中
    commit(types.ADDPMTOMEETING, msgObj);
}

export const addMsgToMeetingSelf = ({commit}, msgObj) => {
    commit(types.ADDPMTOMEETINGSELF, msgObj);
}

export const decreaseUnread = ({commit}, meeting) => {
    commit(types.DECREASEUNREAD, meeting);
}

export const calculateUnread = ({commit}, meeting) => {
    commit(types.CALCULATEUNREAD, meeting);
}

export const addYoutubeToMultimedia = ({commit}, data) => {
    commit(types.YOUTUBEHISTORY, data);
}

export const ChangeLogInOutSystemInfo = ({commit}, msg) => {
    commit(types.ADDLOGINFO, msg)
}

export const deleteLogInOutSystemInfo = ({commit}) => {
    commit(types.DELETELOGINFO, {
        message: '',
        type: '',
        show: false
    });
}

export const changeYoutubeVideoIndex = ({commit}, PrevOrNext) => {
    commit(types.CHANGEYTINDEX, PrevOrNext);
}