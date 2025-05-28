export interface HomeSwiperImg {
  id: number;
  img_url: string;
  img_message: string;
}

export interface HomeResourceImg {
  id: number;
  title: string;
  img: string;
}

// City.ts
export interface CityS {
  cityInfo: string;
  id: number;
  title: string;
  cityId: number;
  cityName: string;
  pinYin: string;
  gangAoTai: string; // 建议改为 boolean
  hot: string; // 建议改为 boolean
  longitude: string;
  latitude: string;
  group: string;
  houseAll: House[];
  houseAllone: HouseRating[];
  housefacilities: FacilityCategory[];
  houseKeyimg: KeyImageCategory[];
  houserNotice: Notice[];
  houseText1: HouseTagGroup[];
  houseThree: Tag[];
  houseTwo: RatingSummary;
  houseUser: User[];
  housMessage: HouseMessage[];
  citiesArea: Area[];
}

// House.ts
export interface House {
  id_Shop: number;
  topScroll: null;
  hotelLogo: null;
  hotelName: string;
}

// HouseRating.ts
export interface HouseRating {
  id: number;
  title: string;
  introduction: string;
  tip: string;
}

// Facility.ts
export interface FacilityCategory {
  id: number;
  name: string;
  url: string;
  housefacilitieses: Facility[];
}

export interface Facility {
  id: number;
  Benefits1: string;
  Benefits2: string;
  Benefits3: string;
  Benefits4: string;
}

// KeyImage.ts
export interface KeyImageCategory {
  orderIndex: number;
  title: string;
}

// Notice.ts
export interface Notice {
  id: number;
  title: string;
  introduction: string;
}

// HouseTag.ts
export interface HouseTagGroup {
  id: number;
  Recruitment: string;
  houseText: HouseTag[];
}

export interface HouseTag {
  id: number;
  text: string;
}

// Tag.ts
export interface Tag {
  id: number;
  text: string;
  textNumber: number;
}

// RatingSummary.ts
export interface RatingSummary {
  id: number;
  text: string;
  textId: string;
}

// User.ts
export interface User {
  id: number;
  userAvatars: string;
  checkInDate: string;
  memberLevelIcon: null;
  username: string;
}

// HouseMessage.ts
export interface HouseMessage {
  id: number;
  commentBrief: string;
  scoreTitle: string;
  totalCount: number;
  address: string;
  introduction: string;
}

// Area.ts
export interface Area {
  id: number;
  area: string;
}
