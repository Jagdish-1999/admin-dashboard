import Input from "@/app/products/_components/Input";
import { PropertiesTypes } from "@/types/category.slice.types";
import { ChangeEvent, useCallback } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PropertyInputTypes } from "./add-update-category";

interface AddPropertiesProps {
  index: number;
  handleRemoveProperty(idx: number): void;
  handlePropertyInputChange(
    evt: ChangeEvent<HTMLInputElement>,
    index: number
  ): void;
  currentProperty: PropertyInputTypes;
}

const AddProperties = ({
  index,
  currentProperty,
  handleRemoveProperty,
  handlePropertyInputChange,
}: AddPropertiesProps) => {
  return (
    <div className="flex items-end gap-3 mb-2 relative group/currentProperty">
      <Input
        required
        type="text"
        label="Property name"
        name="name"
        className="uppercase"
        placeholder="Property name (Ex. RAM)"
        id={`currentProperty-${index}`}
        value={currentProperty.name}
        onChange={(evt) => handlePropertyInputChange(evt, index)}
      />
      <Input
        required
        type="text"
        label="Property value"
        name="value"
        placeholder="Values (Ex. 6GB,8GB)"
        id={`currentProperty-${index}`}
        value={currentProperty.value}
        disabled={!currentProperty.name}
        onChange={(evt) => handlePropertyInputChange(evt, index)}
      />
      <MdDeleteForever
        className="absolute right-0 hidden min-w-8 min-h-8 text-red-600 hover:bg-red-100 rounded-full mb-1.5 p-2 group-hover/currentProperty:inline-block cursor-pointer transition-all duration-200"
        onClick={() => handleRemoveProperty(index)}
      />
    </div>
  );
};

export { AddProperties };
