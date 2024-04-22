import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";

import CommandsList from "./CommandsList";

const renderItems = () => {
  let component: ReactRenderer;
  let popup: Instance;

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      [popup] = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props: any) {
      component.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props: any) {
      if (props.event.key === "Escape") {
        popup.hide();

        return true;
      }

      return (component?.ref as any)?.onKeyDown(props);
    },
    onExit() {
      popup.destroy();
      component?.destroy();
    },
  };
};

export default renderItems;
