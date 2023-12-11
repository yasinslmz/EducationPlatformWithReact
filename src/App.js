import Header from './Components/Header';
import Footer from './Components/Footer';
import Banner from './Components/Banner';
import Overlay from './Components/Overlay';
import Content from './Components/Content';
import StudentCourses from './Components/StudentCourses';
import Popup from './Components/Popup';
import Courses from './Components/Courses';
import StudentProfil from './Components/StudentProfil';
import Admin from './Components/Admin';
import CourseExtras from './Components/CourseExtras';


import './App.css';
import { Component, React } from 'react';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update:0,
      ogrenciler:null,
      error:null,
      aktifKullanici:-1,
      aktifKullaniciProfil:null,
      isPopupOpen:false,
      isLogin:false,
      isShowMenu: false,
      isShowMenu2: false,
      noUserCourse:null,
      elementshow:{
        bannerShow:true,
        contentShow:true,
        mycoursesShow:false,
        genelkurslarShow:false,
        ogrenciprofilShow:false,
        adminprofilShow:false,
        footerShow:true
      }
    }
  }

  componentDidMount(){
    this.fetchData();
    console.log("veriler çekildi");
    console.log(this.state.ogrenciler);
  }

  fetchData=()=>{
    
    fetch("http://localhost:3000/ogrenciler")
      .then(response => response.json())
      .then((ogrencilerData) => {
    
        this.setState({ogrenciler:ogrencilerData});
      })
      .catch((error) => {
        console.error('Öğrenci verisi çekme hatası:', error);
      });
  
  }

  openPopup = () => {
    this.setState({isPopupOpen:true});
  }

  closePopup = () => {
    this.setState({isPopupOpen:false});
  }
  
  kullaniciAta=(id)=>{
    this.setState({aktifKullanici:id});
    const aktifProfil = this.state.ogrenciler.find(ogrenci=>ogrenci.id==id);
    console.log(this.state.aktifKullanici);
    this.setState({aktifKullaniciProfil:aktifProfil});
  }

  showMenu = () => {
    this.setState({ isShowMenu: true,isShowMenu2:false });
   
  }
  showMenu2 = () => {
    this.setState({ isShowMenu2: true, isShowMenu: false });
    
  }
  hideMenu = () => {
    this.setState({ isShowMenu: false});
  }
  hideMenu2 = () => {
    this.setState({ isShowMenu2: false });
  }

  ogrenciKurslarimShow=()=>{
    
    this.setState({elementshow:{bannerShow:false,contentShow:false,mycoursesShow:true,ogrenciprofilShow:false}});
  
  }

  genelKurslarShow=(course)=>{
    console.log(this.state.aktifKullaniciProfil);
    console.log(this.state.aktifProfil);
    console.log("hello1");
    this.setState({elementshow:{bannerShow:false,contentShow:true,mycoursesShow:false,genelkurslarShow:true}});
    this.setState({noUserCourse:course});
   
    
  }

  anasayfa=()=>{
    
    this.setState({elementshow:{bannerShow:true,contentShow:true,mycoursesShow:false,genelkurslarShow:false,adminprofilShow:false,footerShow:true}});
    this.setState({noUserCourse:null});
    
  }
  headerOgrenci=()=>{
    
    this.setState({elementshow:{bannerShow:false,contentShow:false,genelkurslarShow:false,mycoursesShow:true,ogrenciprofilShow:false}});
    this.setState({noUserCourse:null});
    
  }
  ogrenciProfil=()=>{
    
    this.setState({elementshow:{bannerShow:false,contentShow:false,genelkurslarShow:false,mycoursesShow:false,ogrenciprofilShow:true}});
    this.setState({noUserCourse:null});
   
  }
  adminProfil=()=>{
    
    this.setState({elementshow:{bannerShow:false,contentShow:false,genelkurslarShow:false,mycoursesShow:false,ogrenciprofilShow:false,adminprofilShow:true,footerShow:false}});
    this.setState({noUserCourse:null});
    
    console.log("Admin sayfası");
    console.log(this.state.elementshow.footerShow);
  }
  
  updateDatas=()=>{
    this.setState({update:this.state.update+1});
  }

  courseClean=()=>{
    this.setState({noUserCourse:null});
    this.setState({
      elementshow: {
        ...this.state.elementshow, // Mevcut durumu kopyala
        bannerShow: true // bannerShow'u true yap
      }
    });
  }

  render() {
    return (
      <div className="App" style={{height:'100%important'}}>
        <div className='header-banner pt-3'>
          <Header adminprofilShow={this.state.elementshow.adminprofilShow} adminProfil={this.adminProfil}  ogrenciProfil={this.ogrenciProfil} headerOgrenci={this.headerOgrenci} aktifKullanici={this.state.aktifKullanici} openPopup={this.openPopup} ogrenciKurslarimShow={this.ogrenciKurslarimShow}  anasayfa={this.anasayfa} showMenu={this.showMenu} showMenu2={this.showMenu2} hideMenu2={this.hideMenu2} isShowMenu2={this.state.isShowMenu2}/>
          <Overlay   genelKurslarShow={this.genelKurslarShow}  hideMenu={this.hideMenu} isShowMenu={this.state.isShowMenu}/>
          <Banner  bannerShow={this.state.elementshow.bannerShow}/>
          <Courses courseClean={this.courseClean} aktifKullanici={this.state.aktifKullaniciProfil} noUserCourse={this.state.noUserCourse}  genelkurslarShow={this.state.elementshow.genelKurslarShow}/>

        </div>
           <Popup kullaniciAta={this.kullaniciAta} isOpen={this.state.isPopupOpen} closePopup={this.closePopup} />
           <Content   genelKurslarShow={this.genelKurslarShow} contentShow={this.state.elementshow.contentShow}/>
           <CourseExtras  genelKurslarShow={this.genelKurslarShow}  contentShow={this.state.elementshow.contentShow}/>


           <Admin updateDatas={this.updateDatas} adminprofilShow={this.state.elementshow.adminprofilShow}/>
           <StudentProfil aktifKullaniciProfil={this.state.aktifKullaniciProfil} ogrenciprofilShow={this.state.elementshow.ogrenciprofilShow} />
           <StudentCourses update={this.state.update}  aktifKullanici={this.state.aktifKullanici} mycoursesShow={this.state.elementshow.mycoursesShow} />
           <Footer footerShow={this.state.elementshow.footerShow}/> 
            </div>
    );
  }


}