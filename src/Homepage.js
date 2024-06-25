import React, {useContext} from 'react'
import ContextObject from './ContextObject'
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage () {
    const styles = {
        backgroundImage: 'url(https://images.pexels.com/photos/911758/pexels-photo-911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover', // This makes the image cover the entire element
        backgroundPosition: 'center', // This centers the image
        backgroundRepeat: 'no-repeat', // This prevents the image from repeating
        minHeight: '100vh', // Set minHeight instead of height to ensure background covers entire viewport
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', 
        padding: '10px'
    
      };

    let {currentUser} = useContext(ContextObject)

    return (
        <div style={styles}>
            <div className="container text-center"></div>
            {/* <h1 style={{backgroundColor: 'white', width: '40%', padding: '20px', textAlign: 'center'}}>Welcome {currentUser.firstName}</h1> */}
            {currentUser ? (
                 <h1 style={{backgroundColor: 'white', width: '40%', padding: '20px', textAlign: 'center'}}>Welcome {currentUser.firstName}</h1>
            // <h2 style={{padding:'20px'}}>Welcome {currentUser.firstName}</h2>
            ) : (
                <>
                <h2 style={{padding:'20px'}}>Welcome</h2>
                    <h4>Please Login or Signup.</h4>
                    </>)
            }
        </div>
    )
}

export default Homepage