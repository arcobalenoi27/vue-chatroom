<template>
    <div class="chat-typing-box">
        <div class="feature-bar">
            <div class="features">
                <Icon class="f-icon" name="picture-o"></Icon>
            </div>
        </div>
        <div class="typing-container">
            <div class="self-avatar-box">
                <div class="self-avatar" :style="{ background: `url(${getUserSelf.avatar})`,
                                                   backgroundPosition: `${getUserSelf.avatarPos.offsetX}% ${getUserSelf.avatarPos.offsetY}%` }"></div>
            </div>
            <div class="typing-input-container">
                <input class="typing-box" cols="30" rows="4" :placeholder="$t('chatroomSetting.typingBoxText')" @keypress.enter="sendMessage()" v-model="message">
            </div>
            
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'chat-input-box',

  props: {
      isLogin: {
          type: Boolean
      }
  },

  data () {
      return {
          message: '',
          avatar_default: 'https://image.flaticon.com/icons/svg/8/8235.svg'
      }
  },

  computed: {
      ...mapGetters(['getUserSelf', 'getSocket', 'getPublicMsg', 'getValidations']),
      test () {
          let self = this;
          let isNotChange = this.getValidations.detectImgUrl(self.message) == self.message
          return isNotChange ? this.getValidations.checkUrlLink(self.message) : this.getValidations.detectImgUrl(self.message);
      },
      grabImg () {
          let self = this;
          return this.getValidations.grabImgUrlFromParagraph(self.message);
      },
      grabYoutube () {
          let self = this;
          return this.getValidations.grabYoutubeUrlFromParagraph(self.message);
      }
  },

  methods: {
      sendMessage (e) {
          let self = this;
        //   console.log(this.message);
          let postMsg = {
              name: self.getUserSelf.name,
              accountId: self.getUserSelf.accountId,
              avatar: self.getUserSelf.avatar,
              avatarPos: self.getUserSelf.avatarPos,
              attachImgUrl: null,
              youtube: null,
              data: null,
              type: '',
              time: '',
              postMsg: self.message
          };
          if (this.grabYoutube !== null) {
              postMsg.youtube = this.grabYoutube;
              postMsg.type = 'youtube';
          }
          if (this.grabImg !== null) {
                postMsg.attachImgUrl = this.grabImg;
                postMsg.type = 'img';
          }
          this.getSocket.emit('toAll', postMsg);
          this.clearTypingBox();
          let thread = this.getPublicMsg;
      },
      clearTypingBox () {
          this.message = '';
      }
  },

  components: {
      Icon
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

@mixin fill {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

$debug: true;

* {
    box-sizing: border-box;
    font-family: $font-setting;
}

.chat-typing-box {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;

    & .feature-bar {
        // @include debug-line;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 35px;
        background-color: lighten($light-blue, 5);
        border-bottom: 1px solid darken($light-blue, 1);
        font-size: initial;
        & .features {
            box-sizing: border-box;
            width: 35px;
            height: 35px;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $color-purple;
            cursor: pointer;
            &:hover {
                transition: color 0.3s;
                color: lighten($color-purple, 20);
            }
        }
    }

    & .typing-container {
        // @include debug-line;
        width: 100%;
        height: 65px;
        display: flex;
        // margin-left: -20px;
        & div {
            vertical-align: top;
        }

        & .self-avatar-box {
            // @include debug-line;
            display: inline-block;
            box-sizing: border-box;
            width: 80px;
            height: 65px;
            padding: 5px;
            padding-left: 25px;

            & .self-avatar {
                // @include debug-line;
                width: 55px;
                height: 55px;
                background-size: cover !important;
                border-radius: 8px;
            }
        }

        & .typing-input-container {
            // @include debug-line;
            overflow-y: scroll;
            @include customized-scroll;
            display: inline-block;
            position: relative;
            width: 100%;
            height: 65px;
            margin-left: 10px;

            & .typing-box {
                @include customized-scroll;
                // overflow-y: auto;
                display: inline-block;
                width: 100%;
                height: 65px;
                border: none;
                padding: 12px 0px 0px 12px;
                font-size: 14px;
                resize: none;

                
                &:focus {
                    outline: none;
                }
            }
        }
    }
}


.typing-box::-webkit-scrollbar, .typing-box::-webkit-scrollbar-track {
    display: none;
}

</style>

