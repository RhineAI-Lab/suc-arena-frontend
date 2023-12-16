import CreateConfig from "@/app/api/class/create-config";
import {proxy} from "valtio";

export default class Api {

  static URL = 'http://10.176.64.187:8080'

  static data = proxy({
    sid: '',
    last: 0,
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

  static reset() {
    this.data.sid = ''
    this.data.last = 0
  }

  static NETWORK_ERROR_RESPONSE = {
    code: 404,
    message: '服务器连接失败',
    apiVersion: '1.0.0',
  }

}
