import React, {useState, useEffect, useContext} from 'react'
import JobCard from './JobCard'
import ContextObject from './ContextObject'

import JoblyApi from './api'

function Jobs () {
    // let {currentUser, applicationIds, setApplicationIds} = useContext(ContextObject)

let {currentUser} = useContext(ContextObject)
    const [jobs, setJobs] = useState([]);
    // const [applied, setApplied] = useState()
    
    useEffect(() => {
        async function getJobs(){
            try {
                let result = await JoblyApi.findAllJobs()
                console.log('Jobs api call', result)
                if (result && Array.isArray(result)) {
                    setJobs(result)
                } else {
                    console.error('Unexpected result format:', result)
                    setJobs([])
                }

            } catch (err) {
                console.error('Error fetching jobs:', err)
                setJobs([])
            }
        }
        getJobs()

    }, [])
    let username = currentUser.username
    // useEffect(function updateAppliedStatus() {

    // })
    


    // async function sendApp(username, id) {
    //     if(applicationIds.has(id)){
    //         return console.log('job has already been applied to')
    //     }
    //     let result = await JoblyApi.applyForJob(username, id) 
    //     console.log('result from api call with sendApp', result)
    //     setApplicationIds(new Set([...applicationIds, id]))
        
  

    //     }

    

    // useEffect(() => {
    //     async function getJobs() {
    //         let allJobs = await JoblyAPI.findAllJobs()
    //         console.log('All jobs', allJobs)
    //         setJobs(allJobs)
    //     }
    //     getJobs()
    // }, [])


    
    return (
        <div>
        {currentUser ? (
        <>
        <h1>Jobs</h1>
        {jobs.map(job => (
            <>
            <JobCard id={job.id} title={job.title} equity={job.equity} salary={job.salary}/>
        
            </>
             ))}
        

        </>
         ) : (
            <h1>You must be logged in to see this page.</h1>
        )}
        </div>

    )
}

export default Jobs


// <ul>
            //       <li>Title: {job.title}</li>
            //       <li>Equity: {job.equity}</li>
            //       <li>Salary: {job.salary}</li>
            // </ul>