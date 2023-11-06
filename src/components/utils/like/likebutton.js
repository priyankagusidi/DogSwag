import PawAnimation from "./likeanimation";
import PawIcon from "./likeicon";

function PawButton({ starred = false, ...rest }) {
  return (
    <button
      className={`StarButton ${starred ? "StarButton--starred" : ""}`}
      type="button"
      {...rest}
    >
      <PawAnimation starred={starred} />
      <PawIcon />
    </button>
  );
}

export default PawButton;