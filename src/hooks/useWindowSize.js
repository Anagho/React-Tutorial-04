import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // To prevent some memory leak in our application, we use a cleanUp function

    return () => window.removeEventListener("resize", handleResize);;
  }, []);

  return windowSize;
};

export default useWindowSize;
