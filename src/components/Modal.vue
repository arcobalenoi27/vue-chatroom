<template>
    <div class="modal-container">
        <!-- HEADER -->
        <div class="modal-header">
            <h3 class="user-hint">{{$t('SignIn.ReqestLoginInfo_Hint')}}</h3>
        </div>
        <!-- FORM -->
        <div class="user-data">
            <div class="username field-wrap">
                <label>
                    <div :class="['icon-wrap', {error: isDuplicateName}]"  :title="$t('SignIn.Username')">
                        <icon class="user-icon" name="id-card-o"></icon>
                    </div>
                    <input :class="['username user-field', {'error-frame' : isDuplicateName}]" type="text" :placeholder="$t('SignIn.UsernameHint')" v-model="username" @keyup.stop="checkDuplicateName()">
                </label>
                <div class="system-hint-box" v-if="isDuplicateName">
                    <span :class="['system-hint', {  error: isDuplicateName }]">{{$t('SignIn.inputErrorHint')}}</span>
                </div>
            </div>
            <!--  -->
            <div class="recog-id field-wrap">
                <label>
                    <div :class="['icon-wrap', { error: isDuplicateACID, typeError:! isCorrectId }]" :title="$t('SignIn.RecognizedId')">
                        <icon class="user-icon" name="id-badge"></icon>
                    </div>
                    <input type="text" :class="['recog-id user-field', { 'error-frame': isDuplicateACID, typeErrorFrame: !isCorrectId }]" :placeholder="$t('SignIn.recogIDHint')" v-model="accountId" @keyup.stop="checkDuplicateACID()">
                </label>
                <div class="system-hint-box" v-if="isDuplicateACID || !isCorrectId">
                    <span :class="['system-hint', {  error: isDuplicateACID, typeError: !isCorrectId }]">{{$t('SignIn.idErrorHint')}}</span>
                </div>
            </div>

            <div :class="['avatar field-wrap', {error: urlValid }]">
                <label>
                    <div class="icon-wrap"  :title="$t('SignIn.Avatar')">
                        <icon class="user-icon" name="user"></icon>

                    </div>
                    <input :class="['avatar user-field', { 'error-frame': urlValid }]" type="text" :placeholder="$t('SignIn.Avatar_URL_Hint')" v-model="avatar_url" @keyup.stop="checkUrl()">
                </label>
            </div>
            <!-- AVATAR PREVIEW -->

            <AvatarPreview :avatarUrl="avatar_url" v-model="avatar_pos" />
            <!-- LANGUAGE SETTING -->
            <div class="language">
                <div class="icon-wrap" :title="$t('SignIn.LanguageSelect')">
                    <icon class="lang-icon" name="language"></icon>
                </div>
                <div class="language2select">
                    <label>
                        <input type="radio" class="lang-radio" name="language" value="en">
                        <div class="lang-options" data-lang="en" @click.stop="setLang()">
                            <img src="../assets/UK.png" alt="English" :title="$t('SignIn.English')" data-lang="en">
                        </div>
                    </label>
                    <label>
                        <input type="radio" class="lang-radio" name="language" value="jp">
                        <div class="lang-options" data-lang="jp" @click.stop="setLang()">
                            <img src="../assets/Jp.png" alt="Japanese" :title="$t('SignIn.Japanese')" data-lang="jp">
                        </div>
                    </label>
                    <label>
                        <input type="radio" class="lang-radio" name="language" value="tw">
                        <div class="lang-options" data-lang="tw"  @click.stop="setLang()">
                            <img src="../assets/Tw.png" alt="Tranditional Chinese" :title="$t('SignIn.TC')" data-lang="tw">
                        </div>
                    </label>
                </div>
            </div>
            
        </div>
        <!-- CALL TO ACTION -->
        <div class="login-wrap">
            <div class="login-btn" @click.stop="login()">{{$t('SignIn.SignIn')}}</div>

        </div>
    </div>
</template>

<script>
import AvatarPreview from './AvatarPreview.vue'
import {mapGetters, mapActions} from 'vuex'
import Icon from 'vue-awesome/components/Icon'
import _ from 'lodash'
import * as helps from '../helps/helps.js'

export default {
  name: 'modal',

  props: {
      value: {
          type: Boolean
      }
  },

  data () {
      return {
          username: '',
          accountId: '',
          avatar_url: '',
          avatar_pos: {},
          isDuplicateName: false,
          isDuplicateACID: false,
          urlValid: false,
          idIsDirty: false
      }
  },
  computed: {
      ...mapGetters(['getSocket', 'getValidations', 'getUserList']),
      canCrop () {
          return this.avatar_url.length !== 0;
      },
      cropStyle () {
          return {
              background: `url(${this.avatar_url})`
          }
      },
      isEmptyName () {
          return this.getValidations.checkEmptyString(this.username);
      },
      isEmptyID () {
          return this.getValidations.checkEmptyString(this.accountId);
      },
      isCorrectUrl () {
          return this.getValidations.checkImgUrl(this.avatar_url);
      },
      isCorrectId () {
          let self = this;
          return self.idIsDirty === false ? true : helps.checkId(self.accountId);
      },
      test () {
          return helps.checkId(self.accountId);
      }
  },

  methods: {
      ...mapActions(['setLanguage']),
      setLang () {
          this.setLanguage(event.target.dataset.lang);
      },
      login () {
          if (this.avatar_url.trim() === '') {
              this.avatar_url = helps.randomImages();
          }
          let userProfile = {
              name: this.username.trim(),
              accountId: this.accountId.trim(),
              avatar: this.avatar_url,
              avatarPos: this.avatar_pos
          };
          if (!this.isDuplicateName && !this.isDuplicateACID && !this.isEmptyName && !this.isEmptyID) {
              this.getSocket.emit('login', userProfile);
            //   Close the modal
              this.$emit('input', false);
              this.clearForm();
          } else {
              alert(this.$t('SignIn.LoginError'));
          }
      },
      clearForm () {
          /* Clear all of data in the form that user input */
          this.username = '';
          this.avatar_url = '';
      },
      checkDuplicateName () {
          let self = this;
          let index = _.findIndex(self.getUserList, { name: self.username.trim() });
        //   console.log(index);
          let isDuplicate = (index === -1) ? false : true;
          this.isDuplicateName = isDuplicate;
      },
      checkDuplicateACID () {
          let self = this;
          let index = _.findIndex(self.getUserList, { accountId: self.accountId.trim() });
          let isDuplicate = (index === -1) ? false : true;
          this.idIsDirty = true;
          this.isDuplicateACID =isDuplicate;
      },
      checkUrl() {
          this.urlValid = !this.isCorrectUrl;
      }
  },

  components: {
      Icon,
      AvatarPreview
  }
}
</script>

<style lang="scss" scoped>
@import '../style/color.scss';
@import '../style/setting.scss';

$debug: false;


.modal-container {
    box-sizing: border-box;
    width: 400px;
    // height: 530px;
    height: auto;
    position: absolute;
    z-index: 9;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: $modal-bgc;
    border-radius: 5px;
    font-family: $font-setting;
    padding: 0px 20px 30px 20px;

    & .login-wrap {
        margin-top: 50px;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
    }

    & .login-btn {
        @include debug-line;
        @include noSelect;
        box-sizing: border-box;
        cursor: pointer;
        padding: 15px 20px;
        width: 120px;
        height: 50px;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 1px rgba(0,0,0, .3);
        background-color: $lang-bgc;

        &:hover {
            transition: background-color 0.5s;
            background-color: lighten($lang-bgc, 5);
        }
        &:active {
            box-shadow: none;
        }
    }
}


.modal-header {
    @include debug-line;
    & .user-hint {
        
    }
}


.user-data {
    & .field-wrap {
        // display: flex;
        // align-items: center;
        height: 40px;
        margin-bottom: 10px;
        
        @include debug-line;

        &:first-child, &:nth-child(2) {
            margin-bottom: 25px;
        }
        
        &  * {
            box-sizing: border-box;
            vertical-align: top;
            
            font-size: 0;
        }
        &  .icon-wrap {
            display: inline-block;
        }
        & > * > * {
            font-size: initial;
        }
        & .user-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #fff;
            border-radius: 5px 0px 0px 5px;
            border-width: 0px;
            box-shadow: 0px 0px 0px 1px   #aaaaaa;
            padding: 10px;
        }
        & .user-field {
            display: inline-block;
            box-sizing: border-box;
            width: 80%;
            height: 100%;
            font-size: 14px;
            border-radius: 0px 5px 5px 0px;
            padding-left: 9px;
            border-color: transparent;
            border: solid 1px transparent;
            box-shadow: 0px 0px 0px 1px  #aaaaaa;
        }
       
        
    }

    & .lang-icon {
        box-sizing: border-box;
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 5px;
        border-width: 0px;
        box-shadow: 0px 0px 0px 1px   #aaaaaa;
        padding: 10px;
    }

    & .language {
        @include debug-line;
        width: 100%;
        height: 104px;
        margin-top: 18px;
        & .language2select {
            @include debug-line;
            width: 100%;
            height: 64px;
            & .lang-options {
                @include debug-line;
                display: inline-block;
                background-color: $lang-bgc;
                width: 70px;
                height: 64px;
                margin-top: 10px;
                margin-right: 10px;
                cursor: pointer;
                opacity: 1;
                transition: background-color 0.5s;
                &:hover {
                    background-color: darken($lang-bgc, 30);
                }
            }
            & .lang-options.selected {
                background-color: darken($lang-bgc, 30);
            }
            & .lang-radio {
                display: none;
            }
            & .lang-radio:checked + .lang-options {
                background-color: darken($lang-bgc, 30);
            }
        }
    }

    & .avatar-preview {
        @include debug-line;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        & .user-avatar {
            @include debug-line;
            width: 65px;
            height: 65px;
        }

        & .avatar-position {
            @include debug-line;
            width: 60%;
            height: 80px;
        }

    }
    
    & .system-hint-box {
        @include debug-line;
        height: 15px;
        
        & .system-hint {
            display: inline-block;
            width: 100%;
            height: 100%;
            font-size: 13px;
            text-align-last: left;
            padding-left: 20px;
            padding-top: 5px;
        }
    }

}

.error {
    color: $error;
}

.typeError {
    color: $error;
}

.typeErrorFrame {
    border: 1px solid $error !important;
}

.error-frame {
    border: 1px solid $error !important;
}

input.user-field:focus {
    outline: none;  
}



</style>
