import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useRef, useState } from "react"

export const useAuthStatus=()=>{
    const isMounted=useRef(true)
    const [loggedIn,setLoggedIn]=useState(false)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
    if (isMounted) {
        const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if (user) {
              setLoggedIn(true)  
            }
            setLoading(false)
        })
    }
    return ()=>{
        isMounted.current=false
    }
    },[isMounted])

    return {loggedIn,loading}
}