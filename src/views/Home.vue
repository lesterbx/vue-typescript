<template>
  <div class="home">
    <div>
      <ZoneListComponent :zones="zones" @select="selectedZone"></ZoneListComponent>
      <ZoneComponent v-if="zone" :zone="zone" @refresh="refresh"></ZoneComponent>
    </div>
    <div>
      <h2 v-if="error" style="text-align: center">{{error}}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ZoneComponent from '@/components/ZoneComponent.vue'
import ZoneListComponent from '@/components/ZoneListComponent.vue'
import { Zone, ZoneList } from '@/models/pojo'
import { Action, Getter } from 'vuex-class'

  @Component({
    components: {
      ZoneComponent,
      ZoneListComponent
    }
  })
export default class Home extends Vue {
    @Getter('getError')
    private error?: string

    @Getter('getZoneList')
    private zones?: ZoneList

    @Getter('getCurrentZone')
    private zone?: Zone

    @Action('fetchZoneList')
    private fetchZoneList: any

    @Action('fetchZone')
    private fetchZone: any

    created () {
      this.fetchZoneList()
    }

    private selectedZone (zone: string) {
      this.fetchZone(zone)
    }

    private refresh () {
      this.fetchZone(this.zone.zoneName)
    }
}
</script>
