
import { Box, Button, Grid, Slider, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { Canvas } from 'react-three-fiber'

import CameraControl from './utils/CameraControl'
import {Position2D, SimpleBones} from './utils/SimpleBones'
import { VRMAvatarProps } from './utils/VRMAsset'
import VRMModel from './components/VRMModel'

import './App.css'


function numToRad(num: number | number[]): number {
  if( typeof num === "number") {
    return num * Math.PI / 50.0
  } else {
    return 0
  }
}

function App() {
  const defaultPosition: Position2D = {x: 0, y: 0}
  const defaultBones: SimpleBones = {
    "LeftShoulder": {x: 0.0, y: 0.0, z: 0.0},
    "LeftUpperLeg": {x: 0.0, y: 0.0, z: 0.0},
    "Neck": {x: 0.0, y: 0.0, z: 0.0},
    "RightShoulder": {x: 0.0, y: 0.0, z: 0.0},
    "RightUpperLeg": {x: 0.0, y: 0.0, z: 0.0}
  }

  const [isInRoom, setIsInRoom] = useState<boolean>(false)
  const [roomButton, setRoomButton] = useState<string>("Join Room");

  const [position, setPosition] = useState<Position2D>(defaultPosition)
  const [bones, setBones] = useState<SimpleBones>(defaultBones);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            id="user-name"
            label="Your name"
            variant="outlined"
            disabled={isInRoom}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              if(!isInRoom) {
                setIsInRoom(true)
                setRoomButton("Exit Room")
              } else {
                setIsInRoom(false)
                setRoomButton("Join Room")
              }
             }}
          >{roomButton}</Button>
        </Grid>
        <Grid item xs={6}>
          <Slider
            size="small"
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e,v) => setPosition( {x: numToRad(v), y: position.y} )}
          />
          position x
        </Grid>
        <Grid item xs={6}>
          <Slider
            size="small"
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e,v) => setPosition( {x: position.x, y: numToRad(v)} )}
          />
          position y
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3}>
            <Slider
              size="small"
              defaultValue={100}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "LeftShoulder": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            LeftShoulder
            <Slider
              size="small"
              defaultValue={100}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "LeftUpperLeg": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            LeftUpperLeg
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3}>
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "Neck": {x: 0.0, y: numToRad(v), z: 0.0}})}
            />
            Neck
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3}>
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "RightShoulder": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            RightShoulder
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "RightUpperLeg": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            RightUpperLeg
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ width:1000, height: 500}}>
        <Canvas>
          <VRMModel
            avatarProps={ { name:"a", position:position, bones: bones} }
            inRoom={isInRoom}
            url='./white_w_glass.vrm'
          />
          <CameraControl />
          <directionalLight position={[1, 1, 1]} />
          <gridHelper />
        </Canvas>
      </Box>

    </Stack>
  )
}

export default App
