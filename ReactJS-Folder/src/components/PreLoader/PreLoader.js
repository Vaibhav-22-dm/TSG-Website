import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './PreLoader.css'

function PreLoader() {

     const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;  

    const isUserCheck = useSelector((state) => state.auth.isUserCheck)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(!loading)
          }, 10000)
    },[])

    return (
        <div >
            {
                (loading||isUserCheck) ? (
                    <div className="preloader" >
                        <object  type="image/svg+xml" data="/assets/final_Preloader.svg" className="tsgPreloader"/>
                    </div>
                ) : ""
            }
        </div>
    )
}

export default PreLoader
