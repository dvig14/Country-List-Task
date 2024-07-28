import React from 'react'
import './ResuableComp.less'
import {FlagImg} from '../../../models/Country'
import {useCountries} from '../../../utils/createContext'

interface Props {
  dataType: FlagImg[],
  handleButton: (country: FlagImg, e:React.MouseEvent<HTMLButtonElement>) => void,
  type:string
}

export const ResuableComp = ({dataType, handleButton,type} : Props): JSX.Element => {
    
    const [visibleItems,setVisibleItems] = React.useState<FlagImg[]>([])
    const [hasMore,setHasMore] = React.useState<boolean>(false) 
    const {selectedData} = useCountries()

    const selectedSet = React.useMemo(()=> new Set(selectedData.map((c)=>c.country)),[selectedData])

    React.useEffect(() => {

      setVisibleItems(dataType.slice(0, 6));
      setHasMore(dataType.length > 6);

    }, [dataType]);
     
    const loadMore = () => {
      const startIndex = visibleItems.length
      const endIndex = startIndex + 6
      setVisibleItems([...visibleItems,...dataType.slice(startIndex,endIndex)])
      setHasMore( dataType.length > endIndex )
    }

    return visibleItems.length === 0 ? <div className='no-item'>No Item</div> : (
        <>

        <div className='country-wrapper'>
        { 
          visibleItems.map((c:FlagImg)=>(
            
            <div key={c.country} className='country-card' data-testid='card'>
    
              <div className='country-flag'>
                <img src={c.flag} alt={`${c.country} flag`}/>
              </div>
              
              <div className='country-details'>
                <div className='country-info'>
                  <h2>{c.country}</h2>
                  <p>Population: <span>{c.population.toLocaleString()}</span></p>
                  <p>Area: <span>{c.area}</span></p>
                </div>

                <button type='button' value={c.country} onClick={(e)=>handleButton(c,e)}>
                  {
                   type === 'selection' ? 'Remove' : 
                   selectedSet.has(c.country) ? 'Selected' : 'Select' 
                  }
                </button>

              </div>
    
            </div>
          ))
        } 
        </div>

        {hasMore && <button onClick={loadMore}>Load More</button>}
       
      </>
     
    )
   
}
