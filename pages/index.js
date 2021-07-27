import { useState } from "react";
import Swal from "sweetalert2";
import { checkEmail, loginURI, signupURI } from "../src/api";

const Home = () => {

  const [user, setUser] = useState({ name: '', email: '', phone: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  // signup
  const signup = async e => {
    setIsLoading(true)
    e.preventDefault()
    try {
      await checkEmail(user.email)
        .then(async res => {
          if (!res.length) {
            const res = await signupURI({ username: user.email, email: user.email, phone: user.phone, password: user.password, name: user.name })
            !!res.jwt
              ? Swal.fire({ icon: 'success', text: 'User created successfully' }).then(() => {
                localStorage.setItem('user', JSON.stringify(res))
                window.location.replace('/dashboard')
              })
              : Swal.fire({ icon: 'error', text: 'Sorry account cant be created' }).then(() => setIsLoading(false))
          } else {
            throw { message: 'User already exists' }
          }
        })
        .catch(err => { throw err })
    } catch (err) {
      Swal.fire({ icon: 'error', text: err.message }).then(() => setIsLoading(false))
    }
  }

  // login
  const login = async e => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const res = await loginURI({ identifier: user.email, password: user.password })
      !!res.jwt ? window.location.replace('/dashboard') : Swal.fire({ icon: 'error', text: 'Error logging in' }).then(() => setIsLoading(false))
    } catch (err) {
      Swal.fire({ icon: 'error', text: err.message }).then(() => setIsLoading(false))
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark navbar-custom">
        <div className="container"><a className="navbar-brand" data-aos="fade-right" data-aos-duration="1000" href="#">Brand</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarResponsive"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" data-aos="fade-left" data-aos-duration="1500" data-toggle="modal" data-target="#signup" type="button">Sign Up</a></li>
              <li className="nav-item"><button className="btn btn-primary" data-aos="fade-left" data-aos-duration="550" data-aos-delay="500" data-toggle="modal" data-target="#login" type="button">LOGIN</button></li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="text-center text-white masthead">
        <div className="masthead-content">
          <div className="container">
            <h1 data-aos="zoom-in" data-aos-duration="1000" className="masthead-heading mb-0">Are you a landlord?</h1>
            <h6 data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" className="masthead-subheading mb-0" style={{ fontSize: '33px' }}>...looking forward to rent&nbsp; your property?</h6><a className="btn btn-primary btn-xl rounded-pill mt-5" role="button" data-bss-hover-animate="rubberBand" data-toggle='modal' data-target='#login'>GET STARTED</a>
          </div>
        </div>
        <div className="bg-circle-1 bg-circle"></div>
        <div className="bg-circle-2 bg-circle"></div>
        <div className="bg-circle-3 bg-circle"></div>
        <div className="bg-circle-4 bg-circle"></div>
      </header>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5"><img className="img-thumbnail img-fluid" data-aos="fade-left" data-aos-duration="1100" src="assets/img/one.jpg" loading="lazy" /></div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4" data-aos="fade-right" data-aos-duration="1100">We are the future of renting...</h2>
                <p data-aos="fade-right" data-aos-duration="1300">We know how difficult it can get finding good customers to rent your property. You don't have to worry no more</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1">
              <div className="p-5"><img className="img-thumbnail img-fluid" data-aos="fade-right" data-aos-delay="200" src="assets/img/two.jpg" loading='lazy' /></div>
            </div>
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <h2 className="display-4" data-aos="fade-left">We salute you!</h2>
                <p data-aos="fade-left" data-aos-delay="300">Leave the hard work to us. As we will help you find great value for your property</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5"><img className="rounded-circle img-fluid" data-aos="fade-left" src="assets/img/03.jpg" loading='lazy' /></div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4" data-aos="fade-right">Let there be rock!</h2>
                <p data-aos="fade-right" data-aos-delay="200">Sit tight and enjoy the show</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-5 bg-black">
        <div className="container">
          <p className="text-center text-white m-0 small">Copyright&nbsp;© Brand 2021</p>
        </div>
      </footer>
      <div className="modal fade" role="dialog" tabIndex="-1" id="login">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Login</h4><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            {/* login form */}
            <form onSubmit={login}>
              <div className="modal-body">

                <div className="form-group">
                  <input className="form-control form-control" type="text" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className="form-group"><input className="form-control form-control" type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} /></div>

              </div>
              <div className="modal-footer"><button className="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                {
                  isLoading
                    ? <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                    : <button className="btn btn-primary" type="submit">Login</button>
                }</div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" role="dialog" tabIndex="-1" id="signup">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Sign Up</h4><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            {/* sign up form */}
            <form onSubmit={signup}>
              <div className="modal-body">
                <div className="form-group">
                  <input className="form-control form-control" type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <input className="form-control form-control" type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} /></div>
                <div className="form-group">
                  <input className="form-control form-control" type="text" placeholder="Phone" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} /></div>
                <div className="form-group">
                  <input className="form-control form-control" type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} /></div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                {
                  isLoading ? <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button> : <button className="btn btn-primary" type="submit">Sign Up</button>
                }
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;