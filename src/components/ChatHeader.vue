<template>
  <div class="header">
        <div class="chatter-wrap">
            <div class="chatter">{{$t('chatroomSetting.UserText')}}</div>
        </div>
        <div class="room-wrap">
            <div class="room-name">{{$t('chatroomSetting.publicRoom')}}</div>
        </div>
        <div class="account-wrap">
            <div class="account-info"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'chat-header'
}
</script>

<style lang="scss" scoped>

@import "../style/color.scss";
@import '../style/setting.scss';

$debug: false;

@mixin debug-border {
  @if $debug == true {
    border: solid 1px red;
  }  
}



* {
  vertical-align: top;
  box-sizing: border-box;
  font-family: $font-setting;
}



.header {
  @include debug-border;
  position: fixed;
  z-index: 7;
  top: 0;
  vertical-align: top;
  box-sizing: border-box;
  width: 100vw;
  min-height: 71.51px;
  // height: 10vh;
  background: linear-gradient(55deg, $color-purple 0%, $light-blue 95%);
}

.chatter-wrap, .room-wrap, .account-wrap {
  display: inline-block;
  height: 100%;
  padding: 1em 2em;
  user-select: none;
  & * {
    font-size: 1.5em;
  
  }
}

.chatter-wrap {
  @include debug-border;
  box-sizing: border-box;
  max-width: 25%;
  min-width: 25%;
}

.room-wrap {
  @include debug-border;
  box-sizing: border-box;
  width: 64%;
  
}

.account-wrap {
  @include debug-border;
  box-sizing: border-box;
  width: 10%;
}


.aaa {
  padding-top: 10vh;
  width: 100vw;
  height: 120vh;
  background-color: #1ebbff;
}


</style>

