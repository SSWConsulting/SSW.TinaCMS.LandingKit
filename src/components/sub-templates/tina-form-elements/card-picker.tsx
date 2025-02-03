import { useEffect, useState } from "react";
import { wrapFieldsWithMeta } from "tinacms";
import { Checkbox } from '../../../internal/shadcn/checkbox';


function getNestedValue(obj: object, path: string) : any {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) 
    {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        if (!current[key]) {
        throw new Error(`unable to find key ${key} in ${JSON.stringify(obj)}`);
        }
        current = current[key];
    }
    return current;
}
const CarouselCardPicker = ({outerBlocksFieldName}: {outerBlocksFieldName: string} )=> {
    return wrapFieldsWithMeta(({ form, input }) => {
      // Gets the card carousel within the block list
      const blockComponentRegex = new RegExp(`^${outerBlocksFieldName.replaceAll(".", "\\.")}\\.(\\d+)`);
      const currentBlockIndex = input.name.match(blockComponentRegex)[1];
      const blocksField = getNestedValue(form.getState().values, outerBlocksFieldName);
      const carouselField = blocksField[parseInt(currentBlockIndex)]
      const formState = form.getState();
      const formValues = formState.values;
      const [fieldValues, setFieldValues] = useState(
        input.value?.cardGuidList ?? []
      );
      const [options, setOptions] = useState([]);
      useEffect(() => {
        if (!input.value?.guid) {
          input.onChange({
            guid: GUIDFunction(),
            cardGuidList: [],
          });
        }
        setOptions(carouselField.cards)
        const cards = formValues.blocks[currentBlockIndex].cards;
        let updatedCardList = cloneObject(cards);
        let missingGuidFound = false;
        for(let i in formValues.blocks[currentBlockIndex].cards)
        {
          if(formValues.blocks[currentBlockIndex].cards[i].guid === null)
          {
            updatedCardList[i].guid = GUIDFunction();
            missingGuidFound = true;
          }
          if(missingGuidFound)
          {
            formValues.blocks[currentBlockIndex].cards = updatedCardList;
          }
        }
      });
      return (
        <div>
          <div className="flex flex-col gap-4">
            {options.length === 0 && <p>No cards found.</p>}
            {options?.map((item, index) => {
              return (
                <div
                  key={`${index}-${item}`}
                  className="flex flex-wrap gap-2"
                >
                  <Checkbox
                    disabled={!item.guid}
                    checked={fieldValues.includes(item.guid)}
                    onCheckedChange={(checked) => {
                      const newFieldValues = checked
                        ? [...fieldValues, item.guid]
                        : fieldValues.filter(
                            (value) => value !== item.guid
                          );
                      const newObjectValue = {
                        ...input.value,
                        cardGuidList: newFieldValues,
                      };
                      setFieldValues(newFieldValues);
                      return input.onChange(newObjectValue);
                    }}
                  />
                  <label
                    className={`${!item.guid ? "text-gray-600" : ""} text-wrap`}
                  >
                    {item.heading ||
                      item.altText ||
                      `Unlabeled – ${item.guid}`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    })
  }

const GUIDFunction = () => Math.random().toString(36).substring(7);

const cloneObject = (object)=> JSON.parse(JSON.stringify(object))

export default CarouselCardPicker; 