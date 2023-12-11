import React, { Component } from 'react'
import Logo from '../images/logo.png';



export default class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {

            isScrolled: false,
            submenu2Open: false,
            ogrenciler: null,
            error: null
        };
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.fetchData();
        

    }

    componentDidUpdate(prevProps){
        if(this.props.adminprofilShow!=prevProps.adminprofilShow){
            console.log("burada");
            const scrolledElement = document.getElementById("mynavbar");

            if(this.props.adminprofilShow==true){
                console.log("burada2");
                
                if(this.state.isScrolled){
                    scrolledElement.style.backgroundColor = "wheat";
                    console.log("burada3");
                }
            }
        }
    }


    fetchData = () => {



        fetch("http://localhost:3000/ogrenciler")
            .then(response => response.json())
            .then((ogrencilerData) => {

                this.setState({ ogrenciler: ogrencilerData });
            })
            .catch((error) => {
                console.error('Öğrenci verisi çekme hatası:', error);
            });




    }


    togglePopup = () => {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        const scrollY = window.scrollY;
        const threshold = 84; // Aşağı kaydırma limiti (px)

        this.setState({
            isScrolled: scrollY > threshold,
        });
    };

    openSubmenu2 = () => {
        this.setState({ submenu2Open: true, submenu3Open: false });
    }
    openSubmenu3 = () => {
        this.setState({ submenu3Open: true, submenu2Open: false });
    }
    render() {
        const { isScrolled } = this.state;
        return (
            <nav id='mynavbar' className={`navbar navbar-expand-lg px-0 ${isScrolled ? 'fixed-top scrolled' : 'fixed-top'}`}>

                <div class="container-fluid header-container">
                    <a class="navbar-brand pt-2 pb-2" href="#" onClick={this.props.anasayfa} style={{marginLeft:"120px"}}><img src={Logo} width="130" height="84" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center " id="navbarNav">
                        <ul class="navbar-nav ">
                            <li class="nav-item me-4">
                                <a class="nav-link " aria-current="page" href="#" onMouseOver={this.props.showMenu} >Kurslar <i class="fa-solid fa-caret-down "></i></a>
                            </li>
                            <li class="nav-item me-4">
                                <a class="nav-link" href="#" onMouseOver={this.props.showMenu2} >Panel <i class="fa-solid fa-caret-down "></i></a>
                                {
                                    this.props.isShowMenu2 && (
                                        <div className='dropdownMenu2' onMouseLeave={this.props.hideMenu2} >
                                            <ul className='submenu' onMouseLeave={() => { this.setState({ submenu2Open: false }) }} >
                                                <li><a onMouseOver={this.openSubmenu2} onClick={() => {
                                                    if (this.props.aktifKullanici == 999) {
                                                        this.props.adminProfil();
                                                    }

                                                    

                                                }}>Eğitmen</a>



                                                </li>
                                                <li><a onMouseOver={this.openSubmenu3}>Öğrenci</a>
                                                    {this.state.submenu3Open && (
                                                        <ul className='submenu submenu3' onMouseLeave={() => { this.setState({ submenu3Open: false }) }}>
                                                            <li><a onClick={() => {
                                                                if (this.props.aktifKullanici == 999) {
                                                                    alert("Admin hesabındasınız.");
                                                                }
                                                                else if (this.props.aktifKullanici != -1) {
                                                                    this.props.ogrenciKurslarimShow();
                                                                    this.props.headerOgrenci();
                                                                } else {
                                                                    alert("lütfen giriş yapınız");
                                                                }

                                                            }}>Kurslarım</a>
                                                            </li>

                                                            <li><a onClick={() => {
                                                                if (this.props.aktifKullanici == 999) {
                                                                    alert("Admin hesabındasınız.");
                                                                }
                                                                else if (this.props.aktifKullanici != -1) {
                                                                    this.props.ogrenciProfil();

                                                                } else {
                                                                    alert("Başarısız giriş.");
                                                                }

                                                            }}>Profil</a>
                                                            </li>
                                                        </ul>
                                                    )

                                                    }

                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </li>



                        </ul>
                    </div>
                    <div>

                        <a href="#" onClick={this.props.openPopup} className='pb-5 outlinelink' id='giris'><i className="fa-regular fa-user fa-lg" style={{transform:"none"}}></i></a>
                        {this.props.aktifKullanici !== -1 && (
                            <div>                            <span className='pt-2'> Kullanıcı: {this.state.ogrenciler.find(ogrenci => ogrenci.id == this.props.aktifKullanici).ad} {this.state.ogrenciler.find(ogrenci => ogrenci.id == this.props.aktifKullanici).soyad}</span> <a href='' className='btn p-0 ps-2 pb-1'>Çıkış</a>
                            </div>
                        )}
                    </div>

                    <div>

                    </div>
                </div>
            </nav>
        )
    }
}
