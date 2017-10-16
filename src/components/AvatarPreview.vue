<template>
  <div class="avatar-preview" v-show="this.avatarUrl !== null">
    <div class="user-avatar" :style="{background: `url(${avatarUrl})  no-repeat`, backgroundPosition: `${offsetX}% ${offsetX}%`}"></div>
    <div class="avatar-position">
        <div class="offset-part">
            <span class="offset-t" :title="$t('SignIn.Avatar_Position.xHint')"> X</span>
            <input type="number" class="offset-x o-field" min="0" max="50" v-model="offsetX">
        </div>
        <div class="offset-part">
            <span class="offset-t" :title="$t('SignIn.Avatar_Position.yHint')"> Y</span>
            <input type="number" class="offset-y o-field" min="0" max="50" v-model="offsetY">
        </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'avatar-preview',

  props: {
      avatarUrl: {
          type: String,
          default: null
      }
  },

  data () {
      return {
          offsetX: 0,
          offsetY: 0
          
      }
  },

  watch: {
      offsetX (newVal) {
          let self = this;
          this.$emit('input', {offsetX: Number(newVal), offsetY: Number(self.offsetY)});
      },
      offsetY (newVal) {
          let self = this;
          this.$emit('input', {offsetX: Number(self.offsetX), offsetY: Number(newVal)});
      }
  }
}
</script>

<style lang="scss" scoped>

@import '../style/color.scss';
@import '../style/setting.scss';

$debug: false;

.avatar-preview {
    @include debug-line;
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    & .user-avatar {
        @include debug-line;
        width: 65px;
        height: 65px;
        background-size: cover !important;
        // border-radius: 50%;
    }

    & .avatar-position {
        @include debug-line;
        width: 60%;
        height: 85px;
        padding-top: 5px;
        & .offset-part {
            height: 40px;
            font-size: 0;
            padding-top: 2px;

            &::after {
                // @include debug-line;
                vertical-align: middle;
                content: '%';
                box-sizing: border-box;
                display: inline-block;
                width: 40px;
                height: 40px;
                font-size: initial;
                padding-top: 10px;
            }
            & > div {
                font-size: initial;
            }
            & .offset-t {
                box-sizing: border-box;
                display: inline-block;
                line-height: 40px;
                width: 35px;
                height: 35px;
                background-color: #eeeeee;
                border-radius: 8px 0 0 8px;
                
                font-size: initial;
                vertical-align: middle;
            }
            & .o-field {
                vertical-align: middle;
                box-sizing: border-box;
                display: inline-block;
                width: 50px;
                height: 35px;
                padding: 6px 0 6px 10px;
            }
        }
    }

}
</style>

