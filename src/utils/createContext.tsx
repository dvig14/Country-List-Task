import React from 'react'
import {FlagImg,CountriesContextType } from '../models/Country'

const CountriesContext = React.createContext<CountriesContextType | null>(null);

export const CountriesProvider : React.FC<{children: React.ReactNode}> = ({ children }) => { 

    const [filteredData, setFilteredData] = React.useState<FlagImg[]>([])
    const [selectedData, setSelectedData] = React.useState<FlagImg[]>([])
    
    return (
      <CountriesContext.Provider 
        value={{ filteredData, setFilteredData,selectedData, setSelectedData}}
      >
         {children}
      </CountriesContext.Provider>
    )
}

export const useCountries = () : CountriesContextType => {
    const context = React.useContext(CountriesContext)
    if (!context) throw new Error('useCountries must be used within a CountriesProvider');
    return context
}