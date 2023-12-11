import React, { Component } from 'react'
import Logo from '../images/logo.png';

export default class Banner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bShow: true
    }
  }

  componentDidMount() {
    this.setState({ bShow: this.props.bannerShow });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bannerShow != this.props.bannerShow) {

      this.setState({ bShow: this.props.bannerShow });

    }


  }

  render() {
    return (
      <div className='container banner'>
       

        {
          this.state.bShow && (
            <div className='row' style={{ paddingTop: "80px" }}>
              <div className='col-lg-5 text-start'>
                <span className='banner-content-subtitle '><i class="fa-solid fa-trophy" style={{ color: '#d8e619' }}></i> &nbsp;Online Eğitimde Lider</span>
                <h2 className='banner-content-title'>İhtiyacınız olan tüm materyaller ve içerikler burada. </h2>
                <a href='#content' className='btn theme-btn mt-2'>Kurslara Göz At</a>
              </div>
              <div className='col-md-7 ' style={{ paddingLeft: '80px' }}>
              <iframe width="650" className='rounded' height="500" src="https://www.youtube.com/embed/viHILXVY_eU?si=SKeJW0H-wA7BNcNr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>


            </div>

          )
        }




      </div>
    )
  }
}
