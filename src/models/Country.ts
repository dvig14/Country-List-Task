export type Country = Readonly<{
  country: string;
  population?:number;
  area?:number;
}>;

export type FlagImg = Readonly<Country &{
   flag : string,
}>;

export interface CountriesContextType {
  filteredData :FlagImg[];
  setFilteredData:React.Dispatch<React.SetStateAction<FlagImg[]>>;
  selectedData :FlagImg[];
  setSelectedData:React.Dispatch<React.SetStateAction<FlagImg[]>>;
};
