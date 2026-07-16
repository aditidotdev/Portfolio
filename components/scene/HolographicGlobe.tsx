"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANIMATION, GLOBE, MARKER } from "@/lib/constants";
import { CountryFill } from "./CountryFill";
import { CountryBorders } from "./CountryBorders";
import { GraticuleLines } from "./GraticuleLines";
import { LocationMarker } from "./LocationMarker";

type HolographicGlobeProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

export function HolographicGlobe({
  reducedMotion,
  isMobile,
}: HolographicGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const radius = isMobile ? GLOBE.radiusMobile : GLOBE.radiusDesktop;
  const position = isMobile ? GLOBE.positionMobile : GLOBE.positionDesktop;
  const [rotX, rotY, rotZ] = GLOBE.initialRotation;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * ANIMATION.globeRotationSpeed;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      rotation={[rotX, rotY, rotZ]}
    >
      <CountryFill radius={radius} />
      <GraticuleLines radius={radius} />
      <CountryBorders radius={radius} />
      <LocationMarker
        lat={MARKER.jhansi.lat}
        lng={MARKER.jhansi.lng}
        radius={radius}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
