
import { Position2D, Rotation, SimpleBones } from "./SimpleBones";
import { VRMAvatarProps } from "./VRMAsset";

function approximateNumber(target : number) : number {
    const place = 0.001
    return Math.ceil(target/place)*place; 
}

function approximatePosition(target: Position2D) : Position2D {
    return {
        x: approximateNumber(target.x),
        y: approximateNumber(target.y)
    }
}

function approximateRotation(target: Rotation) : Rotation {
    return {
        x: approximateNumber(target.x),
        y: approximateNumber(target.y),
        z: approximateNumber(target.z)
    }
}

function approximateBones(target: SimpleBones) : SimpleBones {
    const result: SimpleBones = {};
    for (const key in target) {
        result[key] = approximateRotation(target[key]);
    }
    return result;
}

export function approximateAvatar(target: VRMAvatarProps) : VRMAvatarProps {
    return {
        position: approximatePosition(target.position),
        bones: approximateBones(target.bones),
        name: target.name
    }
}