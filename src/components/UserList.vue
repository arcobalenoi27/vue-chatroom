<template>
    <div class="side-wrap">
        <div class="side">
            <div class="search-bar">
                <input type="text" :placeholder="$t('chatroomSetting.SearchHint')" class="search" v-model="keyword"/>
            </div>
            <div class="userList">
                <div :key="user.toString()" class="user-items" v-for="(user, index) in search || getUserList" @click.stop="popupMeetingBox(user)">
                <div class="avatar" :style="{background: `url(${user.avatar}) no-repeat`, backgroundSize: 'cover', backgroundPosition: `${user.avatarPos.offsetX}% ${user.avatarPos.offsetY}%`}"></div>
                <div class="user-profile">
                    <div class="name"> <span class="text">{{user.name}}</span></div>
                    <div class="status">
                    <!-- <div class="unread" >{{ unreadIsZero(index) ? ' ' : unreadNum(index)}}</div> -->
                    <div class="tag">{{`@${user.accountId}`}}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <slot>
            
        </slot>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'user-list',

  data () {
      return {
          keyword: ''
      }
  },

  computed: {
      ...mapGetters(['getUserList', 'getMeetingsData']),
      avatarImage () {
          return {
              background: `url(${this.getUserList.avatar})`
          };
      },
      search () {
          let result = this.getUserList;
          if (this.getUserList !== null) {
              let self = this;
              result = this.getUserList.filter( (elemt, index) => {
                  let hit = new RegExp(`^${self.keyword}`, 'g').test(elemt.name.toLowerCase());
                  return hit;
              });
          }
            return result;
      }
  },
  methods: {
      ...mapActions(['addSelectivePersonalMessage']),
      popupMeetingBox (user) {
          this.addSelectivePersonalMessage({id: user.id});
      },
      unreadIsZero (index) {
          return this.unreadNum(index) === 0;
      },
      unreadNum (index) {
          return this.getMeetingsData[index].conversation.filter(function(msg) {
              return msg.message.isUnread;
          }).length;
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/color.scss';

$debug: false;

@mixin debug-line {
  @if $debug == true {
    border: solid 1px red;
  }
  
}


.side {
  @include debug-line;
  box-sizing: border-box;
  width: 25vw;
  height: 80vh;
  background-color: #fff;
  .search-bar {
    /* @include debug-line; */
    display: inline-block;
    width: 100%;
    height: 50px;
    & .search {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px 0px 5px 25px;
      font-size: 18px;
      border: solid 1px transparent;
      border-right: solid 1px #efefef;
    }
  }
  
  & .userList {
    // @include debug-line;
    // border: solid 1px green;
    display: inline-block;
    overflow-y: scroll;
    width: 100%;
    height: 91%;
  }
  
  & .user-items {
    // @include debug-line;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
    cursor: pointer;
    padding: 3px 8px 8px;
    background-color: lighten($modal-bgc, 12);
        &:hover {
            background-color: $modal-bgc;
        }
    
    & .avatar {
      display: inline-block;
      vertical-align: top;
      width: 65px;
      height: 65px;
    //   background: url(https://05ed4b7ccec8a4635d521561-b0qmvq80wgkrdueci.netdna-ssl.com/wp-content/uploads/2017/07/Princess-Principal-ep2-Vox-Artes-4.jpg);
      background-position: 50% 50%;
      background-size: cover !important;
      border-radius: 50%;
    }
    
    
    & .user-profile {
      /* @include debug-line; */
      display: inline-block;
      vertical-align: top;
      width: 65%;
      height: 100%;
      margin-left: 10px;
      
      
      & .status, & .name {
        /* @include debug-line; */
        width: 100%;
        height: 50%;
      }
      
      
      & .name {
        /* @include debug-line; */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }
      
      & .status {
        display: flex;
        align-items: center;
        justify-content: space-around;
        & .unread, & .tag {
          width: 20px;
          height: 23px;
          
        }
        
        & .unread {
          background-color: red;
          color: #fff;
        }
        
        & .tag {
          color: #bbb;
        //   background-color: lighten(green, 30);
        }
      }
      
    }
  }
}

.userList::-webkit-scrollbar {
    width: 8px;
}

.userList::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0, .2);
}


.userList::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    background: $modal-bgc;
    // display: none;
}
</style>

