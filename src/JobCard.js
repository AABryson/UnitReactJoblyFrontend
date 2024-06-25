import React, {useState, useContext, useEffect} from 'react'
import JoblyApi from './api'
import ContextObject from './ContextObject'
// import {Link} from 'react-router-dom'
// import "./CompanyCard.css"


function JobCard ({id, title, equity, salary}) {

//#################################!!
    // const [applied, setApplied] = useState([])
    // console.log('print applied state at top', applied)

    const [applied, setApplied] = useState()
   
    const {currentUser, applicationIds, setApplicationIds} = useContext(ContextObject)

    let username = currentUser.username

    useEffect(function updateAppliedStatus() {
        if(applicationIds.has(id)){
            return console.log('you have already applied for that job'
            )
        }
    }, [id, applicationIds.length])

    // [id, applicationIds.length])
        



    async function sendApp(username, id) {
        if(applicationIds.has(id)){
            return console.log('job has already been applied to')
        }
        let result = await JoblyApi.applyForJob(username, id) 
        console.log('result from api call with sendApp', result)
        setApplicationIds(new Set([...applicationIds, id]))
        setApplied(true)
        
  

        }

    
    //  console.log('applicationsIds state in jobcard', applicationIds)
//###########################??why not pass to sendApp?
    // async function sendApp (data) {
    //     let result = await JoblyApi.applyForJob(data);
    //     console.log('result from apply to job', result)
    //     console.log('result from api called with applied key', result.applied)

    //     setApplied((prevState) => ({
    //         ...prevState,
    //         result}))
    //     setApplicationIds(result.id)
    //     return result
    // }
    // useEffect(() => {
    //     console.log('array with jobs applied to', applied)

    // }, [token]
    


//################button: why not body of arrow function?
    return (
        <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <li key={id} className='list-group-item'>
                <div>Equity: {equity}</div>
                <div>Salary: {salary}</div>
                
                


            </li>
            <button 
            onClick={() => sendApp(username, id)}
            disabled={applied}>
            {applied ? "Applied" : "Apply"}
            </button>
        
            
        </div>
        </div>
        
    )
}

export default JobCard