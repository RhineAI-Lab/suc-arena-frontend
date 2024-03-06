import CreateConfig from "@/app/api/class/create-config";
import {proxy} from "valtio";
import DataService from "@/app/service/data-service";

export default class Api {

  static URL = 'http://10.176.64.187:8080'

  static data = proxy({
    sid: '',
    last: -1,
  })

  static async create(config: CreateConfig) {
    try {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      const raw = config.toRaw()
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
      }
      console.log('API REQUEST  /api/v1/create', requestOptions)

      let res = await fetch(this.URL + "/api/v1/create", requestOptions)
      if (res.status === 200) {
        const json = await res.json()
        json['code'] = 200
        this.data.sid = json['sid']
        return json
      } else {
        console.warn(res)
        return this.NETWORK_ERROR_RESPONSE
      }
    } catch (e) {
      console.error(e)
      return this.NETWORK_ERROR_RESPONSE
    }
  }

  static async get(): Promise<any[]> {
    try {
      const url = this.URL + "/api/v1/get?sid=" + this.data.sid + '&last=' + this.data.last
      const requestOptions = {
        method: 'GET',
      }
      console.log('API REQUEST  /api/v1/get')

      let res = await fetch(url, requestOptions)
      if (res.status === 200) {
        let json = await res.json()
        if (json.length > 0) {
          this.data.last = json[json.length - 1]['id']
        }
        return json
      } else {
        console.warn(res)
        return []
      }
    } catch (e) {
      console.error(e)
      return []
    }
  }

  static async updateSettings(): Promise<any> {
    let settings = await Api.getSettings()
    console.log(settings)
    if (settings && settings.characters && settings.resources) {
      DataService.settings.characters = settings.characters
      DataService.settings.resources = settings.resources
    }
  }

  static async getSettings(): Promise<any> {
    try {
      const url = this.URL + "/api/v1/getsettings?sid=" + this.data.sid + '&last=' + this.data.last
      const requestOptions = {
        method: 'GET',
      }
      console.log('API REQUEST  /api/v1/getsettings')

      let res = await fetch(url, requestOptions)
      if (res.status === 200) {
        return await res.json()
      } else {
        console.warn(res)
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }

  static async addResource(data: any): Promise<any> {
    try {
      const url = this.URL + "/api/v1/addresource"
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      }
      console.log('API REQUEST  /api/v1/addresource')

      let res = await fetch(url, requestOptions)
      if (res.status === 200 || res.status === 201) {
        return await res.json()
      } else {
        console.warn(res)
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }

  static async addCharacter(data: any): Promise<any> {
    try {
      const url = this.URL + "/api/v1/addcharacter"
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      console.log('Request Body', data)
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      }
      console.log('API REQUEST  /api/v1/addcharacter')

      let res = await fetch(url, requestOptions)
      if (res.status === 200 || res.status === 201) {
        return await res.json()
      } else {
        console.warn(res)
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
  
  static async input(value: string) {
    try {
      const data = {
        sid: this.data.sid,
        input_str: value,
      }
      const url = this.URL + "/api/v1/input"
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      console.log('Request Body', data)
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      }
      console.log('API REQUEST  /api/v1/input')
      
      let res = await fetch(url, requestOptions)
      if (res.status === 200 || res.status === 201) {
        return await res.json()
      } else {
        console.warn(res)
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }

  static reset() {
    this.data.sid = ''
    this.data.last = -1
  }

  static NETWORK_ERROR_RESPONSE = {
    code: 404,
    message: '服务器连接失败',
    apiVersion: '1.0.0',
  }

}
