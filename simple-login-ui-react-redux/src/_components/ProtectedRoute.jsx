import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { ProtectedRoute };

function ProtectedRoute() {
    const auth = useSelector(x => x.auth.value);

    if (!auth || auth.role?.toLowerCase()==='user') {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}