<template>
<div class="message-wrap">
    <div :class="['message-container']" :key="message.toString()" v-for="message in conversation">
        <div class="avatar" v-if="!checkSelf(message)" 
                            :style="{background: `url(${meeting.avatar})`,
                            backgroundPosition: `${meeting.avatarPos.offsetX}% ${meeting.avatarPos.offsetY}%`}"
                            :title="meeting.name">
        </div>
        <div :class="[checkSelf(message) ? 'self': 'them']">
            {{message.message.msg}}
        </div>
    </div>
    
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'personal-message',

  data() {
      return {
          conversation: this.meeting.conversation
      }
  },

  props: {
    //   message: {
    //       type: Object
    //   },
      index: {
          type: Number
      },
      meeting: {
          type: Object
      }
  },

  computed: {
      ...mapGetters(['getUserSelf']),
  },

  methods: {
      checkSelf(message) {
          return message.message.who_id === this.getUserSelf.id;
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/color.scss';
@import '../style/setting.scss';

$debug: false;

.message-container {
    width: 100%;
    // height: auto;
    // min-height: 50px;
    // padding: 15px 0px 15px;
    // margin-top: 20px;
    // margin-bottom: 10px;
    display: block;
    &:first-child {
        margin-top: 20px;
    }
    & .self, & .them {

        width: auto;
        max-width: 60%;
        padding: 10px 8px;
        border-radius: 12px 15px;
        word-wrap: break-word;
        word-break: normal;

        text-align: justify;
        
    }

    & .self {
        float: right;
        background-color: $color-purple;
        margin-right: 5px;
        color: #fff;
    }

    & .them {
        float: left;
        background-color: $light-blue;
    }

    &::after {
        content: '';
        width: 100%;
        height: 10px;
        display: inline-block;
        clear: both;
    }

}

.avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    background-size: cover !important;
    border-radius: 50%;
    float: left;
}



</style>

