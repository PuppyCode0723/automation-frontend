import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Home } from './Home';
import Maps from './Maps';
import CustCalendar from './CustCalendar';

export const Menu = () => {
    const [view, setView] = useState("");

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', className: 'p-button-info p-button-lg', onclick: () => { setView("Home") }},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar', className: 'p-button-secondary p-button-lg', onclick: () => { setView("Calendar") }},
        {label: 'Map', icon: 'fas fa-map-marked-alt', className: 'p-button-success p-button-lg', onclick: () => { setView("Map") }}
    ];

    const list = items.map(x => 
    <div className="p-col">
        <Button label={x.label} icon={x.icon} className={x.className} onClick={x.onclick} />
    </div>
    )

    return (
        <div style={{ padding: '1em'}}>
            <Card style={{ height: '85vh' }}>
                <SwitchView view={ view }  />
            </Card>
            <div className="p-fluid p-formgrid p-grid p-mt-4">
                {list}
            </div>
        </div>
    );

}

function SwitchView(props) {
    const view = props.view;
    const [showList, setShowList] = useState([
      {
        // "start": new Date().getTime(),
        // "end": new Date().getTime(),
        // "title": "進廠維修",
        // "description": "仁愛路192號",
        // "content": "維修進場",
        // "textColor": "red",
        // "allDay": true,
        // "backgroundColor": "white",
      }
    ]);

    switch(view) {
        case "Home":
            return <Home />
        case "Calendar":
            return <CustCalendar strokslist={showList} />
        case "Map":
            return <Maps />
        default:
            return <Home />
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<Menu />, rootElement);