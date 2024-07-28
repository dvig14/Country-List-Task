import React from "react";
import {FlagImg} from '../../../models/Country'
import {useCountries} from '../../../utils/createContext'
import './SearchField.less'

interface Props {
  readonly value: string;
  updateValue: React.Dispatch<React.SetStateAction<string>>;
  countries: FlagImg[]
}

export const SearchField = ({value, updateValue, countries}: Props): JSX.Element => {

  const { setFilteredData} = useCountries()
  const timer = React.useRef<NodeJS.Timeout>()

  const handleSearch = (val:string) => {
    const lowerVal = val.toLowerCase();
    const filtered = val === '' ? [] : countries.filter((c:FlagImg)=> c.country.toLowerCase().includes(lowerVal) )
    setFilteredData(filtered)
  }

  const debounceFunc = (val:string) => {
    if(timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(()=> handleSearch(val),500)  
  }
  
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    updateValue(value)
    debounceFunc(value)
  }

  return (
    <div className='search'>
      <input value={value} onChange={handleInput} placeholder='search for country...' data-testid='searchBar'></input>
    </div>
  );
};
