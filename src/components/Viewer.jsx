import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';
import { materials } from '../data/index.js';

function KitchenUnit({ materialId }) {
  const mat = materials.find(m => m.id === materialId);
  const albedo = useLoader(THREE.TextureLoader, mat.textureUrl);
  const rough = useLoader(THREE.TextureLoader, mat.roughnessMap);
  albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
  albedo.repeat.set(2, 2);
  rough.wrapS = rough.wrapT = THREE.RepeatWrapping;
  rough.repeat.set(2, 2);
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.8, 0.6]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.1, 0.65]} />
        <meshStandardMaterial map={albedo} roughnessMap={rough} />
      </mesh>
    </group>
  );
}


function CubeMesh({ material }) {
  const mat = materials.find(m => m.id === material);
  const texture = useLoader(THREE.TextureLoader, mat.textureUrl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  
  
  const roughness = useLoader(THREE.TextureLoader, mat.roughnessMap);
  roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
  roughness.repeat.set(2, 2);
  roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
  roughness.repeat.set(2, 2);
  return (
    <mesh rotation={[0.4,0.2,0]} position={[0,0.5,0]}>
      <boxGeometry args={[1,1,1]}/>
      <meshStandardMaterial map={texture} roughnessMap={roughness} roughness={1} envMapIntensity={1.5}/>
    </mesh>
  );
}

function SphereMesh({ material }) {
  const mat = materials.find(m => m.id === material);
  const texture = useLoader(THREE.TextureLoader, mat.textureUrl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const roughness = useLoader(THREE.TextureLoader, mat.roughnessMap);
  roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
  roughness.repeat.set(2, 2);

  return (
    <mesh rotation={[-0.5,0.4,0]} position={[0,0.5,0]}>
      <sphereGeometry args={[0.7,32,32]}/>
      <meshStandardMaterial map={texture} roughnessMap={roughness} roughness={1} envMapIntensity={1.5}/>
    </mesh>
  );
}

function CountertopMesh({ material }) {
  const gltf = useLoader(GLTFLoader, '/models/encimeraisla.glb');
  return <primitive object={gltf.scene} />;
}

export default function Viewer({ shape, material, lighting }) {
  const mat = materials.find(m => m.id === material);
  // Determine HDRI path
  let hdriFile;
  if (lighting === 'hdri1') hdriFile = 'studio_small_09_4k.exr';
  else if (lighting === 'hdri2') hdriFile = 'abandoned_garage_4k.exr';
  else if (lighting === 'balcon') hdriFile = 'balcon.hdr';
  else if (lighting === 'exterior') hdriFile = 'exterior.hdr';

  return (
    <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/background-encimeras.png')" }}>
      <Canvas camera={{ position: [4,4,4], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true }}>
        {/* lighting modes */}
        {lighting === 'artificial' && <>
          <ambientLight intensity={3.0} color={0xffffff}/>
          <pointLight position={[2,5,2]} intensity={3.0} color={0xffffff}/>
          <spotLight position={[-2,5,5]} angle={0.3} intensity={2.5} penumbra={1} castShadow />
        </>}
        {lighting === 'solar' && <>
          <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={1.5}/>
          <directionalLight position={[5,10,5]} intensity={2.0}/>
          <spotLight position={[5,5,-5]} angle={0.3} intensity={1.5} penumbra={1}/>
        </>}
        {(lighting === 'hdri1' || lighting === 'hdri2' || lighting === 'balcon' || lighting === 'exterior') && (
          <Environment
          files={hdriFile}
          path="/hdr/"
          loader={RGBELoader}
          background intensity={1.5}/>
        )}
        <OrbitControls />
        <Suspense fallback={null}>
          {shape === 'cube' && <CubeMesh material={material} />}
          {shape === 'sphere' && <SphereMesh material={material} />}
          {shape === 'countertop' && <KitchenUnit materialId={material} />}
        </Suspense>
      </Canvas>
    </div>
  );
}