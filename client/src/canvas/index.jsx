import React from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import Backdrop from "./Backdrop";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
