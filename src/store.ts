import Vue from 'vue'
import Vuex from 'vuex'
import {State, Zone, ZoneList} from './models/pojo'
import config from './config.json'
import axios, {AxiosError, AxiosResponse} from 'axios'
import {Mutations} from '@/models/enum';

Vue.use(Vuex)

// Constantes con los nombres de las mutaciones
const {SET_ZONE_LIST, SET_CURRENT_ZONE, SET_ERROR, INCREMENT_ZONE_TIME} = Mutations

//Se inicializa una instancia de axios para hacer peticiones
const axiosInstance = axios.create({
  baseURL: config.timeDbUrl,
  params: {
    key: config.timeDbKey,
    format: 'json',
  }
})

// Se define el store con el tipo del state
export default new Vuex.Store<State>({
  state: {
    zoneList: undefined,
    currentZone: undefined,
    error: undefined
  },

  getters: {
    getZoneList(state: State): ZoneList | undefined {
      return state.zoneList
    },
    getCurrentZone(state: State): Zone | undefined {
      return state.currentZone
    },
    getError(state: State): string | undefined {
      return state.error
    }
  },

  mutations: {
    [SET_ZONE_LIST](state: State, zones: ZoneList): void {
      state.zoneList = zones
    },
    [SET_CURRENT_ZONE](state: State, zone: Zone): void {
      state.currentZone = zone
    },
    [SET_ERROR](state: State, error: string): void {
      state.error = error
    },
    [INCREMENT_ZONE_TIME](state: State): void {
      if (state.currentZone) {
        state.currentZone.timestamp = state.currentZone.timestamp + 1
      }
    }
  },

  actions: {
    //Obtiene la lista de zonas
    fetchZoneList({commit}) {
      axiosInstance.get('list-time-zone', {
        params: {
          fields: 'countryName,zoneName'
        }
      }).then((response: AxiosResponse) => {
        if (response.status != 200) {
          commit(SET_ERROR, response.statusText)
        } else {
          commit(SET_ERROR, null)
          commit(SET_ZONE_LIST, response.data)
        }
      })
    },
    //Obtiene una zona concreta
    fetchZone({state, commit}, zoneName: string) {
      axiosInstance.get('get-time-zone', {
        params: {
          by: 'zone',
          fields: 'countryName,zoneName,timestamp',
          zone: zoneName
        }
      }).then((response: AxiosResponse) => {
        if (response.status != 200) {
          commit(SET_ERROR, response.statusText)
        } else {
          commit(SET_ERROR, null)
          commit(SET_CURRENT_ZONE, response.data)
        }
      }).catch((error: AxiosError) => {
        commit(SET_ERROR, error.message)
      })
    }
  }
})
