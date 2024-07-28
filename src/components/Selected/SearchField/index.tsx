import {SearchField} from "@components/Selected/SearchField/SearchField";
import React from "react";
const countryByName = require("../../../../country-json/src/country-by-name.json");
const countryByPopulation = require('../../../../country-json/src/country-by-population.json')
const countryByArea = require('../../../../country-json/src/country-by-surface-area.json')
const countryFlag = require('../../../../country-json/src/country-by-flag.json')
import {FlagImg} from '../../../models/Country'
import {useCountries} from '../../../utils/createContext'

export default (): JSX.Element => {
  const [value, updateValue] = React.useState("");
  const [allData,setAllData] = React.useState<FlagImg[]>([])
  const {setFilteredData} = useCountries()

  React.useEffect(()=> {
    const populationMap = new Map()
    countryByPopulation.forEach((p:{country: string ,population:number})=> populationMap.set(p.country,p.population))

    const areaMap = new Map()
    countryByArea.forEach((a:{country: string, area:number}) => areaMap.set(a.country,a.area))

    const flagMap = new Map();
    countryFlag.forEach((f:{country: string, flag_base64:string})=> flagMap.set(f.country,f.flag_base64))

    const combined = countryByName.map((c:{country:string}) => ({
        ...c,
        population: populationMap.get(c.country) || 0,
        area: areaMap.get(c.country) || 0,
        flag: flagMap.get(c.country) || ''
    }));
    setAllData(combined) 
    setFilteredData(combined)
  },[])
  
  return <SearchField value={value} updateValue={updateValue} countries={allData}/>;
};
