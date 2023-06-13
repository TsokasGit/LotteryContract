import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("mobile.glb");
  return <primitive object={scene} {...props} />
}

function PhoneScene() {
  return (
    <Canvas dpr={[1,1]} shadows camera={{ fov: 45 }}>
      <color attach="background" args={["#101010"]} />
      <PresentationControls speed={1.5} global zoom={0} polar={[-0.1, Math.PI / 4]}>
      <Stage environment={"sunset"}>
          <Model scale={1} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default PhoneScene;