import { Calendar } from 'antd';
import './css/TSGCalender.css'
import React from 'react';
import {useState, useEffect } from 'react'
import API from '../../../../api'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Loader from '../../../../components/DataLoader/Loader'
import { Link } from 'react-router-dom';

function TSGCalender() {

    let newDate = new Date()

    const [month, setMonth] = useState(newDate.getMonth() + 1)
    const [year, setYear] = useState(newDate.getFullYear())
    const [day, setDay] = useState(newDate.getDate())
    console.log('Date: ', day, month, year)
    const [monthInWords, setMonthInWords] = useState(
        month===1?'January':
        month===2?'February':
        month===3?'March':
        month===4?'April':
        month===5?'May':
        month===6?'June':
        month===7?'July':
        month===8?'August':
        month===9?'September':
        month===10?'October':
        month===11?'November':
        'December'
    )
    const [Events, setEvents] = useState([])
    const [loading, setLoading] = useState(null)
    useEffect(() => {
        setLoading(true)
        API.get('/event_list/?param=date&subparam=' + year + '-' + month + '-' + day)
        .then(res => {
            console.log(res.data)
            setEvents(res.data['event_list'])
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [month, year, day])

    function onSelect(value, mode) {
        console.log(value, mode);
        console.log(value._d, value._d.toString())
        var item = value._d.toString()
        console.log(item.slice(4,7))
        if(item.slice(4,7) === 'Jan'){
            setMonthInWords('January')
            setMonth('01')
        }
        else if(item.slice(4,7) === 'Feb'){
            setMonthInWords('February')
            setMonth('02')
        }
        else if(item.slice(4,7) === 'Mar'){
            setMonthInWords('March')
            setMonth('03')
        }
        else if(item.slice(4,7) === 'Apr'){
            setMonthInWords('April')
            setMonth('04')
        }
        else if(item.slice(4,7) === 'May'){
            setMonthInWords('May')
            setMonth('05')
        }
        else if(item.slice(4,7) === 'Jun'){
            setMonthInWords('June')
            setMonth('06')
        }
        else if(item.slice(4,7) === 'Jul'){
            setMonthInWords('July')
            setMonth('07')
        }
        else if(item.slice(4,7) === 'Aug'){
            setMonthInWords('August')
            setMonth('08')
        }
        else if(item.slice(4,7) === 'Sep'){
            setMonthInWords('September')
            setMonth('09')
        }
        else if(item.slice(4,7) === 'Oct'){
            setMonthInWords('October')
            setMonth('10')
        }
        else if(item.slice(4,7) === 'Nov'){
            setMonthInWords('November')
            setMonth('11')
        }
        else if(item.slice(4,7) === 'Dec'){
            setMonthInWords('December')
            setMonth('12')
        }
        console.log(month)
        setDay(item.slice(8,11))
        setYear(item.slice(11,15))
        console.log(day, year)
    }

    return(
        <div className='TSGCalenderContainer'>
            <div className='TSGCalenderBox'>
            <div className='TSGCalenderHeader'>Calender</div>
            <Calendar fullscreen={false}
            //  onPanelChange={onPanelChange}
             onSelect={onSelect}
            />
            </div>
            <div className='EventListBox'>
                <div className='EventHeader'>
                    Events
                </div>
                <div className='EventDateBox'>
                    <div className='EventDate'>
                        {day} {monthInWords} {year}
                    </div>
                </div>
                <div className='EventList'>
                { loading ?
                 <Loader style={{verticalAlign:"center"}} /> : 
                 Events.length===0? 
                 <div style={{width:"300px",height:"300px",margin:"auto"}}> 
                    <img src="https://raw.githubusercontent.com/TSG-Website/media/b41456f206d423d041b7b4e09eaf243990ed3f24/SocietyEvents/nodata.svg" 
                    style={{width:"100%",height:"100%"}}/>  
                 </div> : 
                 Events.map((item) =>
                 <Link to={'../../event/' + item.id} className='EventItem'>
                       <div className='EventItemLogoBox'>
                           <div className='EventItemLogoCircle' style={{background:item.organiserSociety!=null&&item.organiserSociety.logo!=null?`url('${item.organiserSociety.logo}')`:'#7694ff'}}>
                           </div>
                       </div> 
                       <div className='EventDetailsBox'>
                           <div className='EventName'>{item.eventName}</div>
                            <div className='EventTimeBox'>
                                    <AccessTimeIcon className='EvenTimeIcon'/>
                                    <span>{item.eventDate.slice(0, 10)} | {item.mode==='On'?'online':'Offline'}</span>
                            </div>
                       </div>
                       
                </Link>)
                }
                </div>
            </div>
        </div>
    )
}

export default TSGCalender;
