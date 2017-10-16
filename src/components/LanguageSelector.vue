<template>
    <div :class="['language-chooser-container', { setting: isSetting }]" v-show="isSetting">
        <div class="lang-item">
            <label>
                <input type="radio" class="lang-radio" name="language" value="en">
                <div class="lang-options" data-lang="en" @click.stop="setLang()">
                    <img src="../assets/UK.png" alt="English" :title="$t('SignIn.English')" data-lang="en">
                </div>
            </label>
        </div>
        <div class="lang-item">
            <label>
                <input type="radio" class="lang-radio" name="language" value="jp">
                <div class="lang-options" data-lang="jp" @click.stop="setLang()">
                    <img src="../assets/Jp.png" alt="Japanese" :title="$t('SignIn.Japanese')" data-lang="jp">
                </div>
            </label>
        </div>
        <div class="lang-item">
            <label>
                <input type="radio" class="lang-radio" name="language" value="tw">
                <div class="lang-options" data-lang="tw"  @click.stop="setLang()">
                    <img src="../assets/Tw.png" alt="Tranditional Chinese" :title="$t('SignIn.TC')" data-lang="tw">
                </div>
            </label>

        </div>

        <!--  -->
        <div class="down-sign">
            <Icon class="down-expand" name="caret-down"></Icon>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'language-selector',

  props: {
      isSetting: {
          type: Boolean,
          default: false
      }
  },

  methods: {
       ...mapActions(['setLanguage']),
      setLang () {
          this.setLanguage(event.target.dataset.lang);
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

$debug: false;


.language-chooser-container{
    @include debug-line;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 99%;
    height: 300px;
    opacity: 0;
    background-color: lighten($lang-bgc, 10);


    & .lang-radio {
        display: none;
    }

    & .lang-radio:checked + .lang-options {
        background-color: darken($lang-bgc, 5);
    }

    & .lang-item {
        @include debug-line;
        width: 80%;
    }

    

    & .down-sign {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 100%);
        bottom: 0px;
        
        color: white;

        & .down-expand {
            width: 25px;
            height: 25px;
        }

    }
}

.setting {
    transition-delay: 0.5s;
    transition: opacity 1.8s;
    opacity: 1;
}

</style>

