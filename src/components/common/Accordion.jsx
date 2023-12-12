import { useSignal } from "@preact/signals-react";
import { useRef } from "react";
import classNames from "classnames";

const Accordion = ({ header, body }) => {
  const expandClass = useSignal(false);
  const accordionRef = useRef(null);
  const isAccordionOpen = expandClass.value;
  const onClickAccordion = () => {
    expandClass.value = isAccordionOpen ? false : true;
  };

  return (
    <div className="m-2 space-y-2">
      <div
        className={classNames(
          "group flex flex-col gap-2 rounded-lg bg-black p-5 text-white dark:bg-gray-200 dark:text-gray-400 cursor-pointer",
          {
            "overflow-auto": isAccordionOpen,
          },
          {
            "overflow-hidden": !isAccordionOpen,
          }
        )}
        tabIndex="1"
        ref={accordionRef}
        onClick={onClickAccordion}
      >
        <div className="flex cursor-pointer items-center justify-between">
          <span className="w-full">{header}</span>
          <img
            alt="expand or collapse button"
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
            className={classNames(
              "h-2 w-3 transition-all duration-500 expand-collapse-icon",
              {
                "-rotate-180": isAccordionOpen,
              }
            )}
          />
        </div>
        <div
          className={classNames(
            "h-auto max-h-0 items-center opacity-0 transition-all",
            {
              "visible max-h-full opacity-100 duration-1000 border-t border-t-zinc-200 dark:border-t-black":
                isAccordionOpen,
            },
            {
              "invisible -z-10 h-0": !isAccordionOpen,
            }
          )}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
