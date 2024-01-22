import React from 'react'
import classes from './css/HallGallery.module.css'
import { useState, useEffect } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function HallGallery({media}) {
    console.log('len: ',media.length)

    const [openModal, setOpenModal] = useState(false)
    const [currImage, setCurrImage] = useState(1)

    return (
        <>
            <div className={classes.hallGalleryContainer}>
                {media && media.map((item, index) => (
                    <div key={item.id} className={classes.hallGalleryBox}>
                        <button className={classes.hallGalleryCard} onClick={() => {
                            setOpenModal(true)
                            setCurrImage(index)
                        }}
                            style={{
                                background:`url(${item.image})`,
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                backgroundRepeat:"no-repeat"
                            }}
                        >
                            
                        </button>
                    </div>
                    // <div key={item} className={classes.hallGalleryWrapper}>
                    //     <img  src="http://www.agv.iitkgp.ac.in/img/slider/team1.JPG" alt="galleryimage"/>
                    // </div>
                ))}
                
            </div>
            {openModal && 
            <div className={classes.modalGallery}>
                <div className={classes.modalGalleryImageBox}>
                    <button className={classes.modalGalleryCloseButton}>   
                        <CancelOutlinedIcon className={classes.modalArrow} onClick={() => setOpenModal(false)}/>
                    </button>
                    <div className={classes.modalImage}>
                        <img src={media[currImage].image} alt="galleryimage"/>
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


