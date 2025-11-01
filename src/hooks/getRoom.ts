import { RoomMessage } from '../Entity/User/RoomMessage.entity';
import { Repository } from 'typeorm';

// 获取房间号
const getRoomMark = async (
  form: Repository<RoomMessage>,
  UserA: number,
  UserB: number,
) => {
  // 进来先检查数据库是否存在两个用户的房间门
  const User = [UserA, UserB];
  let roomId: number;

  const RoomMessageData = await form
    .createQueryBuilder('RoomMessage')
    .where('RoomMessage.UserAId IN (:...User)', { User })
    .andWhere('RoomMessage.UserBId IN (:...User)', { User })
    .getOne();

  // 没有房间名添加
  if (!RoomMessageData) {
    const RoomMessageDatas = await form.save({
      UserAId: UserA,
      UserBId: UserB,
    });
    roomId = RoomMessageDatas?.id || 0;
  }
  // 赋值房间号
  const n = () => {
    const rooms = RoomMessageData?.id || roomId;
    return rooms;
  };
  const room = n();
  return room;
};
export default getRoomMark;
