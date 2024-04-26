import { PencilIcon, PlusIcon } from "@heroicons/react/16/solid";
import NodePanel from "~/app/(protected)/document/[id]/tool-panel/node-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import ElementsPanel from "./elements-panel";

export default function ToolPanel() {
  return (
    <div className="flex h-full w-full max-w-xs flex-shrink-0 flex-col border-r">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <PlusIcon className={"w-8"} />
          </TabsTrigger>
          <TabsTrigger value="password">
            <PencilIcon className={"w-6"} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className={"px-6"}>
          <ElementsPanel />
        </TabsContent>
        <TabsContent value="password" className={"px-6"}>
          <NodePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
