'use client';

import useAreas from "@/app/hooks/useAreas";
import Select from "react-select";

export type AreaSelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface AreaSelectProps {
  value?: AreaSelectValue;
  onChange: (value: AreaSelectValue) => void;
}

const AreaSelect: React.FC<AreaSelectProps> = ({ value, onChange }) => {

  const { getAll } = useAreas();

  const areas =  [
    { name: 'Bethlehem' },  
    { name: 'Gaza' },  
    { name: 'Hebron' },  
    { name: 'Jericho' },  
    { name: 'Jerusalem' },  
    { name: 'Nablus' },  
    { name: 'Ramallah' }
  ]

  return (
    <div>
      <Select
        placeholder="Select Area"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as AreaSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default AreaSelect;