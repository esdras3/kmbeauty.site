const ASPECT = 428 / 278;

export function KmLogo({ height = 52 }: { height?: number }) {
  const width = Math.round(height * ASPECT);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/km-logo.png"
      alt="KM Beauty"
      width={width}
      height={height}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}
