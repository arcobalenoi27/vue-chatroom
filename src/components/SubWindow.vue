<template>
    <div class="sub-box">
        <Multimedia :key="media_source.toString()" v-for="media_source in filterMedia" :multiResouce="media_source" :top="top"></Multimedia>
    </div>
</template>

<script>
import Multimedia from './Multimedia.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'sub-window',

  computed: {
      ...mapGetters(['getPublicMsg']),
      filterMedia () {
          return this.getPublicMsg.filter(function(emt) {
              return emt.data !== null;
          });
      },
      top () {
          return this.getPublicMsg.filter(function(emt, index) {
              return index === 0;
          });
      }
  },

  components: {
      Multimedia
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

$debug: true;

.sub-box {
    // @include debug-line;
    width: 55%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    // @include customized-scroll;
    &::-webkit-scrollbar, .msg-content::-webkit-scrollbar-track {
        display: none;
    }
}
</style>