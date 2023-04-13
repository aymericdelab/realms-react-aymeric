/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/bastion_exportTest8.glb --types
*/

import { useGLTF } from '@react-three/drei';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import { useBastionSettersContext } from '@/context/BastionContext';
import { ClickableMesh, cloneMaterialWithBlueTint } from './ClickableMesh';

type GLTFResult = GLTF & {
  nodes: {
    base: THREE.Mesh;
    center002: THREE.Mesh;
    center002_1: THREE.Mesh;
    center002_2: THREE.Mesh;
    center002_3: THREE.Mesh;
    bridge002: THREE.Mesh;
    bridge002_1: THREE.Mesh;
    gate_outer001: THREE.Mesh;
    gate_outer001_1: THREE.Mesh;
    gate_inner001_1: THREE.Mesh;
    gate_inner001_2: THREE.Mesh;
    gate_inner001_3: THREE.Mesh;
    gate_inner001_4: THREE.Mesh;
    gate_inner001_5: THREE.Mesh;
    gate_inner001_6: THREE.Mesh;
    gate_outer001_2: THREE.Mesh;
    gate_outer001_3: THREE.Mesh;
    gate_outer001_4: THREE.Mesh;
    gate_outer001_5: THREE.Mesh;
    gate_outer001_6: THREE.Mesh;
    gate_outer001_7: THREE.Mesh;
    instanced_bastion_meshes001: THREE.Mesh;
    BezierCurve020: THREE.Mesh;
    BezierCurve020_1: THREE.Mesh;
    BezierCurve021: THREE.Mesh;
    BezierCurve021_1: THREE.Mesh;
    BezierCurve024: THREE.Mesh;
    BezierCurve024_1: THREE.Mesh;
    BezierCurve025: THREE.Mesh;
    BezierCurve025_1: THREE.Mesh;
    BezierCurve023: THREE.Mesh;
    BezierCurve023_1: THREE.Mesh;
    BezierCurve022: THREE.Mesh;
    BezierCurve022_1: THREE.Mesh;
    BezierCurve019: THREE.Mesh;
    BezierCurve019_1: THREE.Mesh;
    BezierCurve018: THREE.Mesh;
    BezierCurve018_1: THREE.Mesh;
    BezierCurve032: THREE.Mesh;
    BezierCurve032_1: THREE.Mesh;
    BezierCurve033: THREE.Mesh;
    BezierCurve033_1: THREE.Mesh;
    BezierCurve031: THREE.Mesh;
    BezierCurve031_1: THREE.Mesh;
    BezierCurve030: THREE.Mesh;
    BezierCurve030_1: THREE.Mesh;
    BezierCurve026: THREE.Mesh;
    BezierCurve026_1: THREE.Mesh;
    BezierCurve027: THREE.Mesh;
    BezierCurve027_1: THREE.Mesh;
    BezierCurve028: THREE.Mesh;
    BezierCurve028_1: THREE.Mesh;
    BezierCurve029: THREE.Mesh;
    BezierCurve029_1: THREE.Mesh;
    bridge001: THREE.Mesh;
    bridge001_1: THREE.Mesh;
    table_legs001: THREE.Mesh;
    Plane005: THREE.Mesh;
    Plane005_1: THREE.Mesh;
    Torus: THREE.Mesh;
    tower001: THREE.Mesh;
    tower001_1: THREE.Mesh;
    tower001_2: THREE.Mesh;
    tower001_3: THREE.Mesh;
    tower001_4: THREE.Mesh;
    tower001_5: THREE.Mesh;
    tower001_6: THREE.Mesh;
    tower001_7: THREE.Mesh;
    trees001: THREE.Mesh;
    wall_inner001: THREE.Mesh;
    wall_inner001_1: THREE.Mesh;
    wall_inner001_2: THREE.Mesh;
    wall_inner001_3: THREE.Mesh;
    wall_inner001_4: THREE.Mesh;
    wall_inner001_5: THREE.Mesh;
    wall_inner001_6: THREE.Mesh;
    wall_inner001_7: THREE.Mesh;
    wall_outer001: THREE.Mesh;
    wall_outer001_1: THREE.Mesh;
    wall_outer001_2: THREE.Mesh;
    wall_outer001_3: THREE.Mesh;
    wall_outer001_4: THREE.Mesh;
    wall_outer001_5: THREE.Mesh;
    wall_outer001_6: THREE.Mesh;
    wall_outer001_7: THREE.Mesh;
    water: THREE.Mesh;
  };
  materials: {
    Room_Stone: THREE.MeshStandardMaterial;
    Gold: THREE.MeshStandardMaterial;
    Defendable: THREE.MeshStandardMaterial;
    Path: THREE.MeshStandardMaterial;
    Gate: THREE.MeshStandardMaterial;
    ['Dark Wood']: THREE.MeshStandardMaterial;
    Wood: THREE.MeshStandardMaterial;
    Tree: THREE.MeshStandardMaterial;
  };
};

export function BastionModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'models/bastion_exportTest8.glb'
  ) as GLTFResult;

  const { setSelectedLocation } = useBastionSettersContext();

  const glowGoldMaterial = cloneMaterialWithBlueTint(materials.Gold);
  const glowDefendableMaterial = cloneMaterialWithBlueTint(
    materials.Defendable
  );
  const glowGateMaterial = cloneMaterialWithBlueTint(materials.Gate);

  const handleClick = ({ id, defender }: { id: number; defender: boolean }) => {
    setSelectedLocation({ locationId: id, defender: defender });
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.base.geometry}
        material={materials.Room_Stone}
        position={[-1.04, -162.07, 0.27]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-517.77, -98.55, -517.77]}
      />
      <group onClick={() => handleClick({ id: 5, defender: true })}>
        <ClickableMesh>
          <mesh
            position={[-1, 8.3, -0.61]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
            geometry={nodes.center002.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            position={[-1, 8.3, -0.61]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
            geometry={nodes.center002_1.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
          <mesh
            position={[-1, 8.3, -0.61]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={nodes.center002_2.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            position={[-1, 8.3, -0.61]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={nodes.center002_3.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      <group position={[-1.36, -1.06, 0.16]} rotation={[0, -1.57, 0]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group position={[-1.36, -1.07, -16.3]} rotation={[0, -1.57, 0]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group position={[-1, -1.06, -0.61]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group position={[-17.46, -1.07, -0.61]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group position={[14.71, -1.07, -0.61]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group position={[-1.36, -1.06, -2.08]} rotation={[0, 1.57, 0]}>
        <mesh geometry={nodes.bridge002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge002_1.geometry} material={materials.Path} />
      </group>
      <group
        position={[-1, -99.47, -0.61]}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => handleClick({ id: 2, defender: false })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.gate_outer001.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.gate_outer001_1.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGateMaterial }}
          />
        </ClickableMesh>
      </group>
      <group onClick={() => handleClick({ id: 5, defender: false })}>
        <ClickableMesh>
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
            geometry={nodes.gate_inner001_1.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
            geometry={nodes.gate_inner001_2.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGateMaterial }}
          />
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
            geometry={nodes.gate_inner001_3.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={nodes.gate_inner001_4.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={nodes.gate_inner001_5.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGateMaterial }}
          />
          <mesh
            position={[-1, 15.06, -0.61]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={nodes.gate_inner001_6.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      {/* // north gate */}
      <group
        position={[-1, -99.47, -0.61]}
        onClick={() => handleClick({ id: 1, defender: false })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.gate_outer001_2.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.gate_outer001_3.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGateMaterial }}
          />
        </ClickableMesh>
      </group>
      {/* // south gate */}
      <group
        position={[-1, -99.47, -0.61]}
        rotation={[Math.PI, 0, Math.PI]}
        onClick={() => handleClick({ id: 3, defender: false })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.gate_outer001_4.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.gate_outer001_5.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
        </ClickableMesh>
      </group>
      <group
        position={[-1, -99.47, -0.61]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={() => handleClick({ id: 4, defender: false })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.gate_outer001_6.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.gate_outer001_7.geometry}
            material={materials.Gate}
            userData={{ glowMaterial: glowGateMaterial }}
          />
        </ClickableMesh>
      </group>
      <mesh
        geometry={nodes.instanced_bastion_meshes001.geometry}
        material={materials.Gold}
        position={[-1.04, -299.93, 0.27]}
        scale={308.32}
      />
      <group
        position={[-72.73, -21.63, -166.2]}
        rotation={[Math.PI, -1.23, Math.PI]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve020.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve020_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-165.84, -21.63, 73.04]}
        rotation={[0, -0.31, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve021.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve021_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[54.59, -21.63, -159.02]}
        rotation={[0, -1.24, -Math.PI]}
        scale={-308.32}
      >
        <mesh
          geometry={nodes.BezierCurve024.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve024_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-155.49, -21.63, -52.57]}
        rotation={[0, 0.36, -Math.PI]}
        scale={-308.32}
      >
        <mesh
          geometry={nodes.BezierCurve025.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve025_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[152.27, -21.63, 51.02]}
        rotation={[Math.PI, -0.38, 0]}
        scale={-308.32}
      >
        <mesh
          geometry={nodes.BezierCurve023.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve023_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-49.67, -21.63, 152.19]}
        rotation={[-Math.PI, 1.17, 0]}
        scale={-308.32}
      >
        <mesh
          geometry={nodes.BezierCurve022.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve022_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[165.59, -21.63, -72.76]}
        rotation={[-Math.PI, 0.38, -Math.PI]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve019.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve019_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[71.01, -21.63, 165.73]}
        rotation={[0, 1.24, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve018.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve018_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[176.46, -30.48, -60.23]}
        rotation={[-Math.PI, 0.19, -Math.PI]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve032.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve032_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-62.45, -30.48, -183.52]}
        rotation={[Math.PI, -1.28, Math.PI]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve033.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve033_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[53.39, -30.48, 188.19]}
        rotation={[0, 1.24, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve031.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve031_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-182.31, -30.48, 57.29]}
        rotation={[0, -0.18, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve030.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve030_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[219.27, -30.48, 7.73]}
        rotation={[0, 1.5, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve026.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve026_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[6.31, -30.48, -220.94]}
        rotation={[Math.PI, -0.11, Math.PI]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve027.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve027_1.geometry}
          material={materials.Path}
        />
      </group>
      <group position={[-1.04, 76.51, 0.27]} scale={308.32}>
        <mesh
          geometry={nodes.BezierCurve028.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve028_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-225.17, -30.48, -8.05]}
        rotation={[0, -1.54, 0]}
        scale={308.32}
      >
        <mesh
          geometry={nodes.BezierCurve029.geometry}
          material={materials['Dark Wood']}
        />
        <mesh
          geometry={nodes.BezierCurve029_1.geometry}
          material={materials.Path}
        />
      </group>
      <group position={[-1.75, -1.06, -0.61]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.bridge001.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge001_1.geometry} material={materials.Path} />
      </group>
      <group position={[-1.36, -1.07, 14.38]} rotation={[0, 1.57, 0]}>
        <mesh geometry={nodes.bridge001.geometry} material={materials.Gold} />
        <mesh geometry={nodes.bridge001_1.geometry} material={materials.Path} />
      </group>
      <mesh
        geometry={nodes.table_legs001.geometry}
        material={materials.Room_Stone}
        position={[-0.89, -73.93, 511.04]}
        scale={[141.24, 110, 141.24]}
      />
      <group position={[-1.04, 16.86, 0.27]} scale={308.32}>
        <mesh
          geometry={nodes.Plane005.geometry}
          material={materials['Dark Wood']}
        />
        <mesh geometry={nodes.Plane005_1.geometry} material={materials.Wood} />
      </group>
      <mesh
        geometry={nodes.Torus.geometry}
        material={materials.Gold}
        position={[-1.04, 11.51, 0.27]}
        scale={[310.75, 810.99, 310.75]}
      />
      <group
        position={[-1, -75.12, -0.61]}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => handleClick({ id: 2, defender: true })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.tower001.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.tower001_1.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      <group
        position={[-1, -75.12, -0.61]}
        onClick={() => handleClick({ id: 1, defender: true })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.tower001_2.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.tower001_3.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      <group
        position={[-1, -75.12, -0.61]}
        rotation={[Math.PI, 0, Math.PI]}
        onClick={() => handleClick({ id: 3, defender: true })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.tower001_4.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.tower001_5.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      <group
        position={[-1, -75.12, -0.61]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={() => handleClick({ id: 4, defender: true })}
      >
        <ClickableMesh>
          <mesh
            geometry={nodes.tower001_6.geometry}
            material={materials.Gold}
            userData={{ glowMaterial: glowGoldMaterial }}
          />
          <mesh
            geometry={nodes.tower001_7.geometry}
            material={materials.Defendable}
            userData={{ glowMaterial: glowDefendableMaterial }}
          />
        </ClickableMesh>
      </group>
      <mesh
        geometry={nodes.trees001.geometry}
        material={materials.Tree}
        position={[-1.04, -299.93, 0.27]}
        scale={308.32}
      />
      <group position={[-1, 5.16, -0.61]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh
          geometry={nodes.wall_inner001.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_inner001_1.geometry}
          material={materials.Path}
        />
      </group>
      <group position={[-1, 5.16, -0.61]} rotation={[0, Math.PI / 4, 0]}>
        <mesh
          geometry={nodes.wall_inner001_2.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_inner001_3.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 5.16, -0.61]}
        rotation={[Math.PI, -Math.PI / 4, Math.PI]}
      >
        <mesh
          geometry={nodes.wall_inner001_4.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_inner001_5.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 5.16, -0.61]}
        rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
      >
        <mesh
          geometry={nodes.wall_inner001_6.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_inner001_7.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 4.7, -0.61]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={1.06}
      >
        <mesh
          geometry={nodes.wall_outer001.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_outer001_1.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 4.7, -0.61]}
        rotation={[0, Math.PI / 4, 0]}
        scale={1.06}
      >
        <mesh
          geometry={nodes.wall_outer001_2.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_outer001_3.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 4.7, -0.61]}
        rotation={[Math.PI, -Math.PI / 4, Math.PI]}
        scale={1.06}
      >
        <mesh
          geometry={nodes.wall_outer001_4.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_outer001_5.geometry}
          material={materials.Path}
        />
      </group>
      <group
        position={[-1, 4.7, -0.61]}
        rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
        scale={1.06}
      >
        <mesh
          geometry={nodes.wall_outer001_6.geometry}
          material={materials.Gold}
        />
        <mesh
          geometry={nodes.wall_outer001_7.geometry}
          material={materials.Path}
        />
      </group>
      <group onClick={() => handleClick({ id: 0, defender: false })}>
        <mesh
          geometry={nodes.water.geometry}
          material={materials.Gold}
          position={[-1.04, -1.43, 0.27]}
          scale={[470.13, 11.13, 470.13]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('models/bastion_exportTest8.glb');
