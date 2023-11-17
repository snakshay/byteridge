import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '_store';



function Audit() {
const dispatch = useDispatch();
const auth = useSelector(x => x.auth.value);
const users = useSelector(x => x.users.users);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
    
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.value?.slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

  useEffect(() => {
    
      dispatch(userActions.getAudit({role:auth.role}));
  }, [auth.role]);

  return (
      <div>
          {console.log("currentusers",currentUsers)}
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
                  {currentUsers?.map(user =>
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

          <nav>
                <ul className="pagination">
                {Array.from({ length: Math.ceil(users?.value?.length / itemsPerPage) }, (_, index) => (
                    <li key={index} className={index + 1 === currentPage ? 'page-item active' : 'page-item'}>
                    <button  onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                    </button>
                    </li>
                ))}
                </ul>
            </nav>
      </div>
  );
}

export default Audit