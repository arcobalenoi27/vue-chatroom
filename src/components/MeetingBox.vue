<template>
    <div :class="['meeting-box', {mini: isMinimized}]" @click="toggleChat">
        <div :class="['header', {unreadHint: unreadNumber() > 0 }]">
            <div class="meeting-name">{{meeting.meetingName}}</div>
            <div class="shortcut-feature">
                <div class="setting" @click.stop="" :title="$t('meetingBox.configuration')"><icon name="cog"></icon></div>
                <div class="close" @click.stop="close(index)" :title="$t('meetingBox.close')"><icon name="times"></icon></div>
            </div>
            <div class="unread-msgs" v-show="showUnread()" >{{unreadNumber()}}</div>
        </div>
        <div class="content" @click.stop="">
            <div class="chat-history">
                <PersonalMessage :meeting="meeting" :index="index"></PersonalMessage>
            </div>
        </div>
        <div class="bottom">
            <div contenteditable="true" class="typing-box" 
            @click.stop="cancealUnread(meeting)" @keypress.enter="sendMessage($event)" 
            :placeholder="$t('personalMsg.saySomething')"
            ></div>
            <div class="send-btn"></div>
        </div>
        <div class="feature-bar"></div>
    </div>

</template>


<script>
import Icon from 'vue-awesome/components/Icon'
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
import store from '../store'
import PersonalMessage from './PersonalMessage.vue'

export default {
    name: 'meeting-box',
    data() {
        return {
            isMinimized: true,
            message: '',
            Meeting: this.meeting,
            isZero: true
        }
    },
    props: {
        meeting: {
            type: [Array, Object]
        },
        index: {
            type: Number
        },
        meetingSize: {
            type: Number
        }
    },
    computed: {
        ...mapGetters(['getUserSelf', 'getSocket', 'getMeetingsData']),
        hasConversation () {
            return this.meeting.conversation.length > 0
        },
        unreadNumberProperty () {
            return parseInt(this.meeting.conversation.filter(function (msg) {
                return msg.message.isUnread;
            }).length);
        },
        showUnreadVal () {
            return  this.unreadNumber() > 0  && this.isMinimized == true;
        },
        testResult () {
            return this.isMinimized && this.isZero;
        }
        
    },
    methods: {
        ...mapActions(['addMsgToMeetingSelf', 'decreaseUnread', 'deleteSelectivePersonalMessage']),
        toggleChat () {
            this.isMinimized = !this.isMinimized;
        },
        showUnread () {
            return  this.unreadNumber() > 0 && this.isMinimized === true;
        },
        unreadNumber () {
            return this.meeting.conversation.filter(function (msg) {
                return msg.message.isUnread;
            }).length;
        },
        unreadIsNotZero () {
            let self = this;
            return this.unreadNumber() > 0;
        },
        showUnreadNumber () {
            return this.showUnread ? this.unreadNumber : '';
        },
        clearInput (event) {
            // console.log(event);
            var br = event.target.childNodes;
            event.target.innerText = '';
            event.target.innerHTML = '';
            var box = document.querySelector('div.typing-box');
            var e = document.createEvent('HTMLEvents');
            e.keyCode = 8;
            e.initEvent('keypress', false, true);
            box.dispatchEvent(e);
            box.dispatchEvent(e);
            
        },
        close (index) {
            this.deleteSelectivePersonalMessage(index);
        },
        sendMessage (event) {
            
            let self = this;
            let msg = event.target.innerText;
            
            let msgObject = {
                destination_id: self.meeting.id,
                // destination_id 是訊息的目的端
                match_id: self.getUserSelf.id,
                // match_id 則是要找到對應的MeetingsData,也就是A跟B 聊天時, 到B的時候要找到A的MeetingData
                message: {
                    who: self.getUserSelf.name,
                    who_id: self.getUserSelf.id,
                    msg: msg,
                    isUnread: true
                }
            };

            this.getSocket.emit('toOne', msgObject);
            this.addMsgToMeetingSelf(msgObject);
            this.clearInput(event);
            setTimeout(self.scrollToEnd, 250);

        },
        sendImagefromLocal () {

        },
        sendImagebyUrl () {
            unreadIsNotZero();
        },
        scrollToEnd () {
            let chat_box = document.querySelector('.chat-history');
            chat_box.scrollTop = chat_box.scrollHeight;
        },
        cancealUnread (meeting) {
            this.decreaseUnread( meeting);
            // console.log('canceal');
        }
    },

    watch: {
        meeting () {    
            this.unreadIsNotZero();
            this.showUnreadNumber();
        }
    },

    components: {
        Icon,
        PersonalMessage
    },
    ready() {
        document.execCommand('defaultParagraphSeparator', false, '<br><br>');
    }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
$debug: true;
@mixin debug-line {
  @if $debug == true {
    border: solid 1px red;
  }
}

@mixin fill {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

* {
  box-sizing: border-box;
}




.meeting-box {
  /* @include debug-line; */
  font-family: $font-setting;
  display: inline-block;
  width: 300px;
  height: 350px;
  margin-right: 30px;

  & * {
    /* @include debug-line; */
  }
  & .header {
    position: relative;
    z-index: 3;
    cursor: pointer;
    padding-top: 5px;
    background-color: #db28ff;
    color: #fff;
    width: 100%;
    height: 32px;
    font-size: 1em;
    white-space: nowrap;
    & > div {
      width: 47%;
      display: inline-block;
    }
    & .meeting-name {
      padding-left: 12px;
    }
    
    & .shortcut-feature {
      text-align: right;
    }
    
    & .close, & .setting {
      /* @include debug-line; */
      vertical-align: middle;
      display: inline-block;
      margin-right: 3px;
      font-size: 1.15em;

    }
    &::after {
      content: '';
      display: inline-block;
      clear: both;
    }
  }
  
  & .content {
    width: 100%;
    height: 257px;
    position: relative;
    background-color: #fefefe;
    border-left: 1px solid #eee;
    
    & .chat-history {
    //   @include fill;
      width: 100%;
      height: 257px;
      @include customized-scroll;
      overflow-y: scroll;
    }
  }
  
  & .bottom {
    width: 100%;
    height: 40px;
    & .typing-box {
      text-align: left;
      position: relative;
      z-index: 5;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-top: solid 1px #d8d8d8;
      font-size: 1.3em;
      word-break: break-word;
      padding: 6px 0px 0px 8px;
      overflow-y: scroll;
        
      
      /* & #user-msg {
        position: relative;
        z-index: 5;
        padding: 6px 0px 6px 8px;
        width: 100%;
        height: 100%;
        font-size: 1.3em;
        word-break: break-word;
      } */
      
    }
  }
  
  & .feature-bar {
    width: 100%;
    height: 20px;
    background-color: #f18eff;
  }
}


.mini {
  bottom: 0;
  vertical-align: bottom;
  height: 32px;
}

.mini .content, .mini .bottom, .mini .feature-bar {
    height: 0px;
    display: none;
}

.unread-msgs {
    position: absolute;
    z-index: 3;
    left: 50%;
    vertical-align: middle;
    background-color: #f00;
    width: 18px !important;
    height: 18px !important;
}

.unreadHint {
    animation: twinkling 1.1s  ease-out infinite;
}

@keyframes twinkling {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
}

// editable div placeholder with CSS solution
div[placeholder]:empty:before {
    content: attr(placeholder);
    color: #555;
}

div[placeholder]:empty:focus:before {
    content: '';
}

*[contenteditable="true"]{display: inline-block;}

</style>

