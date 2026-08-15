import { useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const modelPath = import.meta.env.BASE_URL + "3dmodels/p2.glb";

function Model({ cameraRef, targetRef }) {
  const { scene } = useGLTF(modelPath);
  const { set } = useThree();

  useEffect(() => {
    const phoneCamera = scene.getObjectByName("CameraPhone");
    const target = scene.getObjectByName("MobileCamTarget");

    if (!phoneCamera) {
      console.error("CameraPhone not found in p2.glb");
      return;
    }

    if (!target) {
      console.error("MobileCamTarget not found in p2.glb");
      return;
    }

    cameraRef.current = phoneCamera;
    targetRef.current = target;

    set({ camera: phoneCamera });

    phoneCamera.updateProjectionMatrix();
  }, [scene, set, cameraRef, targetRef]);

  return <primitive object={scene} />;
}

export default function MobileModel({ darkMode }) {
  const cameraRef = useRef(null);
  const targetRef = useRef(null);

  const orbitAngle = useRef(0);
  const startCameraPosition = useRef(null);

  return (
    <div className="hero-model">
      <Canvas
        onPointerDown={(e) => {
          e.stopPropagation();

          const camera = cameraRef.current;

          if (!camera) return;

          camera.userData.dragging = true;
          camera.userData.lastX = e.clientX;
          camera.userData.lastY = e.clientY;

          if (!startCameraPosition.current) {
            startCameraPosition.current =
              camera.position.clone();
          }
        }}

        onPointerMove={(e) => {
          const camera = cameraRef.current;
          const target = targetRef.current;

          if (!camera?.userData.dragging || !target) return;

          const deltaX =
            e.clientX - camera.userData.lastX;

          const deltaY =
            e.clientY - camera.userData.lastY;

          const rotationSpeed = 0.01;

          orbitAngle.current -= deltaX * rotationSpeed;

          // Horizontal orbit
          const original = startCameraPosition.current;

          const offset = original
            .clone()
            .sub(target.position);

          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            orbitAngle.current
          );

          // Vertical movement around target
          offset.y -= deltaY * 0.01;

          camera.position
            .copy(target.position)
            .add(offset);

          camera.lookAt(target.position);

          camera.userData.lastX = e.clientX;
          camera.userData.lastY = e.clientY;

          console.log(
            "Camera:",
            camera.position.x.toFixed(3),
            camera.position.y.toFixed(3),
            camera.position.z.toFixed(3)
          );
        }}

        onPointerUp={() => {
          if (cameraRef.current) {
            cameraRef.current.userData.dragging = false;
          }
        }}

        onPointerLeave={() => {
          if (cameraRef.current) {
            cameraRef.current.userData.dragging = false;
          }
        }}
      >
        <color
          attach="background"
          args={[
            darkMode
              ? "#111111"
              : "#f5f5f5"
          ]}
        />

        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Model
          cameraRef={cameraRef}
          targetRef={targetRef}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(modelPath);
