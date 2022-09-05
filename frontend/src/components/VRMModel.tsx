import React, { Suspense } from 'react'

import {SimpleBones} from '../utils/SimpleBones'
import VRMAsset from '../utils/VRMAsset'

type VRMModelProps = {
    bones : SimpleBones
}

export default function VRMModel( { bones }: VRMModelProps ) {

  // const url = './models/blue_sample.vrm';
  const url = './white_w_glass.vrm';

  return (
    <Suspense fallback={null}>
      <VRMAsset url={url} myBones={bones} />
    </Suspense>
  )
}