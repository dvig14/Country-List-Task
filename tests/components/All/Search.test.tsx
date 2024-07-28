import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import {Selected} from '@components/Selected/Selected'
import {CountriesProvider} from '../../../src/utils/createContext'
import '@testing-library/jest-dom'

describe('Search Countries',()=>{
     
    test('Should return countries that match the search term ind', async()=>{
        
       render(
          <CountriesProvider>
            <Selected/>
          </CountriesProvider>
        );
       
       const searchInput = screen.getByTestId('searchBar');
       fireEvent.change(searchInput,{target:{value:'ind'}})

       await waitFor(()=>{
        const foundCard = screen.getAllByTestId('card')
        expect(foundCard.length).toBe(3)
       })

    });

    test('Should return Australia card for ausTralia(case-insensitive)', async()=>{

        render(
            <CountriesProvider>
                <Selected/>
            </CountriesProvider>
        )

        const searchInput = screen.getByTestId('searchBar')
        fireEvent.change(searchInput,{target:{value:'ausTralia'}})

        await waitFor(()=>{
            const foundCard = screen.getByTestId('card')
            expect(foundCard).toHaveTextContent('Australia')
        })

    })

});