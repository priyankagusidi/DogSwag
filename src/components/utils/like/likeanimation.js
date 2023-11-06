const svgWidth = 96;
const svgHeight = 96;
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

const yellow1 = "#F7D527";
const yellow2 = "#E0C016";
const yellow3 = "#C1A40A";
const yellows = [yellow1, yellow2, yellow3];

function PawAnimation({ starred, ...rest }) {
  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: starred ? 1 : 0 }}
      className="StarAnimation"
      {...rest}
    >
      <PulseWave starred={starred} />
      <Particles starred={starred} />
    </svg>
  );
}

export default PawAnimation;

function PulseWave({ starred = false, radius = 47 }) {
  // Apply animation via style attribute if starred === true
  const style = starred
    ? {
        transform: "scale(1)",
        transformOrigin: "center center",
        opacity: 0,
        transition: "transform 400ms, opacity 400ms",
        transitionDelay: "0ms, 200ms"
      }
    : { transform: "scale(0)" };

  return (
    <circle
      cx={centerX}
      cy={centerY}
      style={style}
      r={radius}
      strokeWidth={1}
      stroke={yellow1}
    />
  );
}

function Particles({
  starred = false,
  numParticles = 20,
  minParticleRadius = 1,
  maxParticleRadius = 3,
  minParticleDistance = 32,
  maxParticleDistance = 42
}) {
  return Array.from({ length: numParticles }).map((_, i) => {
    // Calculate initial properties
    const cx = centerX;
    const cy = centerY;
    const fill = yellows[Math.floor(Math.random() * 3)];
    const radius =
      minParticleRadius +
      Math.random() * (maxParticleRadius - minParticleRadius);

    // Calculate target position
    const travelDistance =
      minParticleDistance +
      Math.random() * (maxParticleDistance - minParticleDistance) -
      radius;
    const travelAngle = 2 * Math.PI * (i / numParticles);
    const targetCx = centerX + Math.cos(travelAngle) * travelDistance;
    const targetCy = centerY + Math.sin(travelAngle) * travelDistance;

    // Calculate style values
    const translateX = targetCx - cx;
    const translateY = targetCy - cy;
    const travelDuration = 200 + Math.random() * 300;
    const opacityDuration = travelDuration * 1.2;

    // Apply animation via style attribute if starred === true
    const style = starred
      ? {
          transform: `translate(${translateX}px, ${translateY}px)`,
          opacity: starred ? 0 : 1,
          transition: `transform ${travelDuration}ms, opacity ${opacityDuration}ms`,
          transitionDelay: `0ms, ${travelDuration * 0.8}ms`
        }
      : {};

    return (
      <circle key={i} cx={cx} cy={cy} r={radius} fill={fill} style={style} />
    );
  });
}