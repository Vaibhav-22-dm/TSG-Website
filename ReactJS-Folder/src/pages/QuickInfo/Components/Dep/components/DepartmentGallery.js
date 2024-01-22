import React from 'react';
import classes from './css/DepartmentGallery.module.css'
import { useState, useEffect } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function DepartmentGallery({media}) {
  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const imgs = ['http://www.agv.iitkgp.ac.in/img/slider/husky-jackal.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/team1.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/dunebuggy.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/mahindrae2o.JPG',
                  'http://www.agv.iitkgp.ac.in/images/grp_2019.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/husky-jackal.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/team1.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/dunebuggy.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/mahindrae2o.JPG',
                  'http://www.agv.iitkgp.ac.in/images/grp_2019.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/husky-jackal.JPG',
                  'http://www.agv.iitkgp.ac.in/img/slider/team1.JPG'
                ]
    const [openModal, setOpenModal] = useState(false)
    const [currImage, setCurrImage] = useState(1)

    return (
        <>
            <div className={classes.departmentGalleryContainer}>
                {media && media.map((item, index) => (
                    <div key={item.id} className={classes.departmentGalleryBox}>
                        <button className={classes.departmentGalleryCard} onClick={() => {
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
                        <button className={classes.modalGalleryArrowButton} onClick={() => currImage===0 ? setCurrImage(media.length-1) : setCurrImage(currImage-1)}>
                            <ArrowCircleLeftOutlinedIcon className={classes.modalArrow} />
                        </button>
                        <button className={classes.modalGalleryArrowButton} onClick={() => currImage===media.length-1 ? setCurrImage(0) : setCurrImage(currImage+1)}>
                            <ArrowCircleRightOutlinedIcon className={classes.modalArrow}/>
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default DepartmentGallery;
