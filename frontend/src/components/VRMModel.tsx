import React, { Suspense } from 'react'

import {SimpleBones, Position2D} from '../utils/SimpleBones'
import VRMAsset from '../utils/VRMAsset'

type VRMModelProps = {
    bones : SimpleBones
    position : Position2D
}

export default function VRMModel( { bones, position }: VRMModelProps ) {

  // const url = './models/blue_sample.vrm';
  const url = './white_w_glass.vrm';

  return (
    <Suspense fallback={null}>
      <VRMAsset url={url} position={position} myBones={bones} />
    </Suspense>
  )
}