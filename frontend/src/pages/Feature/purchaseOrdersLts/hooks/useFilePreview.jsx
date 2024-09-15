import { useEffect, useState } from "react";

export default function useFilePreview(file, setImgError) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (file && file?.[0]) {
      if (
        file?.[0]?.type == "image/jpeg" ||
        file?.[0]?.type == "image/png" ||
        file?.[0]?.type == "image/svg+xml"
      ) {
        const newUrl = URL.createObjectURL(file[0]);

        if (newUrl !== imgSrc) {
          setImgSrc(newUrl);
          setImgError("");
        }
      } else {
        setImgSrc(null);
        setImgError("Plaese choose followed types png,svg,jpeg.");
      }
    }
  }, [file]);

  return [imgSrc, setImgSrc];
}
