<template>
    <div class="main">
        <MainWindow :isLogin="isLogin"></MainWindow>
        <SubWindow></SubWindow>
    </div>
</template>

<script>
import MainWindow from './MainWindow.vue';
import SubWindow from './SubWindow.vue';


export default {
  name: 'main-frame',

  props: {
      isLogin: {
          type: Boolean
      }
  },

  components: {
      MainWindow,
      SubWindow
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

$debug: true;
.main {
    // @include debug-line;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    width: 75vw;
    height: 89.5vh;
}
</style>

