import { COLORS } from "@/lib/constants";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 3, 5]} intensity={1.2} color={COLORS.accentCyan} />
      <pointLight position={[-4, -2, 3]} intensity={0.4} color="#0ea5e9" />
    </>
  );
}
