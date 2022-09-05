
// TODO 自前で定義するのやめる

export interface Position2D {
    x: number
    y: number
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface SimpleBones {
  [id: string]: Rotation;
}