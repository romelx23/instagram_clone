import { useEffect, useMemo, useState } from "react";

export const useIntersection = (options, targetRef) => {
  const [visible, setVisible] = useState(false);
  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);
  const nextPublication = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
    // console.log(entry);
    // console.log("siguiente");
    // console.log(targetRef.current);
  };
//   console.log(visible);
  useEffect(() => {
    const observer = new IntersectionObserver(nextPublication, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, options]);
  return visible;
};
