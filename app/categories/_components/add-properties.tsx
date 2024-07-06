import Input from "@/app/products/_components/Input";
import { ChangeEvent, useCallback } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AddedPropertiesTypes } from "../page";

interface AddPropertiesProps {
  index: number;
  handleRemoveProperty(idx: number): void;
  handlePropertyInputChange(
    evt: ChangeEvent<HTMLInputElement>,
    index: number
  ): void;
  currentProperty: AddedPropertiesTypes;
}

const AddProperties = ({
  index,
  currentProperty,
  handleRemoveProperty,
  handlePropertyInputChange,
}: AddPropertiesProps) => {
  return (
    <div className="flex items-end gap-3 mb-2 relative group/currentProperty">
      {index}
      <Input
        required
        type="text"
        id={`currentProperty-${index}`}
        label="Property name"
        name="propertyName"
        placeholder="Property name"
        onChange={(evt) => handlePropertyInputChange(evt, index)}
        value={currentProperty.propertyName}
      />
      <Input
        required
        type="text"
        id={`currentProperty-${index}`}
        label="Property value"
        name="propertyValue"
        placeholder="Property value"
        onChange={(evt) => handlePropertyInputChange(evt, index)}
        value={currentProperty.propertyValue}
      />
      <MdDeleteForever
        className="absolute right-0 hidden min-w-8 min-h-8 text-red-600 hover:bg-red-100 rounded-full mb-1.5 p-2 group-hover/currentProperty:inline-block cursor-pointer transition-all duration-200"
        onClick={() => handleRemoveProperty(index)}
      />
    </div>
  );
};

export { AddProperties };
