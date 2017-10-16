<template>
  <div class="container" :style="dynamicStyle">
      <MeetingBox :key="meeting.id" v-for="(meeting, index) in selectMeetingSetting()" :meeting="meeting" :index="index" :meetingSize="Meetings.length"/>
  </div>
</template>

<script>
import MeetingBox from './MeetingBox.vue'
import _ from 'lodash'

export default {
  name: 'meeting-boxs',

  data () {
      return {
          selectMeetings: []
      }
  },

  props: {
      Meetings: {
          type: Array,
          default: []
      },
      selective: {
          type: Array,
          default: []
      }
  },
  computed: {
      calculateWidth () {
          return this.Meetings.length * 330;
      },
      dynamicStyle () {
          return {
              width: `${this.calculateWidth}px;`
          }
      },
      selectMeetingData() {
        let self = this;
        let result = [];
        this.selective.forEach(function (element) {
            let item = self.Meetings.filter(function(emt) {
                return emt.id ===  element.id;
            });
            result.push(item[0]);
        }); 
        this.selectMeetings = result;
      }
  },

  methods: {
      selectMeetingSetting () {
        let self = this;
        let result = [];
        this.selective.forEach(function (element) {
            let item = self.Meetings.filter(function(emt) {
                return emt.id ===  element.id;
            });
            result.push(item[0]);
        }); 
        // this.selectMeetings = result;
        return result;
      }
  },

  watch: {
      Meetings() {
          this.selectMeetingSetting();
      }
  },

  
  components: {
      MeetingBox
  }
}
</script>

<style lang="scss" scoped>
$debug: false;

@mixin debug-line {
    @if $debug == true {
        border: 1px solid red;
    }
}

.container {
    @include debug-line;
    position: absolute;
    bottom: 0;
    right: 0;
    vertical-align: bottom;
}

</style>

