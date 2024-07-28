import {All} from "@components/All/All";
import React from "react";
import {SortType} from "./SortButton";
import {Country} from "../../models/Country";
const countryByName = require("../../../country-json/src/country-by-name.json");
const countryByPopulation = require('../../../country-json/src/country-by-population.json')
const countryByArea = require('../../../country-json/src/country-by-surface-area.json')

export default (): JSX.Element => {
  const [currentSort, setCurrentSort] = React.useState<SortType>();
  const [sortAsc, toggleSortAsc] = React.useState<boolean>(true);
  const [combinedData,setCombinedData] = React.useState<Country[]>([])

  React.useEffect(() => {

    const populationMap = new Map()
    countryByPopulation.forEach((p:{country: string ,population:number})=> populationMap.set(p.country,p.population))

    const areaMap = new Map()
    countryByArea.forEach((a:{country: string, area:number}) => areaMap.set(a.country,a.area))

    const combined = countryByName.map((c:{country:string}) => ({
        ...c,
        population: populationMap.get(c.country) || '-',
        area: areaMap.get(c.country) || "-",
    }));
   
    setCombinedData(combined) 
  },[]);

  const sortedCombinedData = React.useMemo(() => {
    if (!currentSort) return combinedData

    const safeNumCheck = (val:any) => {
       if(val === '-') return sortAsc ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER
       return val
    }

    const sortedData = [...combinedData].sort((a, b) => {
        switch (currentSort) {
          case 'name' : return sortAsc ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);

          case 'population': 
          return  sortAsc ? 
              safeNumCheck(a.population) - safeNumCheck(b.population) 
              : 
              safeNumCheck(b.population) - safeNumCheck(a.population)
          ;

          case 'area': 
          return  sortAsc ? 
             safeNumCheck(a.area) - safeNumCheck(b.area) 
             : 
             safeNumCheck(b.area) - safeNumCheck(a.area)
          ;

          default: return 0;
        }
    });

    return sortedData;
  }, [currentSort, sortAsc, combinedData]);

  const handleSortUpdate = (newType: SortType) => {
    if (newType === currentSort) toggleSortAsc(!sortAsc)
    setCurrentSort(newType)
  };

  return (
    <All currentSort={currentSort} sortAsc={sortAsc} countries={sortedCombinedData} setCurrentSort={handleSortUpdate} />
  );
};
