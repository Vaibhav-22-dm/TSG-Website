import React from 'react'
import Header from '../Header/Header'
import Data from "../../../../components/CDCgraph/CdcData"

function Cdc() {
    return (
        <div>
            <Header label="CDC Statistics"/>
            <Data/>
        </div>
    )
}

export default Cdc
