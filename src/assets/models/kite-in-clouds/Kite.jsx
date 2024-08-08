/*
Model Title: kites in clouds
Author: minhazmehedi (https://sketchfab.com/minhazmehedi)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/kites-in-clouds-127390bafd6a40ca9b96f27d40548970
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import kiteScene from "./kites_in_clouds.glb";

const Kite = ({ isRotating, setIsRotating, ...props }) => {
  const group = useRef();
  const { gl } = useThree();

  const { nodes, materials, animations } = useGLTF(kiteScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!materials || !animations || !actions) return;
   // Add emissive properties to kite materials
   if (materials.cloud) {
     materials.cloud.emissive = new Color(0xd5e6f3); 
     materials.cloud.emissiveIntensity = 0.5;
   }
   if (materials.kite) {
     materials.kite.emissive = new Color(0xff69b4);
     materials.kite.emissiveIntensity = 0.4;
   }
   if (materials["kite.001"]) {
     materials["kite.001"].emissive = new Color(0xFFD700);
     materials["kite.001"].emissiveIntensity = 0.4;
   }
  }, [materials]);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.play());
  }, [gl]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Sphere001_2"
                position={[15.175, -1.422, -1.19]}
                rotation={[0.005, 1.243, -0.134]}
                scale={2.139}
              >
                <mesh
                  name="mesh_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0.geometry}
                  material={materials.cloud}
                  morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
                />
                <mesh
                  name="mesh_0_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0_1.geometry}
                  material={materials.cloud}
                  morphTargetDictionary={nodes.mesh_0_1.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0_1.morphTargetInfluences}
                />
                <mesh
                  name="mesh_0_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0_2.geometry}
                  material={materials.cloud}
                  morphTargetDictionary={nodes.mesh_0_2.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0_2.morphTargetInfluences}
                />
                <mesh
                  name="mesh_0_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0_3.geometry}
                  material={materials.cloud}
                  morphTargetDictionary={nodes.mesh_0_3.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0_3.morphTargetInfluences}
                />
              </group>
              <group
                name="Armature_7"
                position={[0.002, 2.532, -4.399]}
                rotation={[1.494, -0.324, -1.633]}
              >
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_12"
                    geometry={nodes.Object_12.geometry}
                    material={materials.kite}
                    skeleton={nodes.Object_12.skeleton}
                    morphTargetDictionary={
                      nodes.Object_12.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_12.morphTargetInfluences
                    }
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.rope}
                    skeleton={nodes.Object_13.skeleton}
                    morphTargetDictionary={
                      nodes.Object_13.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_13.morphTargetInfluences
                    }
                  />
                  <group name="Plane_6" />
                </group>
              </group>
              <group
                name="Armature001_12"
                position={[0.109, 1.259, 0.398]}
                rotation={[1.697, -0.309, -1]}
              >
                <group name="GLTF_created_1">
                  <primitive object={nodes.GLTF_created_1_rootJoint} />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials["kite.001"]}
                    skeleton={nodes.Object_21.skeleton}
                    morphTargetDictionary={
                      nodes.Object_21.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_21.morphTargetInfluences
                    }
                  />
                  <skinnedMesh
                    name="Object_22"
                    geometry={nodes.Object_22.geometry}
                    material={materials.rope}
                    skeleton={nodes.Object_22.skeleton}
                    morphTargetDictionary={
                      nodes.Object_22.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_22.morphTargetInfluences
                    }
                  />
                  <group name="Plane001_11" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Kite;