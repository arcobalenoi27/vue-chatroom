<template>
    <div class="chatroom-container">
        <ChatHeader />
        <SystemHintInfo v-if="generateSystemInfo().show" :animationSetting="generateSystemInfo()" />
        <UserList>
            <SideFeatureBar />
        </UserList>
        
        <MainFrame :isLogin="isDisplay"></MainFrame>
        <MeetingBoxs :Meetings="getMeetingsData" :selective="getSelectiveMeetings" />
        <!-- <MeetingBox :personalmsg="personalmsg" /> -->
        <MaskContainer :isDisplay="isDisplay">
            <Modal v-model="isDisplay" />
        </MaskContainer>
        <YoutubeResume v-show="YoutubeResume"></YoutubeResume>
    </div>
    
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MeetingBox from './MeetingBox.vue'
import MeetingBoxs from './MeetingBoxs.vue'
import ChatHeader from './ChatHeader.vue'
import SystemHintInfo from './SystemHintInfo.vue'
import MaskContainer from './MaskContainer.vue'
import Modal from './Modal.vue'
import UserList from './UserList.vue'
import SideFeatureBar from './SideFeatureBar.vue'
import MainFrame from './MainFrame.vue'
import YoutubeResume from './YoutubeResume.vue'

export default {
    name: 'chatroom',
    data () {
        return {
            personalmsg: {
                meetingName: 'Shibuya Group',
                unread: 0,
            },
            isDisplay: true,
            YoutubeResume: true
            
        }
    },

    computed: {
        ...mapGetters(['getMeetingsData', 'getSelectiveMeetings', 'getSystemInfo'])
    },

    methods: {
        generateSystemInfo () {
            return this.getSystemInfo;
        }
    },

    components: {
        MeetingBox,
        MeetingBoxs,
        ChatHeader,
        MaskContainer,
        Modal,
        UserList,
        SideFeatureBar,
        MainFrame,
        SystemHintInfo,
        YoutubeResume
    }
}
</script>

<style lang="scss" scoped>
    .chat {
        color: red;
    }

    .chatroom-container {
        display: flex;
        justify-content: flex-start;
        position: relative;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        padding-top: 71.51px;
    }
</style>
