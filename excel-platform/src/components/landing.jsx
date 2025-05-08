import "../App.css"
import React from 'react'
import { Link } from 'react-router-dom'

function landing() {
  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeader'>
                <h2>Excellytics</h2>
            </div>
            <div className='navList'>
                <p>Register</p>
                <p>Login</p>
            </div>
        </nav>
        
        <div className='landingMainContainer'>
            <div>
                <h2>
                The <span style={{color:"deeppink"}}>Excel Analytics Platform</span> empowers users </h2>
                <h3>to transform data into actionable insights using </h3> 
                <h3>Excel’s advanced analytical and automation tools.</h3>
                <div role='button' className='link'>
                <Link to="/auth" style={{textDecoration:"none",color:"white", fontSize:"2rem"}}>Get Started</Link>
                 </div>
            </div>
            <div className='excelImage'>
                <img src="./laptop.png" alt='' style={{height:"90vh", width:"40vw"}}/>
            </div>
        </div>
    </div>
  )
}

export default landing