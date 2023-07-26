import React from "react";
import { NEXT_PUBLIC_BASE_URL } from "config";
import styles from "./SpecialImage.module.scss";

const SpecialImage = ({
  imageKey = "7d1941599943312616c9d54fa571bf88",
  alt = "photo",
}: {
  imageKey: string | undefined;
  alt: string | undefined;
}) => {
  let realm: any = null;

  if (typeof window !== "undefined") {
    realm = localStorage.getItem("realm");
  }

  return (
    <img
      src={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${imageKey}`}
      alt={alt}
      className={styles.img}
      onError={({ currentTarget }) => {
        // eslint-disable-next-line no-param-reassign
        currentTarget.onerror = null;
        // eslint-disable-next-line no-param-reassign
        currentTarget.src = `${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/7d1941599943312616c9d54fa571bf88`;
      }}
    />
  );
};

export default SpecialImage;
