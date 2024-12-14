import { useEffect, useState } from "react";

export default function useFullScreen(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  return [isFullScreen, setIsFullScreen];
}
