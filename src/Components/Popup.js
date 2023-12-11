
import React, { Component } from 'react'

export default class Popup extends Component {

    constructor(props){
        super(props);
        this.state={
            mail:"",
            password:"",
            ogrenciler:null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.closePopup(); // Pop-up'ı kapat
       

        if (this.state.mail == "ogrenci1" && this.state.password == "123") {
            this.props.kullaniciAta(0);
            document.getElementById("giris").style.display = "none";
        }
        else if (this.state.mail == "ogrenci2" && this.state.password == "456") {
             this.props.kullaniciAta(1); document.getElementById("giris").style.display = "none";
        }
        else if (this.state.mail == "admin" && this.state.password == "123") {
            this.props.kullaniciAta(999);
           document.getElementById("giris").style.display = "none";
        }
        else if(this.state.ogrenciler.find(ogrenci=>(this.state.mail==ogrenci.mail_adresi && this.state.password ==ogrenci.password))){
            console.log("burada");
            const id=this.state.ogrenciler.find(ogrenci=>(this.state.mail==ogrenci.mail_adresi && this.state.password ==ogrenci.password)).id;
            this.props.kullaniciAta(id);
            document.getElementById("giris").style.display = "none";
        }else{
            alert("Hesap bulunmamaktadır");
        }

    };



    componentDidMount(){
        this.fetchData();
      
       
      }
    
      fetchData=()=>{
    
        
    
        fetch("http://localhost:3000/ogrenciler")
          .then(response => response.json())
          .then((ogrenciler) => {
        
            this.setState({ogrenciler:ogrenciler});
            console.log(this.state.ogrenciler);
          })
          .catch((error) => {
            console.error('Öğrenci verisi çekme hatası:', error);
          });
      
      
    
    
      }
    

  render() {
    return (
        this.props.isOpen && (
            <div className="popup-overlay">
                <div  className='card p-5'>
                <a href="" className='text-end' style={{marginTop:"-20px",marginRight:"-10px"}}><i class="fa-solid fa-x fa-xs"></i></a>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                   
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Mail</label>
                            <input type="text" onChange={(e) => { this.setState({mail:e.target.value}) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Şifre</label>
                            <input type="password" onChange={(e) =>  { this.setState({password:e.target.value}) }} class="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" class="btn btn-primary">Giriş Yap</button>
                    </form>
                </div>

            </div>
        )
    )
  }
}















