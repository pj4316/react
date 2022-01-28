import { RegionType } from "../../model/RegionType";

export interface YoutubeCategory {
  // the key of firebase document
  key: string;
  regionType: RegionType;
  
  id: string;
  icon: string;
  index: number;
  name: string;
  show: boolean;
  count: number;
  color: string;
}
