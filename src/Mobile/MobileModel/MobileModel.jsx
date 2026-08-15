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

    if (!phoneCamera) {
      console.error("CameraPhone not found in p2.glb");
      return;
    }

    cameraRef.current = phoneCamera;

    // Find the center of the actual model
    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();
    box.getCenter(center);

    targetRef.current = center;

    console.log("Camera target:", center);

    set({ camera: phoneCamera });

    phoneCamera.updateProjectionMatrix();
  }, [scene, set, cameraRef, targetRef]);

  return <primitive object={scene} />;
}

export default function MobileModel({ darkMode }) {
  const cameraRef = useRef(null);
  const targetRef = useRef(null);

  const verticalOffset = useRef(0);
  const orbitAngle = useRef(0);

  const startCameraPosition = useRef(null);

  const pointers = useRef(new Map());
  const lastPinchDistance = useRef(null);
  const zoomDistance = useRef(null);

  const MIN_CAMERA_Y = -5.0;
  const MAX_CAMERA_Y = 10;

  return (
    <div className="hero-model">
      <Canvas
        onPointerDown={(e) => {
          e.stopPropagation();

          const camera = cameraRef.current;

          if (!camera) return;

          pointers.current.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY,
          });

          // -------------------------
          // TWO FINGERS → PINCH
          // -------------------------

          if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];

            lastPinchDistance.current = Math.hypot(
              a.x - b.x,
              a.y - b.y
            );

            camera.userData.dragging = false;

            return;
          }

          // -------------------------
          // ONE FINGER → ORBIT
          // -------------------------

          if (pointers.current.size === 1) {
            camera.userData.dragging = true;

            camera.userData.lastX = e.clientX;
            camera.userData.lastY = e.clientY;

            if (!startCameraPosition.current) {
              startCameraPosition.current =
                camera.position.clone();

              zoomDistance.current =
                camera.position.distanceTo(targetRef.current);
            }
          }
        }}

        onPointerMove={(e) => {
          const camera = cameraRef.current;

          if (!camera) return;

          // Update pointer
          if (pointers.current.has(e.pointerId)) {
            pointers.current.set(e.pointerId, {
              x: e.clientX,
              y: e.clientY,
            });
          }

          // =========================
          // PINCH ZOOM
          // =========================

          if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];

            const currentDistance = Math.hypot(
              a.x - b.x,
              a.y - b.y
            );

            if (lastPinchDistance.current !== null) {
              const delta =
                currentDistance -
                lastPinchDistance.current;

              const zoomSpeed = 0.05;

              zoomDistance.current -=
                delta * zoomSpeed;

              // Don't allow negative distance
              zoomDistance.current = Math.max(
                0.1,
                zoomDistance.current
              );

              const original =
                startCameraPosition.current;

              const offset = original
                .clone()
                .sub(targetRef.current);

              // Horizontal orbit
              offset.applyAxisAngle(
                new THREE.Vector3(0, 1, 0),
                orbitAngle.current
              );

              // Vertical orbit
              offset.y += verticalOffset.current;

              // Apply zoom
              offset.setLength(
                zoomDistance.current
              );

              camera.position
                .copy(targetRef.current)
                .add(offset);

              camera.position.y =
                THREE.MathUtils.clamp(
                  camera.position.y,
                  MIN_CAMERA_Y,
                  MAX_CAMERA_Y
                );

              camera.lookAt(targetRef.current);

              console.log(
                "Zoom distance:",
                zoomDistance.current.toFixed(3)
              );
            }

            lastPinchDistance.current =
              currentDistance;

            return;
          }

          // =========================
          // ONE-FINGER ORBIT
          // =========================

          if (!camera.userData.dragging) return;

          const deltaX =
            e.clientX - camera.userData.lastX;

          const deltaY =
            e.clientY - camera.userData.lastY;

          // Horizontal
          orbitAngle.current -=
            deltaX * 0.02;

          // Vertical
          // Inverted
          verticalOffset.current +=
            deltaY * 0.05;

          const original =
            startCameraPosition.current;

          const offset = original
            .clone()
            .sub(targetRef.current);

          // Horizontal orbit
          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            orbitAngle.current
          );

          // Vertical movement
          offset.y += verticalOffset.current;

          // Preserve zoom
          offset.setLength(
            zoomDistance.current
          );

          camera.position
            .copy(targetRef.current)
            .add(offset);

          // Vertical limits
          camera.position.y =
            THREE.MathUtils.clamp(
              camera.position.y,
              MIN_CAMERA_Y,
              MAX_CAMERA_Y
            );

          camera.lookAt(targetRef.current);

          camera.userData.lastX = e.clientX;
          camera.userData.lastY = e.clientY;

          console.log(
            "Camera:",
            camera.position.x.toFixed(3),
            camera.position.y.toFixed(3),
            camera.position.z.toFixed(3)
          );
        }}

        onPointerUp={(e) => {
          pointers.current.delete(e.pointerId);

          if (pointers.current.size < 2) {
            lastPinchDistance.current = null;
          }

          if (pointers.current.size === 0) {
            if (cameraRef.current) {
              cameraRef.current.userData.dragging = false;
            }
          }
        }}

        onPointerCancel={(e) => {
          pointers.current.delete(e.pointerId);

          if (pointers.current.size < 2) {
            lastPinchDistance.current = null;
          }
        }}
      >
        <color
          attach="background"
          args={[
            darkMode
              ? "#111111"
              : "#f5f5f5",
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
