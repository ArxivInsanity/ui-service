import React, { Component } from 'react';
import Header from '../components/Layout/Header';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
    const projectDetails = useLocation().state.data;
    console.log("STATE: " , projectDetails);
    return (
        <>
            <Header />
            <div className="App">
                {projectDetails.name}
            </div>
        </>
    );
}

export default MainPage;
