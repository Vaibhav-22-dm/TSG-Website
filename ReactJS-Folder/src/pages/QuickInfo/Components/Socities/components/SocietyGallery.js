import React from 'react'
import classes from './css/SocietyGallery.module.css'
import { useState, useEffect } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function SocietyGallery({media}) {
    const [openModal, setOpenModal] = useState(false)
    const [currImage, setCurrImage] = useState(1)

    return (
        <>
            <div className={classes.societyGalleryContainer}>
                {(media.length===0)?'no data available': media.map((item, index) => (
                    <div key={item.id} className={classes.societyGalleryBox}>
                        <button className={classes.societyGalleryCard} onClick={() => {
                            setOpenModal(true)
                            setCurrImage(index)
                        }}
                            style={{
                                background:`url(${item.image})`,
                                backgroundSize:"cover !important",
                                backgroundPosition:"center !important",
                                backgroundRepeat:"no-repeat !important"
                            }}
                        >
                            
                        </button>
                    </div>
                    // <div key={item} className={classes.societyGalleryWrapper}>
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
                        <button className={classes.modalGalleryArrowButton} onClick={() => currImage===(media.length -1) ? setCurrImage(0) : setCurrImage(currImage+1)}>
                            <ArrowCircleRightOutlinedIcon className={classes.modalArrow}/>
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
        
    )
}
export default SocietyGallery
