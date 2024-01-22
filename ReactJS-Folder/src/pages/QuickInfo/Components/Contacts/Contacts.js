import React, { useState, useRef, useEffect } from "react";
import classes from './Contact.module.css';
import Header from '../Header/Header'
import LeftCard from "./Components/LeftCard";
import RightCard from "./Components/RightCard";
import API from '../../../../api'
import DataLoader from "../../../../components/DataLoader/DataLoader";
import CardsContainer from "./Components/CardsContainer";




export default function App() {


    const [office_bearer, setoffice_bearer] = useState([]);
    const [staff, setstaff] = useState([])
    const [secretaries, setsecretaries] = useState([])
    const [loading, setLoading] = useState([])
    const [contactData, setContactData] = useState([])

    useEffect(() => {
        fetchContactData();
    }, [])

    const fetchContactData = () => {
        setLoading(true)
        API.get('/tsgcontacts/').then(res => {
            setLoading(false)
            setContactData([ ...contactData,res.data.office_bearers , res.data.staff , res.data.secretaries ])

        }).catch(err => {
            setLoading(false)
            console.log(err)
        })


    }


    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
    const contactContent = [
        {
            image: `${baseUrl}QuickInfo/academics.svg`,
            label: " Office Bearers",
            value: 1,
         
        },
        {
            image: `${baseUrl}QuickInfo/academics.svg`,
            label: "Office Staff",
            value: 2,
       
        },
        {
            image: `${baseUrl}QuickInfo/academics.svg`,
            label: "Secretaries",
            value: 3,
           
        }
    ]










    const [isActive, setIsActive] = useState(contactContent[0].value);
    const imageRef = useRef();

    return (
        <>
            <Header label="Contacts" />

            {
                loading ? (
                    <DataLoader height="100vh" />
                ) : (
                    <div className={classes.contactContainer}>

                        <>
                            <div className={classes.leftnavContainer}>
                                {contactContent.map((e) => (
                                    <LeftCard
                                        isActive={isActive}
                                        imageRef={imageRef}
                                        value={e.value}
                                        image={e.image}
                                        setIsActive={setIsActive}
                                        label={e.label}
                                      
                                    />
                                ))}

                            </div>

                            <div className={classes.detailConatiner}>
                                <div className={classes.contactMain}>
                                    <ul className={classes.contactCards}>
                                        <CardsContainer data={contactData[isActive - 1]} />
                                    </ul>
                                </div>
                            </div>



                        </>

                    </div >
                )}
        </>
    );
}