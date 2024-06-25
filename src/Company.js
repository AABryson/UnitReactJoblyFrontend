import React, {useState, useEffect, useContext} from 'react'
import ContextObject from './ContextObject'
import JoblyApi from './api'
import { useParams } from 'react-router-dom'

function Company () {
    //the below didn't work;
        // let params = useParams()
        // let compHandle = params.handle
        // console.log(compHandle)
    let {handle} = useParams()
    let {currentUser} = useContext(ContextObject)

    const [company, setCompany] = useState({})

//When I got rid of the below, it worked
    // useEffect(() => {
    //     async function getCompanyInfo(){
    //         try {
    //             let result = await JoblyApi.getCompany(handle)
    //             console.log('Company api call', result)
    //             if (result && Array.isArray(result)) {
    //                 setCompany(result)
                    
    //             } else {
    //                 console.error('Unexpected result format:', result)
    //                 setCompany({})
                    
    //             }

    //         } catch (err) {
    //             console.error('Error fetching company:', err)
    //             setCompany({})
                
    //         }
    //     }
    //     getCompanyInfo()

    // }, [])

    useEffect(() => {
        async function getCompanyInfo(){
                let result = await JoblyApi.getCompany(handle)
                console.log('Company api call', result)
                setCompany(result)       
        }
        getCompanyInfo()

    }, [handle])
//These always showed undefined; I think b/c useEffect is async
    // console.log(company.name)
    // console.log(company.description)
    // console.log(company.jobs)

//    useEffect(() => {
//     async function getCompanyInfo() {
//         let result = await getCompany(compHandle)
//         setCompany(result)}
//     getCompanyInfo()
//    }, [])



    return (
        <>
         {currentUser ? (
        <div className='card mb-3'>
        <div className='card-body'>
        <h1 className='card-title'>{company.name}</h1>
            <h4 className='card-text'>{company.description}</h4>
                {/* <h2>Jobs</h2> */}
            
            {company.jobs && company.jobs.length > 0 ? (
                
                    <ul className='list-group list-group-flush'>
                    {company.jobs.map((job) => (
                        <>
                        
                        <li key={job.id} className='list-group-item'>
                            <div>Title: {job.title}</div>
                            <div>Equity: {job.equity}</div>
                            <div>Salary: {job.salary}</div>
                            </li>
                        
                        {/* <div>Title: {job.title}</div>
                        <div>Equity: {job.equity}</div>
                        <div>Salary: {job.salary}</div>
                        </li> */}
                        </>
                    ))}
                    </ul>
           
                
                ) : (
                    <p>No jobs found for this company.</p>
                )}

                </div>
                </div>
           
           ) : (
            <h1>You must be logged in to see this page.</h1>
        )}
        </>
    )
}
export default Company