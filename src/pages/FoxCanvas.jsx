import { Canvas } from "@react-three/fiber";
import FloatingFox from "../models/FloatingFox";
import Loader from "../components/Loader";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import React, { useState, Suspense } from "react";

const FoxCanvas = () => {
  const adjustFoxForScreenSize = () => {
    let screenScale;
    let screenRotation = [0.15, 0, 0];

    if (window.innerWidth < 1300) {
      screenScale = [0.5, 0.5, 0.5];
    } else {
      screenScale = [0.85, 0.85, 0.85];
    }
    return [screenScale, screenRotation];
  };

  const [foxScale, foxRotation] = adjustFoxForScreenSize();
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 1]} intensity={2.5} />
        <directionalLight position={[-1, -1, 1]} intensity={1.5} />
        <pointLight position={[2, 2, 2]} intensity={1.5} />
        <pointLight position={[-2, -2, -2]} intensity={1.5} />

        <FloatingFox
          scale={foxScale}
          rotation={foxRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableZoom={false}
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

export default FoxCanvas;
