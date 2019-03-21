import {ZoneList} from "./ZoneList";
import {Zone} from "./Zone";

export interface State {
  zoneList?: ZoneList,
  currentZone?: Zone,
  error?: string
}
