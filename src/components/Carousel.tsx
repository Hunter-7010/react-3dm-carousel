import React, { useRef, useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  LazyMotion,
  m,
  domAnimation,
  useAnimationControls,
} from "framer-motion";
import { MouseEvent, WheelEvent, TouchEvent } from "react";
import "../index.css";
import { defaultData } from "../utils/consts";
// import s from "@/styles/cases-landing.module.css";
// import NextImage from "./image";
import { useWindowSize } from "../utils/hooks";
// import Link from "next/link";
type Props = {
  /**
   * Card data that is passed.
   */
  cardsData?: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
  /**
   * `Optional` Enable or disable rotation of the carousel.
   * Defaults to `true` (rotation is enabled).
   */
  rotation?: boolean;
  /**
   * `Optional` time in `seconds` it takes to complete a full rotation.
   * Only applicable when `rotation` is enabled. defaults to `60` seconds.
   */
  rotationDuration?: number;
  /**
   * `Optional` Cool tilt effect on `Carousel` relative to mouse position.
   * defaults to `true`.
   */
  tilt?: boolean;
  /**
   * `Optional` `React state setter` to pass your setState to Carousel.
   * defaults to `undefined`.
   */
  setSelectedCardIdx?: React.Dispatch<React.SetStateAction<number>>;
  /**
   * `Optional` Enables the user to freely rotate and move around the carousel canvas.
   * defaults to `false` enabling this feature will cause the tilt to `disable`.
   */
  freeRoam?: boolean;
 /**
   * `Optional` define the upper bounds of the free roam.
   * defaults to `0`. /- make upper bounds to `360` and lower bounds to `-360` to move in all directions.
   */
  freeRoamUpperBounds?: number;
 /**
   * `Optional` define the lower bounds of the free roam.
   * defaults to `-180`. /- make upper bounds to `360` and lower bounds to `-360` to move in all directions.
   */
  freeRoamLowerBounds?: number;
};

export const Carousel = ({
  cardsData = defaultData,
  setSelectedCardIdx = undefined,
  rotation = true, // infinite rotation
  rotationDuration = 60, //time it takes to complete a full rotation
  tilt = true,
  freeRoam = false,
  freeRoamUpperBounds = 0,

  freeRoamLowerBounds = -180,
}: Props) => {
  const { width } = useWindowSize();

  const numberOfCards = cardsData.length;
  const cardGaps =
    numberOfCards *
    (width <= 412 ? 25 : width <= 767 ? 35 : width <= 1500 ? 36 : 53);

  // const radiusMotion = useMotionValue(300);
  // const radiusMotionSpring = useSpring(radiusMotion, {
  //   damping: 200,
  //   stiffness: 400,
  // });

  const rootRef = useRef<HTMLDivElement>(null);
  const ospin = useRef(null);
  const odrag = useRef(null);
  const ground = useRef(null);
  //using let to not cause react rerenders
  let startX = 0;
  let startY = 0;
  let expand = true;
  let pointerDown = false;

  // horizontal rotation
  const dragTy = useMotionValue(0);
  const dragTySpring = useSpring(dragTy, { damping: 200, stiffness: 400 });

  // vertical rotation
  const dragTx = useMotionValue(-0);
  const dragTxSpring = useSpring(dragTx, { damping: 200, stiffness: 400 });

  //rotate
  const rotate = useMotionValue(0);
  // const rotateSpring = useSpring(rotate);

  const controls = useAnimationControls();
  // const [scope, animate] = useAnimate();

  //   setting animation on first render for the images if infinite animation is needed
  useEffect(() => {
    if (rotation) {
      controls.start({
        rotateY: 360,
        transition: {
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  }, []);
  const handleMouseWheel = (e: WheelEvent) => {
    const d = +e.deltaY / 20;
    // setting minimum radius to 360
    if (expand && d > 0) {
      // scroll down
      // radiusMotion.set(radiusMotion.get() + d);
      dragTy.set(dragTy.get() + d * 0.6);
    } else if (expand && d < 0) {
      // scroll up
      // radiusMotion.set(radiusMotion.get() - d);
      dragTy.set(dragTy.get() + d * 0.6);
    } else if (!expand && d > 0) {
      // scroll down
      // radiusMotion.set(radiusMotion.get() - d);
      dragTy.set(dragTy.get() + d * 0.6);
    } else if (!expand && d < 0) {
      // scroll up
      // radiusMotion.set(radiusMotion.get() + d);
      dragTy.set(dragTy.get() + d * 0.6);
    }
  };

  // camera drag
  const pointerDownHandler = (e: MouseEvent) => {
    e.preventDefault();
    pointerDown = true;
    if (rotation) {
      controls.stop(); // stop the the initial animation
    }
    controls.stop(); // stop the the initial animation
  };
  const pointerUpHandler = () => {
    pointerDown = false;
    //for starting initial animation
    if (rotation) {
      controls.start({
        rotateY: 360,
        transition: {
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  };
  const mouseLeaveHandler = () => {
    pointerDown = false;
  };

  const pointerMoveHandler = (e: MouseEvent) => {
    if (!pointerDown) return;
    e.preventDefault();
    const rotationSensitivity = 0.4; // Adjust the rotation sensitivity as needed
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    // console.log("deltaY", deltaY, "deltaX", deltaX);
    if (deltaY > 100) return;
    if (
      // at first drag values shouldnt be too great
      // deltaX > 200 ||
      freeRoam &&
      // set the bound for vertical rotation
      dragTx.get() - deltaY * rotationSensitivity <= freeRoamUpperBounds &&
      dragTx.get() - deltaY * rotationSensitivity >= freeRoamLowerBounds
    ) {
      dragTx.set(dragTx.get() - deltaY * rotationSensitivity);
    }

    dragTy.set(dragTy.get() + deltaX * rotationSensitivity);
    // console.log("dragtx", deltaY, "dragty", dragTy.get());
  };

  let touchStartX = 0;
  let deltaX = 0;

  const touchStartHandler = (e: TouchEvent) => {
    touchStartX = e.touches[0].pageX;
  };
  const touchMoveHandler = (e: TouchEvent) => {
    deltaX = touchStartX - e.touches[0].pageX;
    touchStartX = e.touches[0].pageX;
    dragTy.set(dragTy.get() - deltaX * 0.6);
  };

  const caseSelectHandler = (idx: number) => {
    if (pointerDown || !setSelectedCardIdx) return;
    setSelectedCardIdx(idx);
  };

  useEffect(() => {
    if (!tilt || freeRoam) return;
    const root = rootRef.current;
    const container = odrag.current;
    // Mouse Tracking animation
    const onMouseMove = (e: MouseEvent) => {
      if (!root || !container) return;
      const { clientX, clientY } = e;
      const { width: clientWidth, height: clientHeight } =
        root.getBoundingClientRect();
      const rotateXVal = (clientY - clientHeight / 2) * 0.06;
      const rotateYVal = (clientWidth / 2 - clientX) * 0.01;

      rotate.set(rotateYVal);
      dragTx.set(rotateXVal);
    };
    document.addEventListener(
      "mousemove",
      onMouseMove as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousemove",
        onMouseMove as unknown as EventListener
      );
    };
  }, []);

  const carouselVarients = {
    infiniteRotatation: ({
      idx,
      cardGaps,
    }: {
      idx: number;
      cardGaps: number;
    }) => ({
      transform: `rotateY(${
        (idx + 1) * (360 / numberOfCards)
      }deg) translateZ(${cardGaps}px)`,
      transition: {
        delay: 0.2 * (idx + 1),
        duration: 0.9,
      },
    }),
    inifineRotationInitial: {
      transform: `rotateY(0deg) translateZ(0px)`,
    },
  };
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onWheel={handleMouseWheel}
        onMouseDown={pointerDownHandler}
        onMouseUp={pointerUpHandler}
        onPointerMove={pointerMoveHandler}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onMouseLeave={mouseLeaveHandler}
        ref={rootRef}
        className={
          "rootCarousel" +
          " flex h-screen w-screen items-center overflow-hidden justify-center active:cursor-grab text-white"
        }
      >
        <m.div
          ref={odrag}
          className={"dragContainer"}
          //  responsible for dragging effect
          style={{
            rotateX: dragTxSpring,
            rotateY: dragTySpring,
            rotate: rotate,
          }}
        >
          <m.div
            ref={ospin}
            className={"spinContainer"}
            // if initial animation for infinite rotate is needed
            animate={controls}
          >
            {cardsData &&
              cardsData.map((card, idx: number) => (
                <m.div
                  key={idx + 1}
                  // ref={scope}
                  onMouseEnter={() => caseSelectHandler(idx)} // cause render which breaks the drag
                  className={"images" + ""} // setting style for increasing radius of the images
                  style={{
                    // x: useMotionTemplate`${radiusMotion}px`,
                    transform: useMotionTemplate`rotateY(${
                      (idx + 1) * (360 / numberOfCards)
                    }deg) translateZ(${cardGaps}px)`,
                    backgroundImage: `url(${card.image})`,
                  }}
                  custom={{ idx, cardGaps }}
                  variants={carouselVarients}
                  //  animations for starting animation
                  initial="inifineRotationInitial"
                  animate="infiniteRotatation"
                >
                  {/* <NextImage
                  layout="fill"
                  media={card.bgImg}
                  objectFit="cover"
                  className="rounded-lg"
                /> */}
                  <div className="content">
                    <p className="description">{card.description}</p>
                    {/* <Link
                    href={
                      onBlogs
                        ? card.blogLink.url
                          ? card.blogLink.url
                          : `blogs/${card.slug}`
                        : card.caseLink.url
                        ? card.caseLink.url
                        : `cases/${card.slug}`
                    }
                  >
                </Link> */}
                    <h3 className={"bigTitle"}>{card.title}</h3>
                  </div>
                </m.div>
              ))}

            {/* <p className={"centerText" + ""}>CASES</p> */}
          </m.div>
          <div ref={ground} className="ground"></div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};
