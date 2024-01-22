
import React, { useEffect, useState } from "react"
import Header from '../Header/Header'
import classes from './QuickLinks.module.css'
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import TagLink from './Components/TagsLink'
import axios from '../../../../api'
import DataLoader from "../../../../components/DataLoader/DataLoader";



function QuickLinks() {

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

    const [linksData, setLinksData] = useState([]);
    const [loading, setLoading] = useState([])


    useEffect(() => {
        fetchLinksData();
    }, [])

    const fetchLinksData = () => {
        setLoading(true)
        axios
            .get('/quicklinks/')
            .then((res) => {
                setLoading(false)
                setLinksData(res.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }


    const LinksTags = [
        {
            value: 1,
            label: "Academics",
            image: `${baseUrl}QuickInfo/academics.svg`,
            desc: "Academics"
        },
        {
            value: 2,
            label: "Services",
            image: `${baseUrl}QuickInfo/services.svg`,
            desc: "Services"
        },
        {
            value: 3,
            label: "Miscellaneous",
            image: `${baseUrl}QuickInfo/services.svg`,
            desc: "Services"
        },
    ]



    const [isActive, setIsActive] = useState(LinksTags[2].value);

    const onClickHandel = (e) => {
        setIsActive(e.value);
    }
    return (
        <>
            <Header label="Quick Links" />
            <div className={classes.QLLayout}>

                {
                    loading ? (
                        <>
                          
                        <DataLoader height="100vh"/>
                          
                        </>
                    ) :
                        (
                            <div className={classes.LinksContainer}>

                                {LinksTags.map((e) => (


                                    <>
                                        <div className={`${classes.tiltedLinks} ${isActive === e.value ? classes.active : ''} ${isActive === e.value ? classes.border : ''} ${isActive === e.value - 1 ? classes.borderO : ''}`}>

                                            <div onClick={() => onClickHandel(e)} className={`${classes.tag} ${isActive === e.value ? classes.border : ''} ${isActive === e.value - 1 ? classes.borderO : ''}`}>
                                                <span style={{ marginTop: "auto", position: "absolute", marginLeft: "auto" }}>
                                                    {e.label}
                                                </span>
                                                <span className={classes.arrow}>
                                                    {(isActive !== e.value) && ((e.value < isActive) ? (
                                                        <ChevronRightTwoToneIcon style={{ color: "#7694FF" }} />
                                                    ) : (<ChevronLeftOutlinedIcon style={{ color: "#7694FF" }} />))
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <>
                                            <TagLink width={isActive === e.value} data={linksData} image={e.image} desc={e.desc} />
                                        </>

                                    </>
                                ))}

                            </div>
                        )}
            </div>

        </>
    )
}

export default QuickLinks
