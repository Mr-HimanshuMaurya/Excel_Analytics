import "../App.css"
import React from 'react'
import { Link } from 'react-router-dom'
import ReactBits from "./ReactBits"

function landing() {
return (
    <div className='landingPageContainer'>
            <nav className='px-[1.2rem] flex justify-center items-center pb-[1.6rem]'>
                    <div className='navHeader'>
                            <p className="text-2xl md:text-3xl">Excellytics</p>
                    </div>
                    <div className='flex gap-[1.6rem] cursor-pointer'>
                            <a href="/auth" className="reg text-lg md:text-xl">Register</a>
                            <a href="/auth" className="log text-lg md:text-xl">Login</a>
                    </div>
            </nav>
            
            <div className='flex justify-between h-[80vh] items-center text-[1.5rem] px-[3rem]'>
                    <div>
                       
                       <p className="text-2xl md:text-4xl font-bold">The <span style={{color:"deeppink"}}>Excel Analytics Platform</span> empowers users</p>

                       <ReactBits
                        text={[`Excel’s advanced analytical and automation tools.`,""]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        className="text-xl md:text-3xl font-semibold"
                        />

                        <br></br>


                        <ReactBits
                        text={[`to transform data into actionable insights using`,""]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        className="text-xl md:text-3xl font-semibold  hidden md:block"
                        />
                   
                            
                            {/* <p className="text-xl md:text-3xl font-semibold hidden md:block">to transform data into actionable insights using</p>  */}
                            {/* <p className="text-xl md:text-3xl font-semibold">Excel’s advanced analytical and automation tools.</p> */}
                            <div role='button' className='link'>
                            <Link to="/auth" style={{textDecoration:"none",color:"white", fontSize:"2rem"}}>Get Started</Link>
                             </div>
                    </div>
                    <div className="hidden md:block">
                                <img src="./laptop.png" alt="laptop & mobile" className=" h-[500px] w-[400px] " />
                        </div>
                  </div>
    </div>
)
}

export default landing
