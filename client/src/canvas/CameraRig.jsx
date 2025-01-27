import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
  const snap = useSnapshot(state);
  const group = useRef();
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
