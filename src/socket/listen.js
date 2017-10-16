import store from '../store'
import { mapActions } from 'vuex'
import * as actions from '../store/actions'
import * as helps from '../helps/helps.js'



export const listen = () => {
    let socket = window.socket;
    socket.on('userList', function(userList) {
        actions.updateUserList(store, userList);
        let meetings_setting = userList.slice();
        meetings_setting = meetings_setting.map(function(chatter) {
            chatter.meetingName = chatter.name;
            chatter.conversation = [];
            chatter.unread = 0;
            return chatter;
        });
        actions.createPersonalMeetings(store, meetings_setting);
    });

    socket.on('userInfo', function(userObj) {
        actions.updateUserProfile(store, userObj);
    });

    socket.on('loginInfo', function(username) {
        actions.updateLoginHint(store, username);
        // showLoginHint
        actions.ChangeLogInOutSystemInfo(store, {message: username,
                                                 type: 'login',
                                                 show: true});
    });

    socket.on('logout', function(userLogout) {
        console.log(userLogout);
        // showLogoutHint
        actions.ChangeLogInOutSystemInfo(store, {message: userLogout[0].name,
            type: 'logout',
            show: true});
    });

    socket.on('toPublic', function(postMsg) {
        actions.addPostMsgToPublic(store, postMsg);
        helps.notifiedSound();
        // actions.addImgYoutubeToMultimedia(store, postMsg);
    });

    socket.on('updateUser', function(userList) {
        actions.updateUserList(store, userList);
        
    });

    socket.on('toOne', function(msgObj) {
        actions.addSelectivePersonalMessage(store, {id: msgObj.match_id});
        actions.addMessageToMeeting(store, msgObj);
        // playSoundEffect
        helps.PMnotifiedSound();
    });

    socket.on('imgHistory', function(img) {
        // actions.addImgYoutubeToMultimedia(store, img);
    });
    socket.on('youtubeHistory', function(youtubeHistory) {
        // let parsedYoutubeData = helps.parseYoutubeUrls(youtubeHistory);

        actions.addYoutubeToMultimedia(store, youtubeHistory);
    });

}
