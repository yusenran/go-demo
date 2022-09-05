import React, { Suspense } from 'react'

import {SimpleBones, Position2D} from '../utils/SimpleBones'
import VRMAsset, {VRMAssetProps} from '../utils/VRMAsset'

// TODO VRMModelというラッパーいらないのでは？

export default function VRMModel( {avatarProps, inRoom=false, url}: VRMAssetProps ) {

  return (
    <Suspense fallback={null}>
      <VRMAsset url={url} avatarProps={avatarProps} inRoom={inRoom} />
    </Suspense>
  )
}