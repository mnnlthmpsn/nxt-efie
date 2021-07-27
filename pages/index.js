import { useState } from "react";
import { useRouter } from 'next/router'
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
      <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark navbar-custom">
        <div class="container"><a class="navbar-brand" data-aos="fade-right" data-aos-duration="1000" href="#">Brand</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navbarResponsive"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><a class="nav-link" data-aos="fade-left" data-aos-duration="1500" data-toggle="modal" data-target="#signup" type="button">Sign Up</a></li>
              <li class="nav-item"><button class="btn btn-primary" data-aos="fade-left" data-aos-duration="550" data-aos-delay="500" data-toggle="modal" data-target="#login" type="button">LOGIN</button></li>
            </ul>
          </div>
        </div>
      </nav>
      <header class="text-center text-white masthead">
        <div class="masthead-content">
          <div class="container">
            <h1 data-aos="zoom-in" data-aos-duration="1000" class="masthead-heading mb-0">Are you a landlord?</h1>
            <h6 data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" class="masthead-subheading mb-0" style={{ fontSize: '33px' }}>...looking forward to rent&nbsp; your property?</h6><a class="btn btn-primary btn-xl rounded-pill mt-5" role="button" data-bss-hover-animate="rubberBand" data-toggle='modal' data-target='#login'>GET STARTED</a>
          </div>
        </div>
        <div class="bg-circle-1 bg-circle"></div>
        <div class="bg-circle-2 bg-circle"></div>
        <div class="bg-circle-3 bg-circle"></div>
        <div class="bg-circle-4 bg-circle"></div>
      </header>
      <section>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-5"><img class="img-thumbnail img-fluid" data-aos="fade-left" data-aos-duration="1100" src="assets/img/one.jpg" loading="lazy" /></div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-5">
                <h2 class="display-4" data-aos="fade-right" data-aos-duration="1100">We are the future of renting...</h2>
                <p data-aos="fade-right" data-aos-duration="1300">We know how difficult it can get finding good customers to rent your property. You don't have to worry no more</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-1">
              <div class="p-5"><img class="img-thumbnail img-fluid" data-aos="fade-right" data-aos-delay="200" src="assets/img/two.jpg" loading='lazy' /></div>
            </div>
            <div class="col-lg-6 order-lg-2">
              <div class="p-5">
                <h2 class="display-4" data-aos="fade-left">We salute you!</h2>
                <p data-aos="fade-left" data-aos-delay="300">Leave the hard work to us. As we will help you find great value for your property</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-5"><img class="rounded-circle img-fluid" data-aos="fade-left" src="assets/img/03.jpg" loading='lazy' /></div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-5">
                <h2 class="display-4" data-aos="fade-right">Let there be rock!</h2>
                <p data-aos="fade-right" data-aos-delay="200">Sit tight and enjoy the show</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="py-5 bg-black">
        <div class="container">
          <p class="text-center text-white m-0 small">Copyright&nbsp;© Brand 2021</p>
        </div>
      </footer>
      <div class="modal fade" role="dialog" tabIndex="-1" id="login">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Login</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            {/* login form */}
            <form onSubmit={login}>
              <div class="modal-body">

                <div class="form-group">
                  <input class="form-control form-control" type="text" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                </div>
                <div class="form-group"><input class="form-control form-control" type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} /></div>

              </div>
              <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                {
                  isLoading
                    ? <button class="btn btn-primary" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                    : <button class="btn btn-primary" type="submit">Login</button>
                }</div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal fade" role="dialog" tabIndex="-1" id="signup">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Sign Up</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            {/* sign up form */}
            <form onSubmit={signup}>
              <div class="modal-body">
                <div class="form-group">
                  <input class="form-control form-control" type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                </div>
                <div class="form-group">
                  <input class="form-control form-control" type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} /></div>
                <div class="form-group">
                  <input class="form-control form-control" type="text" placeholder="Phone" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} /></div>
                <div class="form-group">
                  <input class="form-control form-control" type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} /></div>
              </div>

              <div class="modal-footer">
                <button class="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                {
                  isLoading ? <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button> : <button class="btn btn-primary" type="submit">Sign Up</button>
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