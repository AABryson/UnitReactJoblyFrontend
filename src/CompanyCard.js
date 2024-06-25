import React from 'react'
import {Link} from 'react-router-dom'
import "./CompanyCard.css"


function CompanyCard ({name, description, handle}) {


    return (
      <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <Link to={`/companies/${handle}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
      </div>
      
    )
}

export default CompanyCard

