import Lottie from "lottie-react";
import notFound from "@assets/svg/lottieFiles/notFound.json";
import empty from "@assets/svg/lottieFiles/empty.json";
import loading from "@assets/svg/lottieFiles/loading.json";
import error from "@assets/svg/lottieFiles/error.json";

const LottieFileMap = {
  notFound,
  empty,
  loading,
  error,
};

type LottieHandlerProps = {
  type: keyof typeof LottieFileMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = LottieFileMap[type];
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie
        animationData={lottie}
        style={{ width: "400px", marginBottom: "30px" }}
      />
      {message && <h3 style={{ fontSize: "19px" }}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
