import {IconType, NotificationPlacement} from "antd/es/notification/interface";
import {NoticeType} from "antd/es/message/interface";
import {message, notification} from "antd";

export class AppTools {
  static notify = (
    title: string,
    message = "",
    type: IconType = "info",
    placement: NotificationPlacement = "top"
  ) => {
    notification.open({
      message: title,
      description: message,
      onClick: () => {
      },
      type: type,
      duration: 1,
    })
  }

  static message = (
    title: string,
    type: NoticeType = "info",
    duration: number = 2,
  ) => {
    message.open({
      type: type,
      content: title,
      duration: duration,
    })
  }
}