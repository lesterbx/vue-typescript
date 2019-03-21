<template>
  <div>
    <div v-if="!zones">
      <p>Cargando...</p>
    </div>
    <div v-if="zones">
      <label for="zone-select">Time Zones:</label>
      <br/>
      <select id="zone-select" @change="selected">
        <option v-for="zone in zones.zones" :key="zone.zoneName" :value="zone.zoneName">{{zone.countryName}}
          ({{zone.zoneName}})
        </option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { ZoneList } from '../models/pojo'

@Component
export default class ZoneListComponent extends Vue {
  @Prop() private zones?: ZoneList

  @Emit('select')
  private selected (event: any) {
    return event.target.value
  }
}
</script>
