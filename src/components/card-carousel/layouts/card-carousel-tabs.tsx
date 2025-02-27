// import {
//   Consultingv2BlocksCardCarousel as CardCarousel,
//   Consultingv2BlocksCardCarousel,
// } from "@/tina/types";
import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useResizeObserver } from "usehooks-ts";

import { CategoryGroup } from "../card-carousel";




export type TabsProps = {
  categoryGroup: CategoryGroup[];
  tabsData: {
    buttonRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
    tabWrapperRef: React.MutableRefObject<HTMLDivElement>;
    selectedIndex: number;
    setActiveCategory;
    tabDimemsions: {
      width: number;
      height: number;
      top: number;
      left: number;
    };
  };
};

// type Background ={
//   backgroundColour: number;
//   backgroundImage: string;
//   bleed: boolean;
// }

//type CardCarousel = Consultingv2BlocksCardCarousel


// type cate
// type CardCarousel = {
//   isStacked: boolean;
//   heading: string;
//   isH1: boolean;
//   body: string;
//   buttons: [],//todo fill
//   categoryGroup: CategoryGroup;
//   cards: [] //todo fill
//   background: Background//todo deprecate
// }

const useTabCarousel = ({ categoryGroup }: {categoryGroup: CategoryGroup[]}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  //Sliding tabs
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRefs.current[selectedIndex];
    if (button) {
      const { clientWidth, offsetLeft, offsetTop, clientHeight } = button;
      setTabDimensions({
        top: offsetTop,
        left: offsetLeft,
        width: clientWidth,
        height: clientHeight,
      });
    }
  }, [selectedIndex, containerDimensions]);
  const [activeCategory, setActiveCategory] = useState(
    categoryGroup?.at(0) ?? null
  );
  useResizeObserver({
    ref: tabWrapperRef,
    onResize: () => {
      const { clientWidth, clientHeight } = tabWrapperRef.current;
      setContainerDimensions({ width: clientWidth, height: clientHeight });
    },
  });
  useEffect(()=>{
    setActiveCategory(categoryGroup?.at(selectedIndex) ?? null);
  }, [categoryGroup])
  useEffect(() => {
    const tabIndex = categoryGroup?.indexOf(activeCategory);
    setSelectedIndex(tabIndex ?? 0);
  }, [activeCategory, categoryGroup]);
  const [tabDimemsions, setTabDimensions] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (tabWrapperRef) {
      const { clientHeight, clientWidth } = tabWrapperRef.current;
      setContainerDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [tabWrapperRef]);

  return {
    tabsData: {
      buttonRefs,
      tabWrapperRef,
      selectedIndex,
      tabDimemsions,
      setActiveCategory,
    },
    categoryGroup,
    activeCategory,
  };
};

const Tabs = ({ categoryGroup, tabsData }: TabsProps) => {
  const {
    tabWrapperRef,
    buttonRefs,
    selectedIndex,
    tabDimemsions,
    setActiveCategory,
  } = tabsData;

  return (
    <div
      className="relative m-auto flex flex-wrap overflow-hidden rounded-md bg-black"
      ref={tabWrapperRef}
    >
      {/* Underlay to achieve the slide effect */}
      <span
        className="absolute inset-y-0 flex overflow-hidden rounded-md transition-all duration-500"
        style={{
          left: tabDimemsions.left,
          width: tabDimemsions.width,
          marginTop: tabDimemsions.top,
          height: tabDimemsions.height,
        }}
      >
        <span className="size-full bg-white" />
      </span>
      {/* Actual buttons */}
      {categoryGroup?.map((category, index) => {
        return (
          <>
            <button
              data-tina-field={tinaField(category, "categoryName")}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              key={`category-${index}`}
              className={`relative w-fit min-w-24 rounded-md bg-transparent p-2 transition-colors duration-500 ${
                selectedIndex === index ? "text-black" : "text-gray-200"
              }`}
              onClick={() => {
                setActiveCategory(category);
              }}
            >
              {category.categoryName}
            </button>
          </>
        );
      })}
    </div>
  );
};

export { Tabs, useTabCarousel };

