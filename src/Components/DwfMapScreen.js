import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import * as MdIcon from "react-icons/md"
import { useParams } from "react-router-dom"



const CheckInComponent = ({ text }) => <div className="text-4xl text-green-700" >
    <MdIcon.MdLocationPin />
    <div className="flex">
        <p className="text-sm font-bold text-center">{text}</p>
    </div>
</div>

const CheckOutComponent = ({ text }) => <div className="text-5xl text-red-700" >
    <MdIcon.MdLocationPin />
    <div className="flex">
        <p className="text-sm font-bold text-center">{text}</p>
    </div>
</div>


const TrackingComponent = ({ text }) => <div className="text-2xl text-[#ff8e39]" >
    <MdIcon.MdLocationPin />
    <div className="flex">
        {/* <p className="text-sm font-bold text-center">{text}</p> */}
    </div>
</div>

export default function SimpleMap() {

    const { sessionId, token } = useParams()


    const [RecordList, setRecordList] = useState([])
    const [CenterParam, setCenterParam] = useState()


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://hr.dwf.com.sa/api/v1/geoloc_attendance_info/session/${sessionId}?db=dwf_14`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setRecordList(result.location_ids)


                }
            })
            .catch(error => console.log('error', error));
    }, [])


    const defaultProps = {
        center: {
            lat: 24.774265,
            lng: 46.738586
        },
        zoom: 12
    };



    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>


            {
                RecordList.length > 0 ? <GoogleMapReact

                    draggable={false}
                    bootstrapURLKeys={{ key: "AIzaSyDPin7HZTxgmPpffXiiTiI0LPyy13r79ZE", v: '3.32' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={{ zoomControl: false, draggable: false }}
                >
                    {
                        RecordList.map((i) => {
                            if (i.loc_type === "checkin") {
                                return <CheckInComponent
                                    lat={i.latitude_pt}
                                    lng={i.longitude_pt}
                                    text={i.loc_type}
                                />
                            } else if (i.loc_type === "checkout") {
                                return <CheckOutComponent
                                    lat={i.latitude_pt}
                                    lng={i.longitude_pt}
                                    text={i.loc_type}
                                />
                            } else {
                                return <TrackingComponent
                                    lat={i.latitude_pt}
                                    lng={i.longitude_pt}
                                    text={i.loc_type}
                                />
                            }

                        })
                    }

                </GoogleMapReact> :
                    <div>

                    </div>
            }

        </div>
    );
}