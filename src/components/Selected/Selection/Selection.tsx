import React from "react";
import {useCountries} from '../../../utils/createContext'
import {FlagImg} from '../../../models/Country'
import {ResuableComp} from '../Resuable/ResuableComp'

export const Selection = (): JSX.Element => {
  
  const { selectedData, setSelectedData} = useCountries()

  const handleRemoved = (country:FlagImg, e:React.MouseEvent<HTMLButtonElement>) => {
    const {value} = (e.target as HTMLButtonElement)
    const notRemoved = selectedData.filter((c:FlagImg)=> c.country !== value)
    setSelectedData(notRemoved)
  }

  return <ResuableComp  dataType={selectedData} handleButton={handleRemoved} type={'selection'}/>
};
