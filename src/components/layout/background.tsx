/**
 * https://nextjs.org/docs/app/api-reference/components/image#art-direction
 */

import { getImageProps } from "next/image";

export default function Background() {
  const common = { alt: "Gaming Haven Z", sizes: "100vw" };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/images/keys-desktop.png",
    width: 800,
    height: 180,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/keys.png",
    width: 180,
    height: 180,
  });

  return (
    <picture className="absolute left-0 top-0 -z-[1] md:right-0">
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />

      <img {...rest} className="h-auto w-full" alt={common.alt} />
    </picture>
  );
}
