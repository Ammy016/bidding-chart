import React,{useEffect , useState,createContext} from 'react'
import axios from 'axios';
export const BidContext = createContext();

export const BidProvider = props => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get('https://intense-tor-76305.herokuapp.com/merchants')
        .then(res => {
            setUserData(res.data)
  
        })
    }, [])

    return <BidContext.Provider value={[userData , setUserData]} >{props.children}</BidContext.Provider>
}
