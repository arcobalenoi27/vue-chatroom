<template>
    <div class="main-box">
        <div class="chat-input">
            <ChatInputBox :isLogin="isLogin" />
        </div>
        <div class="conversation-box">
            <PublicMessage :key="post.time" v-for="post in getPublicMsg" :post="post"></PublicMessage>
        </div>
    </div>
</template>

<script>
import ChatInputBox from './ChatInputBox.vue'
import PublicMessage from './PublicMessage.vue'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'main-window',

  props: {
      isLogin: {
          type: Boolean
      }
  },

  computed: {
      ...mapGetters(['getUserSelf', 'getPublicMsg'])
  },

  methods: {

  },

  components: {
      ChatInputBox,
      PublicMessage
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

$debug: true;

.main-box {
    // @include debug-line;
    width: 45%;
    height: 100%;
    border: solid 1px #e1e1e1;

    & .conversation-box {
        // @include debug-line;
        width: 100%;
        height: calc(100% - 100px);
        border-bottom: 1px solid #e1e1e1;
        overflow-y: scroll;
    }
  
    & .chat-input {

        width: 100%;
        height: 100px;
        border-bottom: 1px solid #e1e1e1;
    }
}

// .conversation-box {
//     scrollbar-face-color: #367CD2;
//     scrollbar-shadow-color: #FFFFFF;
//     scrollbar-highlight-color: #FFFFFF;
//     scrollbar-3dlight-color: #FFFFFF;
//     scrollbar-darkshadow-color: #FFFFFF;
//     scrollbar-track-color: #FFFFFF;
//     scrollbar-arrow-color: #FFFFFF;
// }

.conversation-box::-webkit-scrollbar {
    display: none;
}

.conversation-box::-webkit-scrollbar-track {
    display: none;
}


.conversation-box::-webkit-scrollbar-thumb {
    display: none;
}

</style>

