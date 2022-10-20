import React, { useRef } from "react";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./styles.css";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      autoRotateSpeed={0.05}
      enableZoom={true}
      enableDamping={true}
      dampingFactor={0.01}
    />
  );
};

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "./images/milkyway/ultra/px.webp",
    "./images/milkyway/ultra/nx.webp",
    "./images/milkyway/ultra/py.webp",
    "./images/milkyway/ultra/ny.webp",
    "./images/milkyway/ultra/pz.webp",
    "./images/milkyway/ultra/nz.webp",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

// EXPORT MILKY WAY
export default function MilkyWay() {
  return (
    <div className="canvas__wrapper">
      <Canvas className="canvas">
        <CameraControls />
        <SkyBox />
      </Canvas>
    </div>
  );
}
