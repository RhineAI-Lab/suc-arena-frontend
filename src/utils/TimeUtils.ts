
export default class TimeUtils {

  static pad(number: number, length: number) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  static timeDifference(lastTime: string) {
    let lastTimeDate = new Date(lastTime)
    let now = new Date()
    let diff = now.getTime() - lastTimeDate.getTime()

    let hours = Math.floor(diff / (1000 * 60 * 60))
    diff -= hours * (1000 * 60 * 60)
    let minutes = Math.floor(diff / (1000 * 60))
    diff -= minutes * (1000 * 60)
    let seconds = Math.floor(diff / 1000)
    diff -= seconds * 1000
    let milliseconds = Math.floor(diff / 100)

    return `${hours}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${milliseconds}`
  }

}
