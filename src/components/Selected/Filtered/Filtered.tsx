import React from "react";
import {useCountries} from '../../../utils/createContext'
import {FlagImg} from '../../../models/Country'
import {ResuableComp} from '../Resuable/ResuableComp'

export const Filtered = (): JSX.Element => {

  const { filteredData, selectedData, setSelectedData,} = useCountries()

  const handleSelected = (country:FlagImg, e:React.MouseEvent<HTMLButtonElement>) => {

    const {value} = (e.target as HTMLButtonElement)
    const alreadySelected = selectedData.some((c:FlagImg)=> c.country === value)
    !alreadySelected && setSelectedData([...selectedData,country]) 
  }
  
  return <ResuableComp  dataType={filteredData} handleButton={handleSelected} type={'found'}/>
};
