const Accordian = ({ header, body }) => {
  return (
    <div class="m-2 space-y-2">
      <div
        class="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white group-focus:overflow-scroll"
        tabindex="1"
      >
        <div class="flex cursor-pointer items-center justify-between">
          <span>{header}</span>
          <img
            alt="expand or collapse button"
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
            class="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
          />
        </div>
        <div class="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-full group-focus:opacity-100 group-focus:duration-1000 border-t border-t-zinc-200">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
