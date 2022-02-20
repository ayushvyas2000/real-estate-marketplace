import { useParams } from "react-router-dom"
import {collection,getDocs,query,where,
    orderBy,limit,startAfter} from "firebase/firestore"
import {db} from "../firebase.config"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Offers=()=>{
    const [listings,setListings]=useState([])
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing, setlastFetchedListing] = useState(null)
    const fetchListings=async()=>{
        try {
        const listingsRef= collection(db,'listings')
        const q=query(
            listingsRef,
            where('offer','==',true),
            orderBy('timestamp','desc'),
            limit(10)
            )
        const querySnap=await getDocs(q)
        const lastVisible=querySnap.docs[querySnap.docs.length-1]
        setlastFetchedListing(lastVisible)
        const listingsArray=[]
        querySnap.forEach((doc)=>{
            return listingsArray.push({
                id:doc.id,
                data:doc.data(),
            })
        })
        setListings(listingsArray)
        setLoading(false)
        } catch (error) {
            toast.error('There was an error fetching data')
        }
    }

    useEffect(()=>{
        fetchListings()
    },[])
    const onFetchMoreListings=async()=>{
        try {
        const listingsRef= collection(db,'listings')
        const q=query(
            listingsRef,
            where('offer','==',true),
            orderBy('timestamp','desc'),
            startAfter(lastFetchedListing),
            limit(10)
            )
        const querySnap=await getDocs(q)
        const lastVisible=querySnap.docs[querySnap.docs.length-1]
        setlastFetchedListing(lastVisible)
        const listingsArray=[]
        querySnap.forEach((doc)=>{
            return listingsArray.push({
                id:doc.id,
                data:doc.data(),
            })
        })
        setListings([...listings,...listingsArray])
        setLoading(false)
        } catch (error) {
            toast.error('There was an error fetching data')
        }
    }

    return(
        <div className="category">
            <header>
                <p className="pageHeader">
                Offers
                </p>
            </header>
            {loading? <Spinner/>:listings&&listings.length>0?
            <>
            <main>
                <ul className="categoryListings">
                    {listings.map((listing)=>{
                        const {id,data}=listing
                        return <ListingItem key={id} listing={data} id={id} />
                    })}
                </ul>
            </main>
            {lastFetchedListing && <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>}
            </>
            :<p>There are no current offers</p>}
        </div>
    )
}

export default Offers