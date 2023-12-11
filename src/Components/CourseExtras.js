import React, { Component } from 'react'
import yasinPng from '../images/yasin.png';
import erhanJpeg from '../images/erhan.jpeg';
import Selahattin from '../images/selahattion.jpeg';
export default class CourseExtras extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contentShow: true,
            courses: null,
            error: null
        }
    }


    componentDidMount() {
        this.fetchData();

    }

    fetchData = () => {



        fetch("http://localhost:3000/kurslar")
            .then(response => response.json())
            .then((courses) => {

                this.setState({ courses: courses });
            })
            .catch((error) => {
                console.error('Öğrenci verisi çekme hatası:', error);
            });




    }
    componentDidUpdate(prevProps){
        if(prevProps.contentShow!==this.props.contentShow ){
          
          this.setState({contentShow:this.props.contentShow});
        
          console.log(this.state.contentShow);
        
        }
       
    
      }


    render() {
        return (
            <div className='container'>

                {
                    this.state.contentShow && (
                        <div>
                            <em><h2 >En Popüler Kurslar</h2></em><hr />

                            <div className='extras-one row justify-content-evenly'>

                                <div class="card p-3" style={{ width: "18rem" }}>
                                    <div style={{ overflow: "hidden", cursor: "pointer" }}>
                                        <a href="#" onClick={() => {
                                            this.props.genelKurslarShow(this.state.courses.find(x => x.id === 5));
                                            window.scrollTo(0, 0); // Sayfanın en üstüne git
                                        }}>
                                            <img height={"150px"} src="https://cremicro.com/wp-content/webp-express/webp-images/uploads/2020/10/ux-2-1024x682.jpg.webp" class="card-img-top" alt="..." />
                                        </a>

                                    </div>
                                    <div class="card-body text-start p-0 pt-3">
                                        <span className=''>by <a href="#" className='text-decoration-none'>uxdesignexpert</a></span>
                                        <h5 class="card-title mt-2">UI/UX Design</h5>
                                        <p class="card-text">Kullanıcı arayüzü ve deneyimi tasarımı</p>
                                        <span><i class="fa-regular fa-user"></i></span><span> 55 Öğrenci</span>
                                    </div>
                                </div>
                                <div class="card p-3" style={{ width: "18rem" }}>
                                    <div style={{ overflow: "hidden", cursor: "pointer" }}>
                                        <a href="#" onClick={() => {
                                            this.props.genelKurslarShow(this.state.courses.find(x => x.id === 4));
                                            window.scrollTo(0, 0); // Sayfanın en üstüne git
                                        }}>
                                            <img height={"150px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMS4uI8u5ATm-RjPUewrPf2RVls1v3DpvKpg&usqp=CAU" class="card-img-top" alt="..." />
                                        </a>
                                    </div>
                                    <div class="card-body text-start p-0 pt-3">
                                        <span className=''>by <a href="#" className='text-decoration-none'>appdevpro</a></span>
                                        <h5 class="card-title mt-2">Mobile App Development</h5>
                                        <p class="card-text">Mobil uygulama geliştirme ve en güncel teknolojiler</p>
                                        <span><i class="fa-regular fa-user"></i></span><span> 75 Öğrenci</span>
                                    </div>
                                </div>
                                <div class="card p-3" style={{ width: "18rem" }}>
                                    <div style={{ overflow: "hidden", cursor: "pointer" }}>
                                        <a href="#" onClick={() => {
                                            this.props.genelKurslarShow(this.state.courses.find(x => x.id === 3));
                                            window.scrollTo(0, 0); // Sayfanın en üstüne git
                                        }}>
                                            <img height={"150px"} src="https://d1m75rqqgidzqn.cloudfront.net/wp-data/2019/09/11134058/What-is-data-science-2.jpg" class="card-img-top" alt="..." />
                                        </a>
                                    </div>
                                    <div class="card-body text-start p-0 pt-3">
                                        <span className=''>by <a href="#" className='text-decoration-none'>datasciencemaster</a></span>
                                        <h5 class="card-title mt-2">Data Science</h5>
                                        <p class="card-text">Veri analizi ve bilimi dalında en güncel eğitimler</p>
                                        <span><i class="fa-regular fa-user"></i></span><span> 89 Öğrenci</span>
                                    </div>
                                </div>

                            </div>

                            <br />
                            <br />

                            <em><h2 >Öğrenciler Ne Diyor?</h2></em><hr />

                            <div className='extras-two row ' style={{ padding: "80px" }}>
                                <div class="card rounded-0" >
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src={yasinPng} class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body text-start ps-5">
                                                <h5 class="card-title">&#9733;&#9733;&#9733;&#9733;</h5>
                                                <p class="card-text" style={{ fontSize: "18px" }}>        Eğitim platformunuz gerçekten harika bir deneyim sunuyor! Zengin ve etkileşimli içerikleri, nitelikli eğitmenleri ve kullanıcı dostu arayüzü ile öne çıkıyor. Her ders, konuyu derinlemesine anlamama ve yeni beceriler kazanmama yardımcı oluyor. Ayrıca, öğrenci topluluğuyla etkileşimde bulunmak ve öğrenilenleri paylaşmak da oldukça motivasyon artırıcı. Teşekkürler!
                                                </p>
                                                <h6>Yasin Çağrı Solmaz</h6>
                                                <p class="card-text"><small class="text-body-secondary">Kou,Elektronik ve Haberleşme Mühendisliği</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />
                            <em><h2 >En İyi Eğitmenlerimiz</h2></em><hr />

                            <div className='extras-three row justify-content-evenly'>

                                {/* İlk Resim */}
                                <div className='col-4 p-0' style={{ position: "relative", overflow: "hidden" }}>
                                    <img height={"300px"} src={erhanJpeg} className='img-fluid w-100' alt="" />

                                    {/* Overlay */}
                                    <div className="overlay" style={{ position: "absolute", bottom: 0, left: 44, right: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px", background: "rgba(0, 0, 0, 0.7)", color: "#fff", zIndex: 1 }}>
                                        <h4>Erhan Kaya</h4>
                                        <p>Web Developer</p>
                                    </div>
                                </div>

                                {/* İkinci Resim */}
                                <div className='col-4 p-0' style={{ position: "relative", overflow: "hidden" }}>
                                    <img height={"300px"} src={Selahattin} className='img-fluid w-100' alt="" />

                                    {/* Overlay */}
                                    <div className="overlay" style={{ position: "absolute", bottom: 0, left: 44, right: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px", background: "rgba(0, 0, 0, 0.7)", color: "#fff", zIndex: 1 }}>
                                        <h4>Selahattin Usta</h4>
                                        <p>React Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        )
    }
}
