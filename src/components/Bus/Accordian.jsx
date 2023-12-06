import { useSignal } from "@preact/signals-react";
import { useRef } from "react";
import classNames from "classnames";

const Accordian = ({ header, body }) => {
  const expandClass = useSignal(false);
  const accordianRef = useRef(null);
  const onClickAccordian = (e) => {
    expandClass.value = expandClass.value ? false : true;
  };

  return (
    <div className="m-2 space-y-2">
      <div
        className={classNames(
          "group flex flex-col gap-2 rounded-lg bg-black p-5 text-white",
          {
            "overflow-scroll": expandClass.value,
          }
        )}
        tabIndex="1"
        ref={accordianRef}
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={onClickAccordian}
        >
          <span>{header}</span>
          <img
            alt="expand or collapse button"
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
            className={classNames("h-2 w-3 transition-all duration-500", {
              "-rotate-180": expandClass.value,
            })}
          />
        </div>
        <div
          className={classNames(
            "h-auto max-h-0 items-center opacity-0 transition-all",
            {
              "visible max-h-full opacity-100 duration-1000 border-t border-t-zinc-200":
                expandClass.value,
            },
            {
              "hidden": !expandClass.value,
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
