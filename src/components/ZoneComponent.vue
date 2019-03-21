<template>
  <div v-if="zone">
    <p><span style="font-size: 1.5em; font-weight: bold;">{{zone.countryName}}</span> ({{zone.zoneName}})</p>
    <p>{{formattedDate}}</p>
    <button @click="refresh">Reload</button>
  </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import { Zone } from '../models/pojo'

@Component
export default class TimeZone extends Vue {
  @Prop()
  private zone?: Zone

  get formattedDate () {
    return this.zone && new Date(this.zone.timestamp*1000).toLocaleString()
  }

  @Emit('refresh')
  private refresh () {
    return true
  }
}
</script>
