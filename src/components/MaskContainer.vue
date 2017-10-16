<template>
  <div :class="['mask']" v-show="isDisplay">
      <slot :value="isDisplay"></slot>  
  </div>
</template>

<script>
export default {
  name: 'mask-container',
  props: {
      isDisplay: {
          type: Boolean,
          default: false
      }
  }
}
</script>


<style lang="scss" scoped>
.mask {
    position: absolute;
    z-index: 9;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
}

.hide {
    display: none;
}
</style>
