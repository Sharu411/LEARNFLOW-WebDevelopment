import React, { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { toast } from "react-hot-toast"

function addPropsToReactElement(element, props) {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props)
    }
    return element
}

function addPropsToChildren(children, props) {
    if (!Array.isArray(children)) {
        return addPropsToReactElement(children, props)
    }
    return children.map(childElement => addPropsToReactElement(childElement, props))
}

export default function SocketWrapper({ children }) {

    const socket = io.connect(import.meta.env.VITE_API_URL || "http://localhost:5000")

    const location = useLocation()
    const { platformId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        function strangerOut() {
            navigate("/", { replace: true })
            toast.error("Not Allowed")
        }
        location.state && location.state.username ? socket.emit("When a user joins", { platformId, username: location.state.username }) : strangerOut()
    },[location.state,socket,platformId,navigate])

    return location.state && location.state.username ? <div>{addPropsToChildren(children, { socket })}</div> : (
        <div className="room">
            <h2>No username provided. Please use the form to join a room.</h2>
        </div>
    )
}