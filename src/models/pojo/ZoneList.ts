import {ZoneSummary} from './ZoneSummary'

export interface ZoneList {
    status: string
    message: string
    zones: Array<ZoneSummary>
}
