"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { GLOBE } from "@/lib/constants";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { HolographicGlobe } from "./HolographicGlobe";
import { SceneLighting } from "./SceneLighting";

function SceneContent() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <SceneLighting />
      <HolographicGlobe reducedMotion={reducedMotion} isMobile={isMobile} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          intensity={isMobile ? 0.7 : 0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function SceneCanvas() {
  const isMobile = useIsMobile();
  const cameraPosition = isMobile
    ? GLOBE.cameraPositionMobile
    : GLOBE.cameraPositionDesktop;

  return (
    <Canvas
      camera={{
        position: [cameraPosition[0], cameraPosition[1], cameraPosition[2]],
        fov: GLOBE.cameraFov,
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
