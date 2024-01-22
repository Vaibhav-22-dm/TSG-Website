import React from 'react'
import InfiniteCarousel from '../../../components/Carousel/InfiniteCarousel'
import AlumniCard from './AlumniCard'

const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;


const Alumnies = [
    {
        imgUrl: `${baseUrl}Home/Alumni/sundarpichai.png`,
        name: "Sundar Pichai ",
        designation: "CEO of Google",
        degree: "MT'93",
        logo: `${baseUrl}Home/Alumni/google.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/rahul.png`,
        name: "Rahul Jaimini",
        designation: "Co-Founder of Swiggy",
        degree: "CSE'10",
        logo: `${baseUrl}Home/Alumni/swiggy.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/arvind.png`,
        name: "Arvind Kejriwal",
        designation: "Chief Minister of Delhi",
        degree: "ME'89",
        logo: `${baseUrl}Home/Alumni/gov.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/arjun.png`,
        name: "Arjun Malhotra",
        designation: "Co-Founder of HCL",
        degree: "ECE'65",
        logo: `${baseUrl}Home/Alumni/hcl.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/gaurav.png`,
        name: "Gaurav Taneja",
        designation: "Renowned Youtuber",
        degree: "CE'08",
        logo: `${baseUrl}Home/Alumni/ytube.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/viswa.png`,
        name: "Biswa Kalyan Rath ",
        designation: "Renowned Comedian",
        degree: "BT'12",
        logo: `${baseUrl}Home/Alumni/mic.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/duvvuri.png`,
        name: "Duvvuri Subbarao",
        designation: " 22nd Governor of the RBI",
        degree: "PH'69",
        logo: `${baseUrl}Home/Alumni/rbi.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/jk.png`,
        name: "Jitendra Kumar",
        designation: "Renowned Actor",
        degree: "CE'12",
        logo: `${baseUrl}Home/Alumni/camera.png`,

    },
    {
        imgUrl: `${baseUrl}Home/Alumni/sarin.png`,
        name: "Arun Sarin",
        designation: "Former CEO of Vodafone",
        degree: "MT'75",
        logo: `${baseUrl}Home/Alumni/vodafone.png`,

    },
]

function InfiniteCarouselContent() {
    return (
        <div style={{maxWidth:"1640px", margin:"auto"}}>
        {/* <h3 style={{width:"100%",textAlign:"center" ,marginBottom:"-3em"}}>Inspiring Kgpians</h3> */}
            <InfiniteCarousel>
                {
                    Alumnies.map((Alumni, i) => <AlumniCard key={i} name={Alumni.name} designation={Alumni.designation} degree={Alumni.degree} logo={Alumni.logo} alumniImg={Alumni.imgUrl} />)}
            </InfiniteCarousel>
        </div>

    )
}



export default InfiniteCarouselContent

