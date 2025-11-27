import React from "react";
import Image from "next/image";
import { ImageProps } from "@/types/image";
import icon from "@/assets/icon.png";

const Icon: React.FC<ImageProps> = ({
  width = 200,
  height = 200,
  alt = "App Icon",
  className,
}) => (
  <Image
    src={icon}
    alt={alt}
    width={width}
    height={height}
    priority
    className={className}
  />
);

export default Icon;
