import React, { useState, useRef, useEffect } from 'react'
import { useFrame, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMUtils, VRMSchema, GLTFNode } from '@pixiv/three-vrm'
import { Object3D } from 'three'

import {SimpleBones} from './SimpleBones'


interface VRMAssetProps {
  url: string
  myBones: SimpleBones
}

type BoneStore = { [part: string]: GLTFNode | null | undefined };

export default function VRMAsset({ url, myBones={
  "LeftShoulder": {x: 0, y: 0, z: 0}
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
    if(avatar.current) {
      avatar.current.update(delta)
    }

    if(boneStore.Neck){
      // TODO：なぜかmyBonesでラップされている。。
      boneStore.Neck.rotation.y = myBones['Neck'].y
    }

    if(boneStore.LeftShoulder){
      // TODO：なぜかmyBonesでラップされている。。
      boneStore.LeftShoulder.rotation.z = myBones['LeftShoulder'].z
    }

    if(boneStore.LeftUpperLeg){
      // TODO：なぜかmyBonesでラップされている。。
      boneStore.LeftUpperLeg.rotation.z = myBones['LeftUpperLeg'].z
    }

    if(boneStore.RightShoulder){
      // TODO：なぜかmyBonesでラップされている。。
      boneStore.RightShoulder.rotation.z = myBones['RightShoulder'].z
    }

    if(boneStore.RightUpperLeg){
      // TODO：なぜかmyBonesでラップされている。。
      boneStore.RightUpperLeg.rotation.z = myBones['RightUpperLeg'].z
    }

  })

  return <primitive object={gltf.scene} dispose={null} />
}