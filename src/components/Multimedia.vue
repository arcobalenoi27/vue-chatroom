<template>
    <div class="multimedia-box">
        <div class="multi-avatar-box">
            <div class="multi-avatar" :style="{background: `url(${multiResouce.avatar})`, 
                                               backgroundPosition: `${multiResouce.avatarPos.offsetX}% ${multiResouce.avatarPos.offsetY}%`}">
            </div>
        </div>

        <div class="multi-header-box">
            <div class="multi-header">
                <div class="usertag">{{`@${multiResouce.accountId}`}}</div>
                <div class="time">{{timeFormation(multiResouce.time)}}</div>
            </div>
            
        </div>
        <div class="multi-content" v-html="renderMedia(multiResouce)">

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'multimedia',
  
  props: {
      multiResouce: {
          type: Object,
          name: '',
          avatar: '',
          accountId: '',
          avatarPos: {
              offsetX: 0,
              offsetY: 0
          },
          time: '',
          data: ''
      },
      top: {
          type: [Object, Array]
      }
  },

  computed: {
      grabYoutubeId () {
          let self = this;
          let regex = /https?:\/\/.+v=(.+)/g;
          let regexNow = /https?:\/\/.+\/(.+)\?t=(\d+)/g;
          let result = regex.exec(self.multiResouce.data);
          if (result === null) {
              result = regexNow.exec(self.multiResouce.data);
          }
          return result;
      }
  },

  methods: {
      timeFormation (s) {
          return moment(s).format('MMM DD YYYY, HH:mm');
      },
      renderMedia (multiResouce) {
          let self = this;
          let imgTemplate =  `<a href="${multiResouce.data}" target="_blank"><img src="${multiResouce.data}" title="${multiResouce.data}"><\/a>`;
          let youtube;
          if (this.multiResouce.youtube !== null) {
              youtube = (this.grabYoutubeId.length === 3 && this.top[0].data === multiResouce.data) ? 
                `<iframe width="700" height="393" src="https://www.youtube.com/embed/${self.grabYoutubeId[1]}?start=${self.grabYoutubeId[2]}&autoplay=1"  frameborder="0" allowfullscreen><\/iframe>` : 
                `<iframe width="700" height="393" src="https://www.youtube.com/embed/${self.grabYoutubeId[1]}" frameborder="0" allowfullscreen><\/iframe>` ;
              
          }
          return this.multiResouce.youtube === null ? imgTemplate : youtube;
      }
  }
}
</script>


<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

$debug: false;

.multimedia-box {
    // display: flex;
    overflow-y: scroll;
    overflow-x: scroll;
    @include customized-scroll;
    width: 100%;
    font-size: 0;
    &::-webkit-scrollbar {
        width: 5px;
    }

    & * {
        font-size: initial;
        vertical-align: top;
    }
    & .multi-avatar-box {
        @include debug-line;
        display: inline-block;
        width: 60px;
        height: 50px;
        padding-top: 3px;
        & .multi-avatar {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-size: cover !important;
            border-radius: 50%;
        }
    }

    & .multi-header-box {
        @include debug-line;
        display: inline-block;
        width: calc(99% - 60px);

        & .multi-header {
            // @include debug-line;
            display: flex;
            padding: 5px 10px;

            & .usertag, & .time {
                display: inline-block;
                color: $color-desc;
                margin-right: 10px;
            }
        }

        
    }

    & .multi-content {
        @include debug-line;
        // margin-top: 10px;
        width: 100%;
        // height: 400px;
        max-height: 400px;
        // background-color: yellow;

        & img {
            height: 400px;
        }
    }

}
</style>
