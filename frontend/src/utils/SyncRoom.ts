
import axios from "axios";

import { approximateAvatar } from "./Approximate";
import { VRMAvatarProps } from "./VRMAsset";

export async function syncRoom(avatar: VRMAvatarProps) : Promise< {[id:string]:VRMAvatarProps} > {
  try {
    const config = {
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    // console.log(JSON.stringify( approximateAvatar(avatar) ))
    const response = await axios.post<{[id:string]:VRMAvatarProps}>(
      "http://localhost:3000/avatar"
      , JSON.stringify( approximateAvatar(avatar) )
      , config )
    // console.log(response)
    return response.data
  } catch (error) {
    console.log("post error")
    console.log(error)
    return {}
  }
}