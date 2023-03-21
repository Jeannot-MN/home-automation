import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.module.scss";
import Layout from "./hoc/Layout/Layout.jsx";
import RoomsDashboard from "./containers/RoomsDashboard/RoomsDashboard.jsx";
import asyncComponent from "./hoc/asyncComponent/asyncComponent.jsx";

function App() {
  const AsyncRoomsDevices = asyncComponent(() =>
    import("./containers/RoomsDashboard/RoomDevices/RoomDevices.jsx")
  );

  const AsyncSensorData = asyncComponent(()=>
      import ("./containers/SensorData/SensorData.jsx")
  );

  return (
    <Layout style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <Routes>
        <Route path="/room/:id" element={AsyncRoomsDevices} />
        <Route path="/"  element={<RoomsDashboard/>} />
        <Route path="/sensor/:id" element={AsyncSensorData}/>
      </Routes>
    </Layout>
  );
}

export default App;
