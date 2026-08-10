import { useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const modelPath = import.meta.env.BASE_URL + "3dmodels/p2.glb";

function Model({ modelRef }) {
  const { scene } = useGLTF(modelPath);
  const { set } = useThree();

  useEffect(() => {
    const phoneCamera = scene.getObjectByName("CameraPhone");

    if (!phoneCamera) {
      console.error("CameraPhone not found in p2.glb");
      return;
    }

    console.log("Using mobile camera:", phoneCamera);

    set({ camera: phoneCamera });

    phoneCamera.updateProjectionMatrix();
  }, [scene, set]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function MobileModel() {
  const modelRef = useRef(null);

  return (
    <div className="hero-model">
      <Canvas
        onPointerDown={(e) => {
          e.stopPropagation();

          modelRef.current.userData.dragging = true;
          modelRef.current.userData.lastX = e.clientX;
        }}
        onPointerMove={(e) => {
          if (!modelRef.current?.userData.dragging) return;

          const currentX = e.clientX;
          const lastX = modelRef.current.userData.lastX;

          const deltaX = currentX - lastX;

          modelRef.current.rotation.y += deltaX * 0.01;

          modelRef.current.userData.lastX = currentX;
        }}
        onPointerUp={() => {
          if (!modelRef.current) return;

          modelRef.current.userData.dragging = false;
        }}
        onPointerLeave={() => {
          if (!modelRef.current) return;

          modelRef.current.userData.dragging = false;
        }}
      >
        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Model modelRef={modelRef} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(modelPath);
