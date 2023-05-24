import { Link } from 'react-router-dom';
import SideBar from './SideBar';
const Dashboard = () => {
  return (
    <>
      <SideBar>
        <div style={{ padding: '24px' }}>
          <div className='Title-head'>
            <h2 style={{
              fontWeight: "700", color: "rgba(95, 95, 95, 0.96)"
            }}>Getting started</h2>
          </div>
          <div className='db-body'>
            <div className="p-lg-5 p-md-4 p-4">
              <div className="row g-4 d-flex justify-content-around">
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title' >
                      <img
                        src={require('./img/db1.png')}
                        alt="logo"
                      />
                      <p>Connect my social accounts</p>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title text-center'>
                      <img
                        src={require('./img/db2.png')}
                        alt="logo"
                      />
                      <p>Customize my calendar</p>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title'>
                      <img
                        src={require('./img/db3.png')}
                        alt="logo"
                      />
                      <p> Schedule my posts</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row gy-4 d-flex justify-content-around mt-lg-3 mt-md-3 mt-0">
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title'>
                      <img
                        src={require('./img/db4.png')}
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title'>
                      <img
                        src={require('./img/db5.png')}
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <Link to={"/"}>
                    <div className='img-title'>
                      <img
                        src={require('./img/db6.png')}
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </>
  )
}
export default Dashboard