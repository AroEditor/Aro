export default function Sidebar() {
  return (
    <div className={"flex h-[1033px] w-[355px] flex-shrink-0 flex-col border border-[#CBCBD5] bg-[#EBEBEB] p-4"}>
      <div
        className={
          "mb-7 flex w-[262px] items-center gap-2.5 rounded-lg bg-[#F7F7F7] px-[21px] px-[99px] py-3 shadow-[0_0_4px_rgba(0,0,0,0.20)]"
        }
      >
        <span>Cole Gawin</span>
      </div>

      <button
        className={`font-manrope flex cursor-pointer items-center gap-2.5 px-4 py-2 text-lg font-semibold text-black`}
      >
        <p>Home</p>
      </button>

      <button
        className={"font-manrope flex cursor-pointer items-center gap-2.5 px-4 py-2 text-lg font-semibold text-black"}
      >
        <p>Your Projects</p>
      </button>
      <button
        className={"font-manrope flex cursor-pointer items-center gap-2.5 px-4 py-2 text-lg font-semibold text-black"}
      >
        <p>Shared with you</p>
      </button>
      <button
        className={"font-manrope flex cursor-pointer items-center gap-2.5 px-4 py-2 text-lg font-semibold text-black"}
      >
        <p>Archived</p>
      </button>
      <button
        className={"font-manrope flex cursor-pointer items-center gap-2.5 px-4 py-2 text-lg font-semibold text-black"}
      >
        <p>Trash</p>
      </button>
    </div>
  );
}
