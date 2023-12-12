import { useSignal } from "@preact/signals-react";
import { useRef } from "react";
import classNames from "classnames";

const Accordian = ({ header, body }) => {
  const expandClass = useSignal(false);
  const accordianRef = useRef(null);
  const isAccordianOpen = expandClass.value;
  const onClickAccordian = () => {
    expandClass.value = isAccordianOpen ? false : true;
  };

  return (
    <div className="m-2 space-y-2">
      <div
        className={classNames(
          "group flex flex-col gap-2 rounded-lg bg-black p-5 text-white dark:bg-gray-200 dark:text-gray-400 cursor-pointer",
          {
            "overflow-auto": isAccordianOpen,
          },
          {
            "overflow-hidden": !isAccordianOpen,
          }
        )}
        tabIndex="1"
        ref={accordianRef}
        onClick={onClickAccordian}
      >
        <div className="flex cursor-pointer items-center justify-between">
          <span className="w-full">{header}</span>
          <img
            alt="expand or collapse button"
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
            className={classNames(
              "h-2 w-3 transition-all duration-500 expand-collapse-icon",
              {
                "-rotate-180": isAccordianOpen,
              }
            )}
          />
        </div>
        <div
          className={classNames(
            "h-auto max-h-0 items-center opacity-0 transition-all",
            {
              "visible max-h-full opacity-100 duration-1000 border-t border-t-zinc-200 dark:border-t-black":
                isAccordianOpen,
            },
            {
              "invisible -z-10 h-0": !isAccordianOpen,
            }
          )}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
