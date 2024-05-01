import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import ClassManage from "../pages/ClassStudentManage/ClassManage/ClassManage";
import StudentManage from "../pages/ClassStudentManage/StudentManage/StudentManage";
import EmpInfo from "../pages/DataManage/EmpInfo/EmpInfo";
import DepartsManage from "../pages/SystemMenage/DepartsManage/DepartsManage";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import EmpManage from "../pages/SystemMenage/EmpManage/EmpManage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "classManage",
                element: <ClassManage/>
            },
            {
                path: "studentManage",
                element: <StudentManage/>
            },
            {
                path: "departsManage",
                element: <DepartsManage/>
            },
            {
                path: "empManage",
                element: <EmpManage/>
            },

            {
                path: "empStatistics",
                element: <EmpInfo/>
            },

        ]
    },
]);
