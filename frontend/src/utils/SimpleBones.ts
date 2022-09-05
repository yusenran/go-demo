
export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface SimpleBones {
  [id: string]: Rotation;
}