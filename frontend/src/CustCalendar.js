import FullCalendar, { render } from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { PureComponent, createRef } from "react";
import { Component, useEffect, useState } from 'react/cjs/react.development';

function CustCalendar(props) {
    console.log("strokslist", props.strokslist);
    const [arr, setArr] = useState([{
        start: '2022-01-08',
        end: '2022-01-08',
        title: '測試範例'
    }, {
        title: 'Test 2',
        start: '2022-01-07',
        end: '2022-01-07'
    }]);

    useEffect(
        () => {
            for (let i = 0; i < props.strokslist.length; i++) {
                if (props.strokslist[i].start == undefined || props.strokslist[i].start == null) {
                    continue;
                }
                // console.log(props.strokslist[i]);
                // setArr(props.strokslist[i])
                setArr([...arr, props.strokslist[i]]);
            }
            console.log("array: " + arr);
        }, []
    )

    return (
        <div>
            {console.log("test va: " + props.strokslist[0].start)}
            <FullCalendar
                plugins={[dayGridPlugin]}
                contentHeight={600}
                events={
                    props.strokslist
                    // [
                    //     {
                    //         description: "維修進場Desc",
                    //         end: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    //         start: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    //         title: "進廠維修",
                    //     }
                    // ]
                    // arr
                }
                displayEventTime={false}
            />
        </div>
    )
}

export default CustCalendar;