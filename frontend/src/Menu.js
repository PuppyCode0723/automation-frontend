import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';

import React, { useState } from 'react';
import { Button } from 'primereact/button';

export const Menu = () => {

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Navigation', icon: 'fas fa-map-marked-alt'}
    ];

    let list = items.map(x => 
    <div className="p-field p-col-4">
        <Button label={x.label} icon={x.icon} className="p-button-lg"></Button>
    </div>
    )

    return (
        <div className="p-fluid p-formgrid p-grid p-mt-2">
            {list}
        </div>
    );

}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<Menu />, rootElement);