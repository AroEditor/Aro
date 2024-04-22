export default function Header() {
  return (
    <header className={"flex items-center justify-between p-2"}>
      <div className={"relative mx-4 flex-grow"}>
        <input
          type="text"
          placeholder="Search in Aro"
          className={
            "font-manrope w-full rounded-lg border border-gray-300 bg-[#EFEFEF] px-[40px] py-2.5 text-lg font-medium text-[#B5B5B5] placeholder-[#B5B5B5]"
          }
        />
      </div>
    </header>
  );
}
