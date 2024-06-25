import React, {useState, useEffect, useContext} from 'react'
import ContextObject from './ContextObject'
import CompanyCard from './CompanyCard'
import SearchForm from './SearchForm'

import JoblyApi from './api'

function Companies () {
    //#Import Companies info.  Should be an array of objects.  Each object has following keys: handle, name, num_employees, description, log_url

    
    let {currentUser} = useContext(ContextObject)
    const [companies, setCompanies] = useState([])
  
    useEffect(() => {
        console.log('get companies - useEffect and search function')
        searchCompanies()
        // async function getCompanies(){
        //     try {
        //         let result = await JoblyApi.findAllCompanies()
        //         console.log('Companies api call', result)
        //         if (result && Array.isArray(result)) {
        //             setCompanies(result)
        //         } else {
        //             console.error('Unexpected result format:', result)
        //             setCompanies([])
        //         }

        //     } catch (err) {
        //         console.error('Error fetching companies:', err)
        //         setCompanies([])
        //     }
        // }
        // getCompanies()
        

    }, [])

    // async function searchCompanies(term) {
    //     let result = await JoblyApi.findAllCompanies(term)
    //     setCompanies(result)
    //     } 
    async function searchCompanies(term) {
        try {
            //  const searchFilters = term ? {name: term} : {};
            let result = await JoblyApi.findAllCompanies(term)
            console.log('Companies api call', result)
            if (result && Array.isArray(result)) {
                setCompanies(result)
            } else {
                console.error('Unexpected result format:', result)
                setCompanies([])
            }

        } catch (err) {
            console.error('Error fetching companies:', err)
            setCompanies([])
        }
    }

    
    return ( 
        <div>
        {currentUser ? (
        <>
        
        <h1>Companies</h1>
        <SearchForm search={searchCompanies} />
            {/* {companies.map(c => (
                <ul  key={c.handle}>
                    <li>
                        <Link to={`/companies/${c.handle}`}>{c.name}</Link>
                    </li>
                    <li>{c.description}</li>
                    
                </ul>
                ))
            } */}
            {companies.map(c => (
                <CompanyCard name={c.name} description={c.description} handle={c.handle} />
            ))}
        
           
        </>
        ) : (
            <h1>You must be logged in to see this page.</h1>
        )}
        </div>
    )
}
export default Companies

