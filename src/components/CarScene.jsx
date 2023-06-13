import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("car.glb");
  return <primitive object={scene} {...props} />
}

function CarScene() {
  return (
    <Canvas dpr={[1,1]} shadows camera={{ fov: 10 }}>
      <color attach="background" args={["#101010"]} />
      <PresentationControls speed={1.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={"sunset"}>
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default CarScene;