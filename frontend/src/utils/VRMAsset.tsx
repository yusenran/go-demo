import React, { useState, useRef, useEffect } from 'react'
import { useFrame, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMUtils, VRMSchema, GLTFNode } from '@pixiv/three-vrm'

import {SimpleBones, Position2D} from './SimpleBones'

interface VRMAssetProps {
  url: string
  position: Position2D
  myBones: SimpleBones
}

type BoneStore = { [part: string]: GLTFNode | null | undefined };

export default function VRMAsset({ url, position , myBones={
} }: VRMAssetProps) {
  const { scene, camera } = useThree()
  const gltf = useLoader(GLTFLoader, url)
  const avatar = useRef<VRM>()

  const [boneStore, setBones] = useState<BoneStore>({})

  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene)
    VRM.from(gltf).then(vrm => {
      // 初期描画で背中が映ってしまうので向きを変えてあげる
      const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
      boneNode?.rotateY(Math.PI)

      const bones : BoneStore = {
        LeftShoulder: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftShoulder),
        LeftUpperLeg: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperLeg),
        RightShoulder: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightShoulder),
        RightUpperLeg: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperLeg),
        Neck: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Neck)
      }

      setBones(bones)

    })
  }, [ scene, gltf, camera])

  if (scene === null) {
    console.log('scene is null')
    return null
  }

  useFrame( ({clock}, delta) => {
    gltf.scene.position.set(position.x, 0, position.y)
    if(avatar.current) {
      avatar.current.update(delta)
    }

    // TODO setPoseで書き直したい
    if(boneStore.Neck){
      boneStore.Neck.rotation.y = myBones['Neck'].y
    }

    if(boneStore.LeftShoulder){
      boneStore.LeftShoulder.rotation.z = myBones['LeftShoulder'].z
    }

    if(boneStore.LeftUpperLeg){
      boneStore.LeftUpperLeg.rotation.z = myBones['LeftUpperLeg'].z
    }

    if(boneStore.RightShoulder){
      boneStore.RightShoulder.rotation.z = myBones['RightShoulder'].z
    }

    if(boneStore.RightUpperLeg){
      boneStore.RightUpperLeg.rotation.z = myBones['RightUpperLeg'].z
    }

  })

  return <primitive object={gltf.scene} dispose={null} />
}