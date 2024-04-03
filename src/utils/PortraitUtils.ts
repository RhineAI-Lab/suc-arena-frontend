import DataService from "@/app/service/data-service";

export default function getPortraitByName(name: string, isResource=false): string {
  let portrait = ''
  if (isResource) {
    for(let resource of DataService.settings.resources) {
      if (resource.name === name) {
        portrait = resource.portrait
        break
      }
    }
    if (portrait) {
      let last = portrait.split('/').pop()
      if (last) {
        return '/profile/resources/' + last
      }
    }
  } else {
    for(let character of DataService.settings.characters) {
      if (character.name === name) {
        portrait = character.portrait
        break
      }
    }
    if (portrait) {
      let last = portrait.split('/').pop()
      if (last) {
        return '/profile/characters/' + last
      }
    }
  }
  return '/profile/user.png'
}
