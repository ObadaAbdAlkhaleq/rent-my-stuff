'use client';

import Select from "react-select";

export type ConditionSelectValue = {
  label: string;
  value: string;
};

interface DropDownProps {
  // label: string;
  // sublabel: string;
  value: ConditionSelectValue;
  onChange: (value: ConditionSelectValue) => void;
  choices: Array<ConditionSelectValue>;
}

const DropDown: React.FC<DropDownProps> = ({
  // label, sublabel, 
  value, onChange, choices }) => {

  // const conditions = [
  //   { value: "new", label: "New"},
  //   { value: "likenew", label: "Like New"},
  //   { value: "verygood", label: "Very Good"},
  //   { value: "good", label: "Good"},
  //   { value: "fair", label: "fair"},
  //   { value: "poor", label: "Poor"}
  // ]

  return (
    <Select
      placeholder="Select Condition"
      isClearable
      options={ choices }
      value={ value }
      onChange={ (value) => onChange(value as ConditionSelectValue) }
      formatOptionLabel={ (option: any) => (
        <div className="flex flex-row items-center gap-3 text-neutral-500 ml-1">
          { option.label }
        </div>
      ) }
      classNames={ {
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      } }
      theme={ (theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: '#2684ff',
          primary25: '#b2d4ff'
        }
      }) }
    />
  );
};

export default DropDown;