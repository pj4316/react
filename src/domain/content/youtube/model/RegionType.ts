export enum RegionType {
  KR='kr',
  EN='en',
}

export namespace RegionTypes {
  export function getValue(index: number) {
    return Object.values(RegionType)[index] as RegionType;
  }
}
