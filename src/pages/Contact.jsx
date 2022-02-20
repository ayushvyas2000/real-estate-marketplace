import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { db } from "../firebase.config"

const Contact = () => {
const [loading,setloading]=useState(true)
const [message, setmessage] = useState('')
const [landlord, setlandlord] = useState(null)
const [searchparams, setsearchparams] = useSearchParams()

const params=useParams()

useEffect(()=>{
    const getLandlord=async()=>{
        const docRef=doc(db,'users',params.landlordID)
        const docSnap=await getDoc(docRef)
        if (docSnap.exists) {
            setlandlord(docSnap.data())
            setloading(false)
        }
        else{
            setloading(false)
            toast.error('Could not get landlord data')
        }
    }
    getLandlord()
},[params.landlordID])

const onChange=(e)=>{
    setmessage(e.target.value)
}
if (loading) {
    return <Spinner />
}
  return (
    <div className="pageContainer">
        <header>
            <p className="pageHeader">Contact Landlord</p>
        </header>

        {landlord!=='null' &&(
        <main>
            <div className="contactLandlord">
                <p className="landlordName">
                    Contact {landlord?.name}
                </p>
            </div>
            <form className="messageForm">
                <div className="messageDiv">
                    <label htmlFor="mesage" className="messageLabel">
                        Message
                    </label>
                    <textarea name="message" id="message"
                    className="textArea" value={message} 
                    onChange={onChange}/>
                </div>
                <a href={`mailto:${landlord.email}?Subject=
                ${searchparams.get('listingName')}&body=${message}`}
                className='primaryButton'>
                    Send Message
                </a>
            </form>
        </main>
        )
        }
    </div>
  )
}


export default Contact