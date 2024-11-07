import { useState } from "react"
import {v4 as uuidv4,validate} from "uuid"
import { Toaster,toast } from "react-hot-toast"
import{ useNavigate} from "react-router-dom"

export default function JoinPlatform() {
    const [platformId,setPlatformId]=useState(()=>"")
    const [username,setUsername]=useState(()=>"")
    const navigate=useNavigate()
    function handleFormSubmit(e){
        e.preventDefault()
        if(!validate(platformId)){
            toast.error("Incorrect platform Id")
            return
        }
        username && navigate(`/platform/${platformId}`,{state:{username}})
    }
    function createPlatfomId(e){
        try{
            setPlatformId(uuidv4())
            toast.success("Platform created")
        }catch(exp){
            console.error(exp)
        }
    }
    return(
        <div className="joinBoxContainer">
            <form className="joinBox" onSubmit={handleFormSubmit}>
               <p>Paste your invitation code down below</p>
               <div className="joinInputContainer">
                <input type="text" className="joinInput" id="platformIdInput" placeholder="Enter Your ID"
                value={platformId} onChange={(e)=>{setPlatformId(e.target.value)}} autoSave="off" autoComplete="off"/><br/>
                <label htmlFor="platformIdInput" className="joinboxWarning">
                    {platformId ? '' : "ID require"}
                </label>
               </div>
               <div className="joinInputContainer">
                <input type="text" className="joinInput" id="usernameInput" placeholder="Enter Your Username"
                value={username} autoSave="off" autoComplete="off" required onChange={(e)=>{setUsername(e.target.value)}}/><br/>
                <label htmlFor="usernameInput" className="joinboxWarning">
                    {username ? '':"USER NAME require"}
                </label>
               </div>
               <button type="submit" className="Enterbtn">Join</button>
               <p>Don't have an invite code?
                Create your <span style={{cursor:"pointer"}} onClick={createPlatfomId}>Own Platform</span>
               </p>
            </form>
            <Toaster/>
        </div>
    )
}