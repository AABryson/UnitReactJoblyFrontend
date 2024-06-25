import React, {useState} from 'react'


function SearchForm({search}) {
    const [term, setTerm] = useState('')
    

    function handleSubmit (e) {
        e.preventDefault()
        search(term)
        console.log(term)
        // setTerm('')
        
        
        
    }

    function handleChange(e) {
        setTerm(e.target.value)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='term'>Search for a company</label>
            <input type='text' id='search' name='search' value={term} onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default SearchForm