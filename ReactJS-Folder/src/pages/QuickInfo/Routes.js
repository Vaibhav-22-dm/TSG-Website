import React from 'react'
import { Routes, Route } from 'react-router-dom';
import QuickInfo from './QuickInfo'
import Socities from './Components/Socities/Societies'
import Hor from './Components/Hor/Hor'
import Hall from './Components/Hor/Hall'
import Dep from './Components/Dep/Dep'
import Department from './Components/Dep/Department'
import Map from './Components/Map/Map'
import Contacts from './Components/Contacts/Contacts'
import QuickLinks from './Components/QuickLinks/QuickLinks'
import Cdc from './Components/Cdc/Cdc'
import Grade from './Components/Grade/Grade'
import Society from './Components/Socities/Society'
import GC from './Components/GC/GC'

function QIRoutes() {
    return (
        <>
            <Routes>
                <Route path="*" element={<div>404</div>} />
                <Route path="/" element={<QuickInfo />} />
                <Route path="/society" element={<Socities />} />
                <Route path="/society/:id" element={<Society />} />
                <Route path="/hallofresidance" element={<Hor />} />
                <Route path="/hallofresidance/:id" element={<Hall />} />
                <Route path="/department" element={<Dep />} />
                <Route path="/department/:id" element={<Department />} />
                <Route path="/kgpmap" element={<Map />} />
                <Route path="/gc" element={<GC/>} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/quicklinks" element={<QuickLinks />} />
                <Route path="/cdc" element={<Cdc />} />
                <Route path="/grade" element={<Grade />} />
            </Routes>
        </>
    )
}



export default QIRoutes
