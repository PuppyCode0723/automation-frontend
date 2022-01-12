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
        title: '照顧毛小孩',
        start: '2022-01-07',
        end: '2022-01-07',
        allDay: false,
    }, {
        title: '去礁溪泡溫泉',
        start: '2022-01-09',
        end: '2022-01-09',
        allDay: false,
    }, {
        title: '陽明山泡溫泉',
        start: '2022-01-10',
        end: '2022-01-10',
        allDay: false,
    }, {
        title: '陪客戶看電影',
        start: '2022-01-10',
        end: '2022-01-10',
        allDay: false,
    }, {
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
        title: '去客戶家維修水管',
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
    }, {
        start: '2022-01-22',
        end: '2022-01-22',
        title: '半夜關切員工工作進度',
        allDay: false,
    }, {
        start: '2022-01-12',
        end: '2022-01-12',
        title: 'Talent Show 倒數一天，好期待明天喔!!!!',
        allDay: false,
    }, {
        start: '2022-01-14',
        end: '2022-01-14',
        title: '去蘆洲跟客戶討論設計圖',
        allDay: false,
    }, {
        start: '2022-01-14',
        end: '2022-01-14',
        title: '去五金行補充材料',
        allDay: false,
    }, {
        start: '2022-01-11',
        end: '2022-01-11',
        title: '開車Veryca去烏石港衝浪',
        allDay: false,
    }, {
        start: '2022-01-15',
        end: '2022-01-15',
        title: '龍舟隊團練',
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