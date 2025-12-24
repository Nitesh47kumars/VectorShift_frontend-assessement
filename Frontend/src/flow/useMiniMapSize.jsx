import { useEffect, useState } from "react";

function useMiniMapSize() {
  const [size, setSize] = useState({ width: 260, height: 130 });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setSize(
        media.matches
          ? { width: 100, height: 170 }
          : { width: 260, height: 130 }
      );
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return size;
}

export default useMiniMapSize;
