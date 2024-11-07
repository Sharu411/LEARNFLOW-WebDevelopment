import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinPlatform from "./joining/JoinPlatform";
import Platform from "./platform/Platform";
import SocketWrapper from './components/SocketWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JoinPlatform />
  },
  {
    path: "/platform/:platformId",
    element: <SocketWrapper> <Platform /> </SocketWrapper>
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
