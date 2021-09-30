import React from 'react'
import Header from './header/header'
import {Route, Redirect, Switch} from 'react-router-dom'

import Donor from './Donor/Donor'
import AddDonor from './addDonor/AddDonor'

function main() {
    return (
        <div>
            <Header />
            <Switch>    
                <Route  path='/addDonor' component = {AddDonor} />
                <Route  path='/' component = {Donor} />
                <Redirect to='/' />
            </Switch>
               
            
            
        </div>
    )
}

export default main
