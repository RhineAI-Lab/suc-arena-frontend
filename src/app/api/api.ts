import CreateConfig from "@/app/api/class/create-config";

export default class Api {

  static URL = 'http://10.176.64.187:8080'

  static sid = ''
  static last = 0

  static create(config: CreateConfig) {
    const raw = config.toRaw()

    const requestOptions = {
      method: 'POST',
      body: raw,
    }

    fetch(this.URL + "/api/v1/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }

  static reset() {
    this.sid = ''
    this.last = 0
  }

}
