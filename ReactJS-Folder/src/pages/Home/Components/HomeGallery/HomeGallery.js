import React from 'react'
import classes from './css/HomeGallery.module.css'
import { useState, useEffect } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function HallGallery() {
    
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const media = [
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic1.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic2.png`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic3.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic4.png`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic5.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic6.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic7.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic8.png`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic9.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic5.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic6.jpg`,
        `${baseUrl}Home/tsg_gallery/tgs_gallery/pic1.jpg`
    ]

    const [openModal, setOpenModal] = useState(false)
    const [currImage, setCurrImage] = useState(1)

    return (
        <>
            <div className={classes.homeGalleryContainer}>
                {media && media.map((item, index) => (
                    <div key={index} className={classes.homeGalleryBox}>
                        <button className={classes.homeGalleryCard} onClick={() => {
                            setOpenModal(true)
                            setCurrImage(index)
                        }}
                            style={{
                                background:`url(${item})`,
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                backgroundRepeat:"no-repeat"
                            }}
                        >
                            
                        </button>
                    </div>
                ))}
                
            </div>
            {openModal && 
            <div className={classes.modalGallery}>
                <div className={classes.modalGalleryImageBox}>
                    <button className={classes.modalGalleryCloseButton}>   
                        <CancelOutlinedIcon className={classes.modalArrow} onClick={() => setOpenModal(false)}/>
                    </button>
                    <div className={classes.modalImage}>
                        <img src={media[currImage]} alt="galleryimage"/>
                    </div>
                    <div className={classes.modalGalleryArrows}>
                        <button className={classes.modalGalleryArrowButton} onClick={() => currImage===0 ? setCurrImage(media.length - 1) : setCurrImage(currImage-1)}>
                            <ArrowCircleLeftOutlinedIcon className={classes.modalArrow} />
                        </button>
                        <button className={classes.modalGalleryArrowButton} onClick={() => currImage===media.length - 1 ? setCurrImage(0) : setCurrImage(currImage+1)}>
                            <ArrowCircleRightOutlinedIcon className={classes.modalArrow}/>
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    )  
}

export default HallGallery


