import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, Alert, PrivateRoute } from '_components';
import { Home } from 'home';
import { AccountLayout } from 'account';
import { UsersLayout } from 'users';
import Audit from '_components/Audit';
import { ProtectedRoute } from '_components/ProtectedRoute';
import { useEffect } from 'react';


export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    const getIp = () => {
        fetch(`https://api.ipdata.co/?api-key=3c35180ad98d80ebd5ac84c9087b4e41a96e65ccd474d622d5c75990`)
            .then(response => response.json())
            .then(json => {
               localStorage.setItem('ip',json.ip)
            })
           
    }

    useEffect(() => {
        if (!localStorage.getItem('ip')) {
            
            getIp()
        }
    },[])

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                        <Route element={<ProtectedRoute />} >
                         <Route path="audit/" element={  <Audit />} />
                        </Route>
                    </Route>
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
