export interface Official {
  official: string
}

export interface AreaName extends Official {
  native: {
    [languageCode: string]: Official
  }
}

export interface Area {
  areacodename: string
  name: AreaName
  region: string
  subregion: string
  latlng: [number, number]
  area: number
  flag: string
}

export type Areas = Area[]

declare const areas: Areas

export default areas
