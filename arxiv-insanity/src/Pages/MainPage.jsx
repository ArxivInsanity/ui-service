import React from 'react';
import Header from '../components/Layout/Header';
import { useLocation } from 'react-router-dom';
import { ProjectBreadCrumbs } from '../components/ProjectBreadCrumbs';

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
