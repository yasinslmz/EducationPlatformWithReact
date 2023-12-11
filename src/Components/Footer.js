import React, { Component } from 'react'

export default class Footer extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>



        {this.props.footerShow && (<div class="p-3 bg-light" >

          <footer class="container">
            <div class="row justify-content-evenly">
              <div class="col-6 col-md-2 mb-3">
                <h5>Hakkımızda</h5>
                <ul class="nav flex-column">
                  <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Anasayfa</a></li>
                  <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">iletişim</a></li>

                </ul>
              </div>



              <div class="col-6 col-md-2 mb-3">
                <h5>SVS Egitim</h5>

              </div>

              <div class="col-md-5 offset-md-1 mb-3">
                <form>
                  <h5>Abone ol</h5>
                  <p>Aylık periyotlarla gelişmelerden haberdar ol!</p>
                  <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label for="newsletter1" class="visually-hidden">Email </label>
                    <input id="newsletter1" type="text" class="form-control" placeholder="Email " />
                    <button class="btn btn-primary" type="button">Kaydol</button>
                  </div>
                </form>
              </div>
            </div>

            <div class=" container d-flex flex-column flex-sm-row justify-content-between py-1 border-top">
              <p>© 2023 Company, Inc. All rights reserved.</p>
              <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-dark" href="#"><i class="fa-brands fa-instagram fa-lg" style={{ color: ' #183363' }}></i></a></li>
                <li class="ms-3"><a class="link-dark" href="#"><i class="fa-solid fa-x fa-lg"></i></a></li>
                <li class="ms-3"><a class="link-dark" href="#"><i class="fa-brands fa-youtube fa-lg" style={{ color: ' #e31b0d' }}></i></a></li>
              </ul>
            </div>
          </footer>
        </div>)
        }
      </div>


    )
  }
}
