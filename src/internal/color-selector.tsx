import React from "react";
import { wrapFieldsWithMeta } from "tinacms";
import { ColorPickerOptions } from "../interfaces/color-options";

interface ColorPickerProps {
  colours: ColorPickerOptions[];
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({ colours, value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colours.map((colour) => (
        <button
          key={colour.name}
          className={`h-9 w-full rounded-full border shadow ${
            colour.editorClasses ?? colour.classes
          } ${
            value === colour.reference
              ? "ring ring-blue-400 ring-offset-2"
              : ""
          }`}
          onClick={() => onChange?.(colour.reference)}
        >
          {colour.name}
        </button>
      ))}
    </div>
  );
};

export const ColorPickerInput = (colours: ColorPickerOptions[]) => {
  // Try to use TinaCMS context, but don't throw if it's not available
  try {
    return wrapFieldsWithMeta(({ input }) => (
      <ColorPickerComponent 
        colours={colours}
        value={input.value}
        onChange={input.onChange}
      />
    ));
  } catch (error) {
    // Fallback to regular component if TinaCMS context is not available
    return ({ value, onChange }: { value?: string | number; onChange?: (value: string | number) => void }) => (
      <ColorPickerComponent
        colours={colours}
        value={value}
        onChange={onChange}
      />
    );
  }
};
