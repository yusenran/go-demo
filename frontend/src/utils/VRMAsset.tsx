import React, { useState, useRef, useEffect } from 'react'
import { useFrame, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMUtils, VRMSchema, GLTFNode } from '@pixiv/three-vrm'

import {SimpleBones, Position2D} from './SimpleBones'
import {syncRoom} from './SyncRoom'

export interface VRMAvatarProps {
  name: string
  position: Position2D
  bones: SimpleBones
}

export interface VRMAssetProps {
  url: string
  avatarProps: VRMAvatarProps
  inRoom: boolean
}

type BoneStore = { [part: string]: GLTFNode | null | undefined };

function vrmToBoneStore(vrm: VRM): BoneStore {
  const bones : BoneStore = {
    LeftShoulder: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftShoulder),
    LeftUpperLeg: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperLeg),
    RightShoulder: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightShoulder),
    RightUpperLeg: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperLeg),
    Neck: vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Neck)
  }
  return bones
}

function updateBones( boneStore: BoneStore, avatarProps: VRMAvatarProps) {
    // TODO 副作用が隠蔽されていてよろしくない。setPoseで書き直したい
    const myBones = avatarProps.bones
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
}

export default function VRMAsset({ avatarProps, url, inRoom=false }: VRMAssetProps) {
  const { scene, camera } = useThree()
  const gltf = useLoader(GLTFLoader, url)
  const gltf_other = useLoader(GLTFLoader, './black.vrm')
  const avatar = useRef<VRM>()

  // TODO 後で消す
  const position = avatarProps.position

  const [boneStore, setBones] = useState<BoneStore>({})

  const [otherAvators, setOtherAvatars] = useState<{[id:string]:VRMAvatarProps}>({})
  const [otherBoneStore, setOthersBones] = useState<BoneStore>({})

  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene)

    VRM.from(gltf).then(vrm => {
      // 初期描画で背中が映ってしまうので向きを変えてあげる
      const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
      boneNode?.rotateY(Math.PI)
      setBones(vrmToBoneStore(vrm))
    })

    VRM.from(gltf_other).then(vrm => {
      // 初期描画で背中が映ってしまうので向きを変えてあげる
      const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
      boneNode?.rotateY(Math.PI)
      setOthersBones(vrmToBoneStore(vrm))
    })

  }, [ scene, gltf, camera])

  if (scene === null) {
    console.log('scene is null')
    return null
  }

  useFrame( ({clock}, delta) => {
    gltf.scene.position.set(position.x, 0, position.y)

    if( inRoom ) {
      const f = async () => {
        var avatars = await syncRoom(avatarProps)
        delete avatars[avatarProps.name]
        setOtherAvatars(avatars)
      }
      f()
      if( Object.keys(otherAvators).length > 0 ) {
        Object.keys(otherAvators).forEach( key => {
          gltf_other.scene.position.set(otherAvators[key].position.x, 0, otherAvators[key].position.y)
          updateBones(otherBoneStore, otherAvators[key])
        })
      }
    }

    if(avatar.current) {
      avatar.current.update(delta)
    }

    updateBones(boneStore, avatarProps)
  })

  if( inRoom ) {
    return <>
      <primitive object={gltf.scene} dispose={null} />
      <primitive object={gltf_other.scene} dispose={null} />
    </>
  } else {
    return <primitive object={gltf.scene} dispose={null} />
  }
}