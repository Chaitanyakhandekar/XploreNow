import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html, useGLTF, Environment } from '@react-three/drei';

function Globe() {
  const { scene } = useGLTF('/models/globe.glb'); // Place globe.glb in public/models/
  return <primitive object={scene} scale={1.2} />;
}

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Globe />
        </Float>
        <OrbitControls enableZoom={false} autoRotate />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
