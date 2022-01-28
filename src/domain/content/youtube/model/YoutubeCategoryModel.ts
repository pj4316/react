import { YoutubeCategory } from "../repository/_dto/YoutubeCategory";
import { RegionType } from "./RegionType";

/**
 * 유튜브 큐레이션 데이터
 */
export class YoutubeCategoryModel {
  key: string;
  regionType: RegionType;
  id: string;
  icon: string;
  index: number;
  name: string;
  show: boolean;
  count: number;
  color: string;

  constructor(dto: YoutubeCategory) {
    this.key = dto.key;
    this.regionType = dto.regionType;

    this.id = dto.id;
    this.icon = dto.icon;
    this.index = dto.index;
    this.name = dto.name;
    this.show = dto.show ?? false;
    this.count = dto.count;
    this.color = dto.color;
  }
}
