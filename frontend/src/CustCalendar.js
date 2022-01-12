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
        title: '陪老婆買衣服',
        allDay: false,
    }, {
        title: '去北投泡溫泉',
        start: '2022-01-07',
        end: '2022-01-07',
        allDay: false,
    }, {
        title: '去礁溪泡溫泉',
        start: '2022-01-09',
        end: '2022-01-09',
        allDay: false,
    }, {
        title: '陪客戶看電影',
        start: '2022-01-10',
        end: '2022-01-10',
        allDay: false,
    }, {
        title: '去陽明山泡溫泉',
        start: '2022-01-11',
        end: '2022-01-11',
        allDay: false,
    },
    {
        start: '2021-12-31',
        end: '2021-12-31',
        title: '101看煙火秀',
        allDay: false,
    }, {
        start: '2021-12-28',
        end: '2021-12-28',
        title: '陪客戶喝酒',
        allDay: false,
    }, {
        start: '2021-12-29',
        end: '2021-12-29',
        title: '陪客戶打高爾夫球',
        allDay: false,
    }, {
        start: '2021-12-30',
        end: '2021-12-30',
        title: '幫客戶照顧小孩',
        allDay: false,
    }, {
        start: '2022-01-01',
        end: '2022-01-01',
        title: '健身房健身',
        allDay: false,
    }, {
        start: '2022-01-02',
        end: '2022-01-02',
        title: '健身房健身',
        allDay: false,
    }
    ]);

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
                    // props.strokslist
                    // [
                    //     {
                    //         description: "維修進場Desc",
                    //         end: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    //         start: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    //         title: "進廠維修",
                    //     }
                    // ]
                    arr
                }
                displayEventTime={false}
            />
        </div>
    )
}

export default CustCalendar;