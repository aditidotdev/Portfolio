"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToSurfaceTransform } from "@/lib/geo";
import { GLOBE, MARKER } from "@/lib/constants";

type LocationMarkerProps = {
  lat: number;
  lng: number;
  radius: number;
  reducedMotion: boolean;
};

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function LocationMarker({
  lat,
  lng,
  radius,
  reducedMotion,
}: LocationMarkerProps) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const elapsedRef = useRef(0);

  const scale = radius / GLOBE.radiusDesktop;
  const surfaceRadius =
    radius + GLOBE.borderOffset + MARKER.surfaceOffset * scale;

  const { position, quaternion } = useMemo(
    () => latLngToSurfaceTransform(lat, lng, surfaceRadius),
    [lat, lng, surfaceRadius]
  );

  const dotRadius = MARKER.dotRadius * scale;
  const ring1Inner = MARKER.ring1.inner * scale;
  const ring1Outer = MARKER.ring1.outer * scale;
  const ring2Inner = MARKER.ring2.inner * scale;
  const ring2Outer = MARKER.ring2.outer * scale;
  const pulseInner = MARKER.pulseRing.inner * scale;
  const pulseOuter = MARKER.pulseRing.outer * scale;

  useFrame((_, delta) => {
    if (reducedMotion || !pulseRef.current || !pulseMaterialRef.current) return;

    elapsedRef.current =
      (elapsedRef.current + delta) % MARKER.pulseDuration;
    const t = easeOutQuad(elapsedRef.current / MARKER.pulseDuration);

    pulseRef.current.scale.setScalar(1 + t * 1.2);
    pulseMaterialRef.current.opacity = 0.7 * (1 - t);
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <circleGeometry args={[dotRadius, 24]} />
        <meshBasicMaterial
          color={MARKER.colors.dot}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[ring1Inner, ring1Outer, 32]} />
        <meshBasicMaterial
          color={MARKER.colors.ring}
          transparent
          opacity={0.65}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[ring2Inner, ring2Outer, 32]} />
        <meshBasicMaterial
          color={MARKER.colors.ring}
          transparent
          opacity={0.4}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {!reducedMotion && (
        <mesh ref={pulseRef}>
          <ringGeometry args={[pulseInner, pulseOuter, 32]} />
          <meshBasicMaterial
            ref={pulseMaterialRef}
            color={MARKER.colors.pulse}
            transparent
            opacity={0.7}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
