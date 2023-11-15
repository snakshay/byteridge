import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '_store';



function Audit() {
  const users = useSelector(x => x.users.list);
  const dispatch = useDispatch();
  const auth = useSelector(x => x.auth.value);

  useEffect(() => {
    
      dispatch(userActions.getAudit({role:auth.role}));
  }, []);

  return (
      <div>
          <h1>Audit</h1>
          <table className="table table-striped">
              <thead>
                  <tr>
                      <th style={{ width: '30%' }}>First Name</th>
                      <th style={{ width: '30%' }}>Last Name</th>
                      <th style={{ width: '30%' }}>Username</th>
                      <th style={{ width: '10%' }}>role</th>
                      <th style={{ width: '10%' }}>ip</th>
                      <th style={{ width: '20%' }}>Login Time</th>
                      <th style={{ width: '20%' }}>Logout Time</th>
                  </tr>
              </thead>
              <tbody>
                  {users?.value?.map(user =>
                      <tr key={user.id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.username}</td>
                          <td>{user.role}</td>
                          <td>{user.ip}</td>
                          <td>{user.loginTime}</td>
                          <td>{user.logoutTime}</td>
                        
                      </tr>
                  )}
                  {users?.loading &&
                      <tr>
                          <td colSpan="4" className="text-center">
                              <span className="spinner-border spinner-border-lg align-center"></span>
                          </td>
                      </tr>
                  }
              </tbody>
          </table>
      </div>
  );
}

export default Audit