import { useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const modelPath = import.meta.env.BASE_URL + "3dmodels/p2.glb";

function Model({ cameraRef, targetRef }) {
  const { scene } = useGLTF(modelPath);
  const { set } = useThree();

  useEffect(() => {
    const phoneCamera =
      scene.getObjectByName("CameraPhone");

    const target =
      scene.getObjectByName("MobileCamTarget");

    if (!phoneCamera) {
      console.error(
        "CameraPhone not found in p2.glb"
      );
      return;
    }

    if (!target) {
      console.error(
        "MobileCamTarget not found in p2.glb"
      );
      return;
    }

    const mobileHitboxes = [
      "GithubHitbox",
      "LinkedinHitbox",
      "MailHitbox",
    ];

    mobileHitboxes.forEach((name) => {
      const hitbox = scene.getObjectByName(name);

      if (!hitbox) return;

      hitbox.traverse((child) => {
        if (!child.isMesh) return;

        child.visible = false;
      });
    });

    cameraRef.current = phoneCamera;
    targetRef.current = target;

    set({ camera: phoneCamera });

    phoneCamera.updateProjectionMatrix();
  }, [
    scene,
    set,
    cameraRef,
    targetRef,
  ]);

  return <primitive object={scene} />;
}

export default function MobileModel({
  darkMode,
}) {
  const cameraRef = useRef(null);
  const targetRef = useRef(null);

  const verticalOffset = useRef(0);
  const orbitAngle = useRef(0);

  const startCameraPosition = useRef(null);

  const pointers = useRef(new Map());
  const lastPinchDistance = useRef(null);
  const zoomDistance = useRef(null);
  const lastTap = useRef(0);
  const tapTimeout = useRef(null);
  const multiTouchGesture = useRef(false);

  const MIN_CAMERA_Y = -5.0;
  const MAX_CAMERA_Y = 10;

  const MIN_ZOOM_DISTANCE = 1.5;
  const MAX_ZOOM_DISTANCE = useRef(null);

  const applyZoom = (distance) => {
    if (
      zoomDistance.current === null ||
      MAX_ZOOM_DISTANCE.current === null
    ) {
      return;
    }

    zoomDistance.current =
      THREE.MathUtils.clamp(
        distance,
        MIN_ZOOM_DISTANCE,
        MAX_ZOOM_DISTANCE.current
      );
  };

  const toggleDoubleTapZoom = () => {
    const camera = cameraRef.current;
    const target = targetRef.current;

    if (
      !camera ||
      !target ||
      zoomDistance.current === null ||
      MAX_ZOOM_DISTANCE.current === null ||
      !startCameraPosition.current
    ) {
      return;
    }

    const isAtMax =
      Math.abs(
        zoomDistance.current -
        MAX_ZOOM_DISTANCE.current
      ) < 0.01;

    // At max → zoom out to min
    // Anywhere else → zoom in to max
    zoomDistance.current = isAtMax
      ? MIN_ZOOM_DISTANCE
      : MAX_ZOOM_DISTANCE.current;

    const offset = startCameraPosition.current
      .clone()
      .sub(target.position);

    // Keep current horizontal orbit
    offset.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      orbitAngle.current
    );

    // Keep current vertical position
    offset.y += verticalOffset.current;

    // Apply new zoom
    offset.setLength(zoomDistance.current);

    camera.position
      .copy(target.position)
      .add(offset);

    camera.position.y =
      THREE.MathUtils.clamp(
        camera.position.y,
        MIN_CAMERA_Y,
        MAX_CAMERA_Y
      );

    camera.lookAt(target.position);
  };

  return (
    <div className="hero-model">
      <Canvas
        onPointerDown={(e) => {
          e.stopPropagation();

          const camera = cameraRef.current;
          const target = targetRef.current;

          if (!camera || !target) return;

          // Add pointer FIRST
          pointers.current.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY,
          });

          // =========================
          // TWO FINGERS → PINCH
          // =========================

          if (pointers.current.size >= 2) {
            // Mark this interaction as multi-touch
            multiTouchGesture.current = true;

            // Cancel any pending double tap
            lastTap.current = 0;

            const [a, b] = [
              ...pointers.current.values(),
            ];

            lastPinchDistance.current =
              Math.hypot(
                a.x - b.x,
                a.y - b.y
              );

            camera.userData.dragging = false;

            return;
          }

          // =========================
          // ONE FINGER → DOUBLE TAP
          // =========================

          // Only allow double tap if this has NOT
          // become a multi-touch gesture
          if (!multiTouchGesture.current) {
            const now = Date.now();
            const DOUBLE_TAP_DELAY = 300;

            if (now - lastTap.current < DOUBLE_TAP_DELAY) {
              toggleDoubleTapZoom();

              lastTap.current = 0;

              return;
            }

            lastTap.current = now;
          }

          // =========================
          // ONE FINGER → ORBIT
          // =========================

          camera.userData.dragging = true;

          camera.userData.lastX = e.clientX;
          camera.userData.lastY = e.clientY;

          if (!startCameraPosition.current) {
            startCameraPosition.current =
              camera.position.clone();

            zoomDistance.current =
              camera.position.distanceTo(
                target.position
              );

            MAX_ZOOM_DISTANCE.current =
              zoomDistance.current;
          }
        }}

        onWheel={(e) => {
          e.stopPropagation();

          const camera = cameraRef.current;
          const target = targetRef.current;

          if (
            !camera ||
            !target ||
            zoomDistance.current === null
          ) {
            return;
          }

          const zoomSpeed = 0.05;

          applyZoom(
            zoomDistance.current +
            e.deltaY * zoomSpeed
          );

          const original =
            startCameraPosition.current;

          const offset = original
            .clone()
            .sub(target.position);

          // Preserve current horizontal orbit
          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            orbitAngle.current
          );

          // Preserve current vertical orbit
          offset.y += verticalOffset.current;

          // Apply zoom
          offset.setLength(
            zoomDistance.current
          );

          camera.position
            .copy(target.position)
            .add(offset);

          camera.position.y =
            THREE.MathUtils.clamp(
              camera.position.y,
              MIN_CAMERA_Y,
              MAX_CAMERA_Y
            );

          camera.lookAt(
            target.position
          );

          console.log(
            "Zoom distance:",
            zoomDistance.current.toFixed(3)
          );
        }}

        onPointerMove={(e) => {
          const camera = cameraRef.current;
          const target = targetRef.current;

          if (!camera || !target) return;

          // Update pointer
          if (pointers.current.has(
            e.pointerId
          )) {
            pointers.current.set(
              e.pointerId,
              {
                x: e.clientX,
                y: e.clientY,
              }
            );
          }

          // =========================
          // PINCH ZOOM
          // =========================

          if (pointers.current.size === 2) {
            const [a, b] = [
              ...pointers.current.values(),
            ];

            const currentDistance =
              Math.hypot(
                a.x - b.x,
                a.y - b.y
              );

            if (
              lastPinchDistance.current !==
              null
            ) {
              const delta =
                currentDistance -
                lastPinchDistance.current;

              const zoomSpeed = 0.05;

              applyZoom(
                zoomDistance.current -
                delta * zoomSpeed
              );

              const original =
                startCameraPosition.current;

              const offset = original
                .clone()
                .sub(target.position);

              // Horizontal orbit
              offset.applyAxisAngle(
                new THREE.Vector3(
                  0,
                  1,
                  0
                ),
                orbitAngle.current
              );

              // Vertical orbit
              offset.y +=
                verticalOffset.current;

              // Preserve zoom
              offset.setLength(
                zoomDistance.current
              );

              camera.position
                .copy(target.position)
                .add(offset);

              camera.position.y =
                THREE.MathUtils.clamp(
                  camera.position.y,
                  MIN_CAMERA_Y,
                  MAX_CAMERA_Y
                );

              camera.lookAt(
                target.position
              );

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

          if (
            !camera.userData.dragging
          ) {
            return;
          }

          const deltaX =
            e.clientX -
            camera.userData.lastX;

          const deltaY =
            e.clientY -
            camera.userData.lastY;

          // Horizontal
          orbitAngle.current -=
            deltaX * 0.02;

          // Vertical
          // Inverted + sensitive
          verticalOffset.current +=
            deltaY * 0.05;

          const original =
            startCameraPosition.current;

          const offset = original
            .clone()
            .sub(target.position);

          // Horizontal orbit
          offset.applyAxisAngle(
            new THREE.Vector3(
              0,
              1,
              0
            ),
            orbitAngle.current
          );

          // Vertical movement
          offset.y +=
            verticalOffset.current;

          // Preserve zoom
          offset.setLength(
            zoomDistance.current
          );

          camera.position
            .copy(target.position)
            .add(offset);

          // Vertical limits
          camera.position.y =
            THREE.MathUtils.clamp(
              camera.position.y,
              MIN_CAMERA_Y,
              MAX_CAMERA_Y
            );

          camera.lookAt(
            target.position
          );

          camera.userData.lastX =
            e.clientX;

          camera.userData.lastY =
            e.clientY;

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
            multiTouchGesture.current = false;

            if (cameraRef.current) {
              cameraRef.current.userData.dragging = false;
            }
          }
        }}

        onPointerCancel={(e) => {
          pointers.current.delete(
            e.pointerId
          );

          if (
            pointers.current.size < 2
          ) {
            lastPinchDistance.current =
              null;
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
