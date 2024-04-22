import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { cn } from "~/lib/utils";

interface Category {
  title: string;
  items: Item[];
}

interface Item {
  element?: JSX.Element; // Assuming element is an optional React element
  title: string; // Title is a string
}

interface CommandListProps {
  items: Category[]; // Updated prop to accept categories
  command: (item: Item) => void; // Function type for the command prop
}

export default forwardRef(({ items: categories, command }: CommandListProps, ref) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const selectItem = (categoryIndex: number, itemIndex: number) => {
    const item = categories[categoryIndex]?.items[itemIndex];

    if (item) {
      command(item);
    }
  };

  const upHandler = () => {
    if (selectedItemIndex === 0) {
      if (selectedCategoryIndex === 0) {
        // do nothing
      } else {
        const newCategoryIndex = selectedCategoryIndex - 1;
        setSelectedCategoryIndex(newCategoryIndex);
        setSelectedItemIndex(categories[newCategoryIndex].items.length - 1);
      }
    } else {
      setSelectedItemIndex(
        (selectedItemIndex + categories[selectedCategoryIndex].items.length - 1) %
          categories[selectedCategoryIndex].items.length
      );
    }
  };

  const downHandler = () => {
    if (selectedItemIndex === categories[selectedCategoryIndex].items.length - 1) {
      if (selectedCategoryIndex === categories.length - 1) {
        // do nothing
      } else {
        setSelectedCategoryIndex(selectedCategoryIndex + 1);
        setSelectedItemIndex(0);
      }
    } else {
      setSelectedItemIndex((selectedItemIndex + 1) % categories[selectedCategoryIndex].items.length);
    }
  };

  const enterHandler = () => {
    selectItem(selectedCategoryIndex, selectedItemIndex);
  };

  useEffect(() => {
    setSelectedCategoryIndex(0);
    setSelectedItemIndex(0);
  }, [categories]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: { key: string } }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md"
      tabIndex={0}
    >
      <div className={"w-56 space-y-1 overflow-y-auto overflow-x-hidden px-1 py-2"}>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={"text-sm"}>
            <p className="px-2 py-1 text-xs font-bold text-foreground/50">{category.title}</p>
            <div className={"overflow-hiddentext-foreground flex flex-col"}>
              {category.items.map((item, itemIndex) => (
                <button
                  className={cn(
                    "px-2 py-1 text-left font-medium transition-all",
                    selectedCategoryIndex === categoryIndex &&
                      selectedItemIndex === itemIndex &&
                      "rounded-sm bg-muted font-bold"
                  )}
                  key={itemIndex}
                  onClick={() => selectItem(categoryIndex, itemIndex)}
                  onMouseEnter={() => {
                    setSelectedCategoryIndex(categoryIndex);
                    setSelectedItemIndex(itemIndex);
                  }}
                >
                  {item.element || item.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
