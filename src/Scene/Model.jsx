import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { usePortfolioScroll } from "../Context/ScrollContext";
const modelPath = import.meta.env.BASE_URL + "3dmodels/f2.glb";

export default function Model({
  setCursorLabel,
}) {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, scene);
  const { set } = useThree();
  const scroll = useScroll();
  const {
    currentSection,
    setCurrentSection,
    setScrollElement,
  } = usePortfolioScroll();

  useEffect(() => {
    const blenderCamera = scene.getObjectByName("CameraMiain");
    const github = scene.getObjectByName("GithubHitbox");
    const linkedin = scene.getObjectByName("LinkedinHitbox");
    const email = scene.getObjectByName("MailHitbox");
    // console.log(github);
    // console.log(linkedin);
    // console.log(email);

    [github, linkedin, email].forEach((obj) => {
      obj.material = obj.material.clone();
      obj.material.transparent = true;
      obj.material.opacity = 0;
    });

    github.userData.url = "https://github.com/Im-1ucky";
    linkedin.userData.url =
      "https://www.linkedin.com/in/lucky-reddy-535811391";
    email.userData.url = "mailto:luckymi11lite@gmail.com";

    if (blenderCamera) {
      set({ camera: blenderCamera });
    }

    Object.entries(actions).forEach(([name, action]) => {
      action.play();

      if (name === "Computer Chair_High Heels 2_0Action") {
        action.timeScale = 0.25;
      } else {
        action.paused = true;
      }
    });
  }, [scene, actions, set]);

  useEffect(() => {
    setScrollElement(scroll.el);
  }, [scroll, setScrollElement]);

  useFrame((state, delta) => {
    mixer.update(delta);

    const progress = scroll.offset;
    //console.log(progress.toFixed(3));

    //console.log(progress);

    let section = 0;

    if (progress < 0.09) section = 0;
    else if (progress < 0.19) section = 1;
    else if (progress < 0.32) section = 2;
    else if (progress < 0.61) section = 3;
    else if (progress < 0.79) section = 4;
    else if (progress < 0.92) section = 5;
    else section = 6;

    if (section !== currentSection) {
      console.log("Section:", section, "Progress:", progress.toFixed(3));
      setCurrentSection(section);
    }

    Object.entries(actions).forEach(([name, action]) => {
      if (!action) return;

      if (name !== "Computer Chair_High Heels 2_0Action") {
        action.time = progress * action.getClip().duration;
      }
    });
  });

  const handleClick = (e) => {
    e.stopPropagation();

    const url = e.object.userData.url;
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();

    switch (e.object.name) {
      case "GithubHitbox":
        setCursorLabel("Open GitHub");
        break;

      case "LinkedinHitbox":
        setCursorLabel("Open LinkedIn");
        break;

      case "MailHitbox":
        setCursorLabel("Open Mail");
        break;

      default:
        return;
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (
      e.object.name === "GithubHitbox" ||
      e.object.name === "LinkedinHitbox" ||
      e.object.name === "MailHitbox"
    ) {
      setCursorLabel("");
    }
  };

  return (
    <primitive
      object={scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

useGLTF.preload(import.meta.env.BASE_URL + "3dmodels/f2.glb");
