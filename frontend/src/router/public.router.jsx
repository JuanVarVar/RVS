import React from 'react'
import cookie from '../hook/cookie.js'
import INI from '../views/ini.jsx'
import LIST from '../views/list.jsx'

import '../resources/native/background.jpg'
import '../css/main.css'
import "../css/recipe__card.css"
import "../css/recipe__list.css"
import "../css/scrollbar_style.css"
import {
  BrowserRouter as Routes,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import backg1 from '../resources/native/background.jpg'
let template1 = {
    backgroundImage: 'url(' + backg1 + ')',
    backgroundSize: '240px',
    backgroundRepeat: 'repeat'
}

var list_active = false

if(document.cookie !== "" && cookie.check('mode__exampleRCPV') !== ""){
    list_active = true;
}

function Router(){
    return(
        <div style={template1} className="p-0 m-0 col">
            <Routes>
                <Switch>
                    {list_active &&
                        <React.Fragment>
                            <Route exact path="/list">
                                <LIST/>
                            </Route>
                            <Redirect from="*" to="/list" />
                        </React.Fragment>
                    } 
                    {!list_active && 
                        <React.Fragment>
                            <Route path="/">
                                <INI/>
                            </Route>
                            <Redirect from="*" to="/" />
                        </React.Fragment>
                    }
                </Switch>
            </Routes>
        </div>
    )
}

export default Router