
import axios from "axios";
import { Box, Grid, Slider, Stack } from '@mui/material'
import { useState } from 'react'
import { Canvas } from 'react-three-fiber'

import CameraControl from './utils/CameraControl'
import {SimpleBones} from './utils/SimpleBones'
import VRMModel from './components/VRMModel'

import './App.css'

type Hello = {
  greeting: string;
  content: string;
  count: number;
}

async function getHello() : Promise<Hello> {
  try {
    const response = await axios.get<Hello>("http://localhost:3000/hello")
    return response.data
  } catch (error) {
    console.log("get error")
    console.log(error)
    return {greeting: "", content: "", count: 0}
  }
}

async function postHello(hello: Hello) : Promise<Hello> {
  try {
    const config = {
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    const response = await axios.post<Hello>(
      "http://localhost:3000/hello"
      , JSON.stringify(hello)
      , config )
    // console.log(response)
    return response.data
  } catch (error) {
    console.log("post error")
    console.log(error)
    return {greeting: "", content: "", count: 0}
  }
}

function numToRad(num: number | number[]): number {
  if( typeof num === "number") {
    return num * Math.PI / 50.0
  } else {
    return 0
  }
}

function App() {
  const defaultBones: SimpleBones = {
    "LeftShoulder": {x: 0.0, y: 0.0, z: 0.0},
    "LeftUpperLeg": {x: 0.0, y: 0.0, z: 0.0},
    "Neck": {x: 0.0, y: 0.0, z: 0.0},
    "RightShoulder": {x: 0.0, y: 0.0, z: 0.0},
    "RightUpperLeg": {x: 0.0, y: 0.0, z: 0.0}
  }
  const [bones, setBones] = useState<SimpleBones>(defaultBones);
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Stack spacing={3}>
            LeftShoulder
            <Slider
              size="small"
              defaultValue={100}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "LeftShoulder": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            LeftUpperLeg
            <Slider
              size="small"
              defaultValue={100}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "LeftUpperLeg": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3}>
            Neck
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "Neck": {x: 0.0, y: numToRad(v), z: 0.0}})}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3}>
            RightShoulder
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "RightShoulder": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
            RightUpperLeg
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e,v) => setBones({...bones, "RightUpperLeg": {x: 0.0, y: 0.0, z: numToRad(v)}})}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ width:500, height: 500}}>
        <Canvas>
          <VRMModel bones={bones} />
          <CameraControl />
          <directionalLight position={[1, 1, 1]} />
          <gridHelper />
        </Canvas>
      </Box>

    </Stack>
  )
}

export default App
