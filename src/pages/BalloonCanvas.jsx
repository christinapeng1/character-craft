import { Canvas } from "@react-three/fiber";
import Balloon from "../models/Balloon";
import Loader from "../components/Loader";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Color } from "three";
import { OrbitControls } from "@react-three/drei";
import React, { useState, Suspense } from "react";

const BalloonCanvas = () => {
  const adjustBalloonForScreenSize = () => {
    let screenScale, screenPosition;
    let screenRotation = [0, -4, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [10.5, 4, -15];
    } else {
      screenScale = [0.07, 0.07, 0.07];
      screenPosition = [-3.5, 0, -1];
    }
    return [screenScale, screenPosition, screenRotation];
  };

  const [balloonScale, balloonPosition, balloonRotation] = adjustBalloonForScreenSize();
  const [isRotating, setIsRotating] = useState(false);

  return (
    <Canvas
      className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
      camera={{ near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new Color(0x000000), 0);
      }}
    >
      <Suspense fallback={<Loader />}>
        <directionalLight position={[1, 1, 1]} intensity={2.5} />

        <Balloon
          position={balloonPosition}
          scale={balloonScale}
          rotation={balloonRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={true}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.8}
            height={300}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default BalloonCanvas;
