<template>
    <div>
        <transition
            leave-active-class="fade-leave-active">
            <div :class="['sys-info-box', { login: this.isLogin, logout: this.isLogout}]" v-if="show">
                    <p class="sys-info">
                        <span v-if="!isChatLimit">{{parseMessage}}</span> 
                        <span v-if="isLogin">{{$t('SystemInfo.Login')}}</span>
                        <span v-if="isLogout">{{$t('SystemInfo.Logout')}}</span>
                        <span v-if="isChatLimit">{{$t('SystemInfo.UpToChatLimit')}}</span>
                    </p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'system-hint-info',

  data () {
      return {
          show: true,
          message: this.animationSetting.message
      }
  },

  props: {
      animationSetting: {
          type: Object,
          default: {
              message: '',
              type: '',
              show: false
          }
      }
  },

  computed: {
      parseMessage () {
          let self = this;
          if (this.animationSetting.type === 'login') {
              return `${self.message}`;
          } else if (this.animationSetting.type === 'logout') {
              return `${self.message}`;
          } else if (this.animationSetting.type === 'chatlimit') {
              return ``;
          } else {
              return `${self.message}`;
          }
      },
      isLogin () {
          let self = this;
          return self.animationSetting.type === 'login';
      },
      isLogout () {
          let self = this;
          return self.animationSetting.type === 'logout';
      },
      isChatLimit () {
          let self = this;
          return self.animationSetting.type === 'chatlimit';
      }
  },

  methods: {
      toggleShow () {
          this.show = !this.show;
      }
  },

  watch: {
      animationSetting (newVal) {
          let self = this;
          this.message = newVal.message;
          this.show = newVal.show;
          setTimeout(function() {
              self.toggleShow();
          }, 250);
          
      }
  },

  mounted () {
      let self = this;
      this.message = this.animationSetting.message;
      this.show = this.animationSetting.show;
      this.toggleShow();
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

.sys-info {
    font-family: $font-setting;
    font-size: 16px;
}

.sys-info-box {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    top: 5px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 300px;
    height: 60px;
    padding: 5px 5px;
    background-color: #eee;
}

.login {
    background-color: lighten(#41D3BD, 20);
}

.logout {
    background-color: lighten(#ff0000 ,20);
}

.fade-leave-active {
    animation: fade 4.5s;
}

@keyframes fade {
    0% {
        opacity: 1;
    }
    20% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}


</style>


