const projects = [
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024", thumbnail: "/path-to-thumbnail.jpg" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024", thumbnail: "/path-to-thumbnail.jpg" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024", thumbnail: "/path-to-thumbnail.jpg" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024", thumbnail: "/path-to-thumbnail.jpg" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024", thumbnail: "/path-to-thumbnail.jpg" },
];

export default function ProjectGrid() {
  return (
    <div>
      <h2 className={"font-manrope pl-7 pt-7 text-2xl font-semibold text-black"}>All Projects</h2>

      <div className={"grid grid-cols-[repeat(auto-fill,minmax(328px,1fr))] items-start justify-center gap-8 p-8"}>
        <div
          className={
            "flex h-[297px] w-[323px] cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 bg-[#F7F7F7] shadow-sm"
          }
        ></div>
        {projects.map((project, index) => (
          <div
            key={index}
            className={
              "mb-4 flex w-full flex-col items-start justify-between overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md"
            }
          >
            <div className={"p-2 text-black"}>
              <div className={"my-2 text-lg font-bold text-black"}>{project.name}</div>
              <div className={"text-sm text-black"}>Edited {project.edited}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
