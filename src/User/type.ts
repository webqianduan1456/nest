// 用户消息类型
export interface Message {
  Message: string;
  time: string | Date;
  active: number;
  room: string;
  userid: number;
}
