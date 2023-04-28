import React from 'react';
import Header from '../Components/Layout/Header';
import { useLocation } from 'react-router-dom';
import { ProjectBreadCrumbs } from '../Components/ProjectBreadCrumbs';

const MainPage = () => {
    const projectDetails = useLocation().state.data;
    console.log("STATE: " , projectDetails);
    return (
      <>
        <div className="App">
          <Header />
          <ProjectBreadCrumbs
            projectName={projectDetails.name}
          ></ProjectBreadCrumbs>
          {/* {projectDetails.name} */}
        </div>
      </>
    );
}

export default MainPage;
