import React, { Component } from 'react'
import ders from '../images/ders.png';
import User from '../images/user.png';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ogrenciekleShow: false,
      kursekleShow: false,
      ogrencilerShow: false,
      kurslarShow: false,
      newStudent: {
        ad: "",
        soyad: "",
        yas: 0,
        mezun_oldugu_bolum: "",
        dogum_tarihi: "",
        uyelik_tarihi: "",
        mail_adresi: ""
      },
      newCourse: {
        title: "",
        description: "",
        ozet: 0,
        egitmen: "",
        logo: "",
        icerik: []
      },
      newCourseId: 8,
      newUserId: 2,
      kurslar: null,
      ogrenciler: null,
      selectedCourse: "",
      eklenecekKurslar: []
    }

  }

  ogrenciekleToggle = () => {
    this.setState({ ogrenciekleShow: !this.state.ogrenciekleShow,
      kursekleShow: false,
      ogrencilerShow: false,
      kurslarShow: false });
    this.setState({ eklenecekKurslar: [] });
  }

  kursekleToggle = () => {
    this.setState({ kursekleShow: !this.state.kursekleShow
      ,
      ogrenciekleShow: false,
      ogrencilerShow: false,
      kurslarShow: false });

  }
  ogrencilerToggle = () => {
    this.setState({ ogrencilerShow: !this.state.ogrencilerShow,
      kursekleShow: false,
      ogrenciekleShow: false,
      kurslarShow: false });

  }
  kurslarToggle = () => {
    this.setState({ kurslarShow: !this.state.kurslarShow ,
      kursekleShow: false,
      ogrencilerShow: false,
      ogrenciekleShow: false});

  }
  componentDidMount() {
    this.fetchCourses();
    this.fetchStudents();
  }

  fetchCourses = () => {
    fetch("http://localhost:3000/kurslar").
      then(response => response.json())
      .then(data => {
        this.setState({ kurslar: data });
        console.log(data);
        // En yüksek id'yi bulma
        const highestId = Math.max(...data.map(obj => obj.id));

        // this.state.newCourseId'e en yüksek id'yi atama
        this.setState({ newCourseId: highestId });
      })
      .catch(error => {
        console.log(error);
      })
  }
  fetchStudents = () => {
    fetch("http://localhost:3000/ogrenciler")
      .then(response => response.json())
      .then(data => {
        this.setState({ ogrenciler: data });
        // En yüksek id'yi bulma
        const highestId = data.reduce((maxId, obj) => (obj.id > maxId ? obj.id : maxId), -1);

        // En yüksekten bir önceki id'yi bulma
        const previousHighestId = data.reduce((prevMaxId, obj) => (obj.id < highestId && obj.id > prevMaxId ? obj.id : prevMaxId), -1);

        // this.state.newUserId'e en yüksekten bir önceki id'yi atama
        this.setState({ newUserId: previousHighestId });
        console.log(this.state.newUserId);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  ogrenciKayit = (e) => {
    e.preventDefault();
    console.log("Ogrenci kayıt edıldı");

    console.log(this.state.newStudent);
    this.putStudent();

    this.setState({
      newStudent: {
        ad: "",
        soyad: "",
        yas: 0,
        mezun_oldugu_bolum: "",
        dogum_tarihi: "",
        uyelik_tarihi: "",
        mail_adresi: "",
        password: ""
      }
    });
    this.setState({ newUserId: this.state.newUserId + 1 });
    document.getElementById('newCourses').innerHTML = '';


  }

  putStudent = () => {

    fetch("http://localhost:3000/ogrenciler/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.newUserId + 1,
        ...this.state.newStudent,
        kurslar: this.state.eklenecekKurslar

      })
    }

    ).then(response => response.json())
      .then(data => {
        console.log('Öğrenci Eklendi:', data);
        this.ogrenciekleToggle();
        // İşlem başarıyla tamamlandıktan sonra state'i güncelleyebilirsiniz.
        this.fetchStudents();
      }).catch((error) => {
        console.log("eklenme hatası", error);
      })

  }
  ogrenciKursEkle = (e) => {
    const selectedCourse = e.target.value;
    const kurs = this.state.kurslar.find(kurs => kurs.title === selectedCourse);

    if (kurs) {
      console.log("Öyle bir kurs var");
      console.log(selectedCourse);
      const kursid = kurs.id;
      const kursDetay = {
        kurs_adi: selectedCourse,
        kurs_id: kursid,
        ilerleme: 0
      };
      console.log(kursDetay);

      if (kursDetay) {
        const updatedKurslar = [...this.state.eklenecekKurslar, kursDetay];
        this.setState({ eklenecekKurslar: updatedKurslar });
        console.log("kurslar eklendi");
        this.props.updateDatas();



      }
    }
  }

  postCourses = () => {

    fetch("http://localhost:3000/kurslar/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        id: this.state.newCourseId + 1,
        ...this.state.newCourse

      })
    }

    ).then(response => response.json())
      .then(data => {
        console.log('Kurs Eklendi:', data);
        this.kursekleToggle();
        this.setState({ newCourseId: this.state.newCourseId + 1 });
        // İşlem başarıyla tamamlandıktan sonra state'i güncelleyebilirsiniz.
        this.fetchCourses();
      }).catch((error) => {
        console.log("Kurs ekleme hatası", error);
      })


    this.setState({
      newCourse: {
        title: "",
        description: "",
        ozet: 0,
        egitmen: "",
        icerik: []
      }
    });
    this.props.updateDatas();
  }

  kursKayit = (e) => {
    e.preventDefault();
    console.log(this.state.newCourse);
    this.postCourses();

    document.getElementById("icerikinput").innerText = "";
  }

  render() {
    return (
      <div className='row m-0 '>
        {
          this.props.adminprofilShow && (

            <div className='col-2 p-0 adminLeft' style={{top: "0px", height: "100vh", position: 'fixed' }}>
              <div style={{height:"100px"}} className='d-flex justify-content-center'>
                <h2 style={{alignSelf:"center"}}>Admin Paneli</h2>

              </div>

              <div class="list-group rounded-0">
                <a href="#" onClick={this.ogrenciekleToggle}  class="list-group-item list-group-item-action">Öğrenci Ekle</a>
                <a href="#" onClick={this.kursekleToggle}  class="list-group-item list-group-item-action">Kurs Ekle</a>
                <a href="#" onClick={this.ogrencilerToggle} class="list-group-item list-group-item-action">Öğrenciler</a>
                <a href="#" onClick={this.kurslarToggle}  class="list-group-item list-group-item-action">Kurslar</a>
              </div>
            </div>

          )

        }
        {
          this.props.adminprofilShow && (

            <div className='col-2' style={{  }}>

            </div>

          )

        }
        <div className='col-9  justify-content-center row'>
          
          {
            this.state.ogrenciekleShow && (

              <form style={{ height: "600px" }} className=' col-8 p-3 pt-5 rounded row justify-content-center mt-3 ogrenci' action="#" onSubmit={(e) => this.ogrenciKayit(e)}>
                <div className="col-3 p-2 me-3">
                  <a href="#"><img src={User} style={{ borderRadius: "5px" }} className="card-img-top pt-1" alt="Logo" width={"130px"} height={"152"} /></a>
                </div>

                <div className='col-7 course-detail'>
                  <table>
                    <tr>
                      <td>Ad:</td>
                      <td><input type="text" value={this.state.newStudent.ad} onChange={(e) => this.setState({ newStudent: { ad: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Soyad:</td>
                      <td><input type="text" value={this.state.newStudent.soyad} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, soyad: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Yaş:</td>
                      <td><input type="number" value={this.state.newStudent.yas} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, yas: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Bölüm:</td>
                      <td><input type="text" value={this.state.newStudent.mezun_oldugu_bolum} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, mezun_oldugu_bolum: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Doğum Tarihi: </td>
                      <td><input className='w-100' type="date" value={this.state.newStudent.dogum_tarihi} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, dogum_tarihi: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Üyelik Tarihi:</td>
                      <td><input type="date" className='w-100' value={this.state.newStudent.uyelik_tarihi} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, uyelik_tarihi: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Mail Adresi:</td>
                      <td><input type="text" value={this.state.newStudent.mail_adresi} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, mail_adresi: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Öğrenci Şifre:</td>
                      <td><input type="password" value={this.state.newStudent.password} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, password: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Alacağı Kurslar:</td>
                      <td>
                        <select name="kurslar" id="kurslar" onChange={this.ogrenciKursEkle}>
                          {
                            this.state.kurslar && (
                              this.state.kurslar.map(course => (
                                <option value={course.title}>{course.title}</option>
                              ))
                            )
                          }
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td id='newCourses'>
                        {this.state.eklenecekKurslar && (
                          this.state.eklenecekKurslar.map((kurs, index) => (
                            <label key={index} href='#' style={{ display: 'block' }} className='text-dark'>
                              {kurs.kurs_adi}
                            </label>
                          ))
                        )}
                      </td>
                    </tr>
                  </table>


                </div>

                <div>
                  <button className='btn btn-light' type='submit'>Öğrenci Ekle</button>
                </div>

              </form>
            )
          }

          {
            this.state.kursekleShow && (


              <form style={{ height: "600px" }} className='col-9 p-3 pt-5 rounded row justify-content-center mt-3 ogrenci' action="#" onSubmit={(e) => this.kursKayit(e)}>
                <div className="col-3 p-2 me-3">
                  <a href="#"><img src={ders} style={{ borderRadius: "5px" }} className="card-img-top pt-1" alt="Logo" width={"130px"} height={"152"} /></a>
                </div>

                <div className='col-7 course-detail'>
                  <table>
                    <tr>
                      <td>Kurs Adı:</td>
                      <td><input type="text" value={this.state.newCourse.title} onChange={(e) => this.setState({ newCourse: { title: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Özet:</td>
                      <td><textarea name="" id="" cols="49" rows="5" value={this.state.newCourse.description} onChange={(e) => this.setState({ newCourse: { ...this.state.newCourse, description: e.target.value } })}></textarea></td>
                    </tr>
                    <tr>
                      <td>Kurs Resmi Url:</td>
                      <td><input type="text" value={this.state.newCourse.logo} onChange={(e) => this.setState({ newCourse: { ...this.state.newCourse, logo: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>Eğitmen:</td>
                      <td><input type="text" value={this.state.newCourse.egitmen} onChange={(e) => this.setState({ newCourse: { ...this.state.newCourse, egitmen: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td>İçerik:</td>
                      <td>
                        <input
                          id='icerikinput'
                          type="text"
                          // Dizi elemanlarını virgülle birleştirerek input değerini oluştur
                          onChange={(e) => {
                            const icerikListesi = e.target.value.split(','); // Virgülle ayrılmış input değerini diziye dönüştür
                            this.setState({
                              newCourse: { ...this.state.newCourse, icerik: icerikListesi }
                            });
                          }}
                        />
                      </td>
                    </tr>


                  </table>


                </div>

                <div>
                  <button className='btn btn-light' type='submit'>Kurs Ekle</button>
                </div>

              </form>




            )
          }


          {
            this.state.ogrencilerShow && (

              <div className='col-7 mt-4'>
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">İsim</th>
                      <th scope="col">Soyisim</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.ogrenciler.filter(ogrenci => ogrenci.id != 999).map((ogrenci, index) => (
                        <tr>
                          <th scope="col">{index + 1}</th>
                          <th scope="col">{ogrenci.ad}</th>
                          <th scope="col">{ogrenci.soyad}</th>
                          <th scope="col">{ogrenci.mail_adresi}</th>
                        </tr>

                      ))


                    }

                  </tbody>
                </table>
              </div>
            )
          }
          
          {
            this.state.kurslarShow && (

              <div className='col-7 mt-4'>
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kurs</th>
                      <th scope="col">Eğitmen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.kurslar.map((kurs, index) => (
                        <tr>
                          <th scope="col">{index + 1}</th>
                          <th scope="col">{kurs.title}</th>
                          <th scope="col">{kurs.egitmen}</th>

                        </tr>

                      ))


                    }

                  </tbody>
                </table>
              </div>
            )
          }
        </div>



      </div>
    )
  }
}
