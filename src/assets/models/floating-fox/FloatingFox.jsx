/*
Model Title: Floating Fox
Author: Prinavu (https://sketchfab.com/Prinavu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/floating-fox-497de71996cf4f4d86e387028938aceb
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import floatingFoxScene from "./floating_fox.glb";

const FloatingFox = ({ isRotating, setIsRotating, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(floatingFoxScene);
  const { actions } = useAnimations(animations, group);
  const { gl } = useThree();

  useEffect(() => {
    Object.values(actions).forEach((action) => action.play());
  }, [gl]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Star001_1">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  name="Object_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5.geometry}
                  material={materials["Material.010"]}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials["Material.011"]}
                />
              </group>
              <group name="Star004_2" scale={[0.8, 0.8, 0.8]}>
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.012"]}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials["Material.013"]}
                />
              </group>
              <group name="Cube_3">
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials.Material}
                />
                <mesh
                  name="Object_12"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_12.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials["Material.005"]}
                />
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.005"]}
                />
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials["Material.003"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default FloatingFox;
