//modules
import React, { Fragment } from 'react';

const Home = ({session}) => {
    return(
        <div className="landing-page" >
          {
            session.isLogged ?
            <Fragment>
              <h1>Welcome back {session.username} !</h1>
            </Fragment>:
            <Fragment>
              <h1>Welcome to Photogram</h1>
              <h3>Register or Login to continue</h3>
            </Fragment>
          }
        </div>
    )
}

export default Home;