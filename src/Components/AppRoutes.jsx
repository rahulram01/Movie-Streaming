// Import necessary components and libraries

import styled from "styled-components";
import { Header } from "./Header"; // Import your Header component
import { Dashboard } from "./Dashboard"; // Import your Dashboard component
import { Route } from "react-router-dom";

// Styled components for DashboardMain and other components
const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100vh; /* Ensure it fills the entire viewport height */
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #15171e;
  justify-content: flex-start; /* Align content at the top */
  align-items: center; /* Center content horizontally */
`;

// Layout for your routes
const RoutesLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// Routes definition
const AppRoutes = () => {
  return (
    <RoutesLayout>
      <Header /> {/* Render the Header component */}
      <Route
        path="/pod"
        element={
          <DashboardMain>
            <Dashboard />
          </DashboardMain>
        }
      />
    </RoutesLayout>
  );
};

export default AppRoutes;
