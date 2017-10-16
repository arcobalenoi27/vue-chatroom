<template>
  <div class="side-feature-bar">
      <div class="features" @click.stop="toggleLangSetting()">
          <Icon class="feature-icon" name="tasks"></Icon>
          <span class="feature-text">{{$t('SignIn.LanguageSelect')}}</span>
          <LanguageSelector :isSetting="isSetLang" />
      </div>
      <div class="features">
          <Icon class="feature-icon" name="gavel"></Icon>
          <span class="feature-text">
            {{$t('Feature.constructing')}}
          </span>
          </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import LanguageSelector from './LanguageSelector.vue'

export default {
  name: 'side-feature-bar',

  data() {
      return {
          isSetLang: false
      }
  },

  methods: {
      toggleLangSetting () {
          this.isSetLang = !this.isSetLang;
      }
  },

  components: {
      Icon,
      LanguageSelector
  }
}
</script>


<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';


$debug: true;

.side-feature-bar {
    // @include debug-line;
    width: 25vw;
    height: 10vh;
    display: flex;
    justify-content: flex-start;

    & .features {
        @include noSelect;
        position: relative;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border: solid 1px darken(#eeeeee, 5);
        background-color: $lang-bgc;
        color: $color-feature;
        font-size: 20px;
        cursor: pointer;
        & .feature-icon {

        }

        & .feature-text {
            margin-left: 10px;
        }

        &:hover {
            transition: all 0.5s;
            background-color: darken($lang-bgc, 5);
            color: white;
        }
    }
}

</style>

