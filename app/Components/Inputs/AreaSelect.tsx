'use client';

import useAreas from "@/app/hooks/useAreas";
import Select from "react-select";

export type AreaSelectValue = {
  // flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string;
};

interface AreaSelectProps {
  value?: AreaSelectValue;
  onChange: (value: AreaSelectValue) => void;
}

const AreaSelect: React.FC<AreaSelectProps> = ({ value, onChange }) => {

  const { getAll } = useAreas();

  // const areas = [
  //   { value: 'Bethlehem', label: 'Bethlehem', "latlng": [ 31.705791, 35.200657 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Gaza', label: 'Gaza', "latlng": [ 31.5016942, 34.1372546 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Hebron', label: 'Hebron', "latlng": [ 31.5325681, 35.0174285 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Jericho', label: 'Jericho', "latlng": [ 31.8594706, 35.4439083 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Jerusalem', label: 'Jerusalem', "latlng": [ 31.7691341, 35.2612333 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Nablus', label: 'Nablus', "latlng": [ 32.2243079, 35.2270797 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" },
  //   { value: 'Ramallah', label: 'Ramallah', "latlng": [ 31.9073492, 35.1852825 ], flag: "\ud83c\uddf5\ud83c\uddf8", "region": "West Bank" }
  // ];

  return (
    <div>
      <Select
        placeholder="Select Area"
        isClearable
        options={ getAll() }
        value={ value }
        onChange={ (value) => onChange(value as AreaSelectValue) }
        formatOptionLabel={ (option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{ option.flag }</div>
            <div>
              { option.label },
              <span className="text-neutral-500 ml-1">
                { option.region }
              </span>
            </div>
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
            primary: 'black',
            primary25: '#ffe4e6'
          }
        }) }
      />
    </div>
  );
};

export default AreaSelect;