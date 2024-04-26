"use client";

import ProfileSchema from "~/types/ProfileSchema";

import Editor from "./editor";
import ToolPanel from "./tool-panel";

export default function Main({ id, content, profile }: { id: string; content: object | null; profile: ProfileSchema }) {
  return (
    <div className={"mx-auto flex w-full flex-1"}>
      <ToolPanel />
      <div className={"flex flex-1"}>
        <div className={"flex-1 bg-white"}>
          <Editor id={id} content={content} profile={profile} />
        </div>
      </div>
    </div>
  );
}
