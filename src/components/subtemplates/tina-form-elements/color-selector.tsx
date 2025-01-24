import { wrapFieldsWithMeta } from "tinacms";

export interface ColorPickerOptions {
  [key: string]: 
  {
    classes: string;
    editorClasses?: string;
  }
}

export const ColorPickerInput = (colors: ColorPickerOptions) => {
  return wrapFieldsWithMeta(({ input }) => {
    return (
      <>
        {/* <input type="number" id={input.name} className="hidden" {...input} /> */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(colors).map((color) => { 
              const colorClasses = colors[color];
              return <button
              key={`color-${color}`}
              className={`h-9 w-full rounded-full border shadow ${
                colorClasses.editorClasses ?? colorClasses.classes
                // colour.editorClasses ?? colour.classes
              } ${
                input.value === color
                  ? "ring ring-blue-400 ring-offset-2"
                  : ""
              }`}
              onClick={() => {
                input.onChange(color);
              }}
              >
              {color}
              </button>  
            })
          }
          </div>
          </>
      //     </div>

      //     {colours.map((colour) => {
      //       return (
      //         <button
      //           key={colour.name}
      //           className={`h-9 w-full rounded-full border shadow ${
      //             colour.editorClasses ?? colour.classes
      //           } ${
      //             input.value === colour.reference
      //               ? "ring ring-blue-400 ring-offset-2"
      //               : ""
      //           }`}
      //           onClick={() => {
      //             input.onChange(colour.reference);
      //           }}
      //         >
      //           {colour.name}
      //         </button>
      //       );
      //     })}
      //   </div>
      // </>
    );
  });
};
