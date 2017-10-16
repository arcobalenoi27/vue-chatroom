<template>
    <div :class="['youtube-history-box',{expand: !isMini}]">

        <div :class="['youtube-history', { collapse: isMini}]" >
            <iframe v-show="!isMini" width="900" height="580" :src="chooseWhichVideo(getYoutubeHistory.now)" frameborder="0" allowfullscreen></iframe>
            
            <div class="prev" @click.stop="changeYTVideo('prev')">
                <icon class="pn-icon" name="step-backward"></icon>
            </div>
            <div class="next" @click.stop="changeYTVideo('next')">
                <icon class="pn-icon" name="step-forward"></icon>
            </div>
            <div class="yt-panel-switch-box" @click.stop="toggleYTPanel()">
                <icon v-if="isMini" class="switch-icon" name="youtube-play"></icon>
                <icon v-if="!isMini" class="switch-icon scale" name="compress"></icon>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as helps from '../helps/helps.js'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'youtube-resume',

  data () {
      return {
          isMini: true
      }
  },


  computed: {
      ...mapGetters(['getYoutubeHistory']),
      test () {
          return this.isAutoStartVideo(1);
      },
      parsedYoutubeData () {
          let self = this;
          let result = helps.parseYoutubeUrls(self.getYoutubeHistory.history);
          return result;
      }
  },

  methods: {
      ...mapActions(['changeYoutubeVideoIndex']),
      isAutoStartVideo (index) {
          if (this.parsedYoutubeData[index] !== undefined) {
              return this.parsedYoutubeData[index].time !== null;
          }
      },
      embedYoutubeUrl (isAuto, index) {
          let self = this;
          let yt_id;
          let time;
          if (self.getYoutubeHistory.histor !== undefined) {
              }
            yt_id = self.parsedYoutubeData[index].id;
            time = self.parsedYoutubeData[index].time;
          if (!isAuto) {
              return `https://www.youtube.com/embed/${yt_id}`;
          } else {
              return `https://www.youtube.com/embed/${yt_id}?start=${time}&autoplay=1`;
          }
      },
      chooseWhichVideo (index) {
          let isAuto = this.isAutoStartVideo(index);
          return this.embedYoutubeUrl(isAuto, index);
      },
      toggleYTPanel () {
          this.isMini = !this.isMini;
      },
      changeYTVideo (PrevOrNext) {
          this.changeYoutubeVideoIndex(PrevOrNext);
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

$debug: true;
$ani-time: 2.2s;

.youtube-history-box {
    // @include debug-line;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 0;
    width: 100%;
    height: 88vh;
    pointer-events: none;
    
    & .youtube-history {
        // @include debug-line;
        pointer-events: auto;
        box-sizing: border-box;
        position: absolute;
        z-index: 7;
        width: 80%;
        height: 95%;
        padding: 15px 0px;
        background-color: lighten($hover-blue, 45);
        box-shadow: rgba(0, 0, 0, 0.2) -3px -3px 1px 1px inset;
        border-radius: 0  8px 8px 8px;
        transform: translate(0%, 0%);
        transition: transform $ani-time, z-index $ani-time;
        &.collapse {
            transition: transform $ani-time, z-index $ani-time;
            transform: translate(-112.5%, 0%);
        }
        & .prev, & .next {
            // @include debug-line;
            position: absolute;
            width: 50px;
            height: 50px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }

        & .prev {
            left: 8%;
        }

        & .next {
            right: 8%;
        }

    }


    & .youtube-history.collapse {
        z-index: 3;
    }
    & .yt-panel-switch-box {
        // @include debug-line;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 50px;
        right: -60px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        color: red;
        background-color: $lang-bgc;
        // border: 2px solid lighten($hover-blue, 30);
        border-left: none;
        &:hover {
            color: lighten(red, 20);
        }
        & .scale {
            color: $hover-blue;
            background-color: #fff;
            &:hover {
                color: lighten($hover-blue, 32);
            }
        }
        & .switch-icon {
            width: 80%;
            height: 80%;
        }
    }
    
}

.pn-icon {
    width: 100%;
    height: 100%;
}

.youtube-history-box.expand {
    z-index: 6 ;
}


</style>

