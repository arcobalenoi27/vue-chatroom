<template>
    <div class="post-msg-box">
        <div class="post-avatar-box">
            <div class="post-avatar" :style="{ background: `url(${this.post.avatar})`, backgroundPosition: `${this.post.avatarPos.offsetX}% ${this.post.avatarPos.offsetY}%` }">

            </div>
        </div>
        <div class="post-part">
            <div class="post-header">
                <div class="post-author-box">
                    <a class="post-links">
                        <span class="post-name"><strong>{{this.post.name}}</strong></span>
                    </a>
                    <span class="usertag-id">{{`@${this.post.accountId}`}}</span>
                    <a class="post-links">
                        <span class="time">{{momentLoc(`${this.post.time}`)}}</span>
                    </a>
                </div>
            </div>
            <div class="post-content">
                <p class="msg-content" v-html="postFormation(post.postMsg)">
                    
                </p>
            </div>
        </div>
    </div>
</template>

<script>
// import Icon from 'vue-awesome/components/Icon';
import {mapGetters, mapActions} from 'vuex';
import moment from 'moment';

export default {
  name: 'public-message',

  props: {
      post: {
          type: Object,
          default: {
              name: '',
              avatar: '',
              avatarPos: {
                  offsetX: 0,
                  offsetY: 0
              },
              time: '',
              postMsg: ''
          }
      }
  },

  computed: {
      ...mapGetters(['getUserSelf', 'getPublicMsg', 'getValidations'])
  },

  methods: {
      momentLoc (s) {
          return moment(s).format('MMM DD YYYY, HH:mm');
      },
      postFormation (s) {
          let self = this;
          let isNotChange = this.getValidations.detectImgUrl(s) == s
          return isNotChange ? this.getValidations.checkUrlLink(s) : this.getValidations.detectImgUrl(s);
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/setting.scss';
@import '../style/color.scss';

$debug: true;

* {
    box-sizing: border-box;
    // display: unset;
}

.post-msg-box {
    // @include debug-line;
    width: 100%;
    height: auto;
    font-size: 0;
    border-bottom: 1px solid $post-border-color;
    & div {
        vertical-align: top;
        font-size: initial;
    }
    & .post-avatar-box {
        // @include debug-line;
        display: inline-block;
        width: 80px;
        height: 80px;
        // background-color: red;
        padding: 5px 7.5px 25px 7.5px;
        & .post-avatar {
            display: inline-block;
            width: 60px;
            height: 60px;
            // background: url(https://images.creators.co/image/upload/c_fill,e_sharpen:50,h_550,q_auto:good,w_960/xgrcal0mxm22dka3zvrl.jpg);
            background-size: cover !important;
            border-radius: 50%;
            
        }
    }

    & .post-part {
        // @include debug-line;
        display: inline-block;
        width: calc(99% - 80px);

        // height: 80px;

        & .post-header {
            // @include debug-line;
            display: inline-block;
            width: 100%;
            height: 40px;
            display: flex;
            // background-color: #eeeeee;

            & * {
                font-size: initial;
            }
            & span, & > div {
                display: inline-block;
            }

            & .post-author-box {
                // @include debug-line;
                display: flex;
                align-items: flex-start;
                width: 100%;
                height: 30px;
                padding: 10px 10px;
                & .post-name, & .usertag-id {
                    vertical-align: middle;
                    text-align: left;
                    margin-right: 5px;
                }
                & .usertag-id, & .time {
                    vertical-align: top;
                    color: $color-desc;
                    font-size: 0.9em;
                    margin-right: 10px;
                }

                & .usertag-id {
                    vertical-align: bottom;
                }

                & a.post-links:hover  {
                    color: $hover-blue;
                    & .time {
                        color: $hover-blue;
                    }
                }
            }

            & .usertag-id-box {
                // @include debug-line;
                width: 25%;
                height: 40px;
                padding: 5px 10px;
                & .usertag-id {
                    // @include debug-line;
                    width: 100%;
                    height: 100%;
                    text-align: left;
                }
            }
        }

        & .post-content {
            // @include debug-line;
            width: 100%;
            height: auto;
            & .msg-content {
                width: 100%;
                max-height: 200px;
                padding: 0;
                margin: 0;
                text-align: justify;
                padding: 0px 10px 15px;
                overflow-y: scroll;
                &::-webkit-scrollbar {
                    display: none ;
                }
            }
        }
    }
}

.msg-content::-webkit-scrollbar, .msg-content::-webkit-scrollbar-track {
    display: none;
}
</style>
