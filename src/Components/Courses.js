import React, { Component } from 'react'

export default class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eklenenKurslar: [],
        };
    }

    kursAl(id) {
        console.log(id);
    
        // Mevcut öğrencinin bilgilerini almak için bir GET isteği gönderme
        fetch(`http://localhost:3000/ogrenciler/${id}`)
            .then(response => response.json())
            .then(ogrenci => {
                // Mevcut kurs listesini al
                const mevcutKurslar = ogrenci.kurslar || [];
    
                // Yeni kursu ekle
                const yeniKurs = {
                    kurs_adi: this.props.noUserCourse.title,
                    kurs_id: this.props.noUserCourse.id,
                    ilerleme: 0
                };
    
                // Mevcut kurslar listesine yeni kursu ekle
                const yeniKurslar = [...mevcutKurslar, yeniKurs];
    
                // POST isteği için gerekli bilgiler
                fetch(`http://localhost:3000/ogrenciler/${id}`, {
                    method: 'PUT', // Öğrenci bilgilerini güncellemek için PUT kullanabilirsiniz
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...ogrenci,
                        kurslar: yeniKurslar,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Kurs başarıyla eklendi:', data);
                        this.props.courseClean();
                         // Eklenen kursun ID'sini state'e ekle
                        this.setState(prevState => ({
                            eklenenKurslar: [...prevState.eklenenKurslar, this.props.noUserCourse.id],
                        }));
                    })
                    .catch(error => {
                        console.error('Hata:', error);
                    });
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    }
    

    render() {
        return (
            <div className='row justify-content-center pt-5 m-0 '>
                {
                    this.props.noUserCourse && (


                        <div className="col-lg-6 p-3 rounded row justify-content-center g-course">
                            <a href="#" className='text-end' onClick={this.props.courseClean}><i class="fa-solid fa-x fa-xs"></i></a>
                            <div className="col-2 p-2">
                                <a href=""><img src={this.props.noUserCourse.logo} style={{ borderRadius: "7px" }} className="card-img-top" alt="Logo" height={"112"} /></a>
                            </div>
                            <div className='col-7 course-detail'>
                                <h6 className='text-dark pt-2 text-start' >Kurs: {this.props.noUserCourse.title} </h6>
                                <h6 className='text-dark pt-2 text-start' >Kurs Değerlendirme: {this.props.noUserCourse.degerlendirme} </h6>


                                <p className='text-start pt-2'><span style={{ fontSize: '1rem', fontWeight: '500' }}>Kurs Özet:</span>{this.props.noUserCourse.ozet}</p>

                                {/* İçerik Listesi */}
                                <div className="pt-2  text-start">
                                    <h6 className='text-dark'>İçerik:</h6>
                                    <ul>
                                        {this.props.noUserCourse.icerik.map(item => (
                                            <li>{item}</li>
                                        ))
                                        }


                                    </ul>
                                </div>

                                {/* Favori Sayısı */}
                                <div className="pt-2">
                                    <h6 className='text-dark text-start'>Kursa kayıtlı kişi sayısı:<span className="text-primary">
                                        <i className="bi bi-heart"> {this.props.noUserCourse.kayitli_kisi_sayisi}  </i>
                                    </span></h6>

                                </div>

                                {/* Eğitmen Adı */}
                                <div className="pt-2  text-start">
                                    <h6 className='text-dark'>Eğitmen: {this.props.noUserCourse.egitmen}</h6>

                                </div>
                                {
                                    this.props.aktifKullanici &&
                                    this.props.aktifKullanici.id !== 999 &&
                                    this.props.aktifKullanici.kurslar &&
                                    this.props.aktifKullanici.kurslar.every(
                                        (kurs) => kurs.kurs_id !== this.props.noUserCourse.id
                                    ) &&!this.state.eklenenKurslar.includes(this.props.noUserCourse.id) && (
                                        <div className="pt-2 text-start">
                                            <button
                                                className="btn btn-success"
                                                onClick={() => this.kursAl(this.props.aktifKullanici.id)} // HedefKursId, kursun benzersiz kimliğidir
                                            >
                                                Kurs Al
                                            </button>
                                        </div>
                                    )
                                }


                            </div>
                        </div>




                    )
                }


            </div>
        )
    }
}
