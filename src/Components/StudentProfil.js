import React, { Component } from 'react'
import logoYasin from '../images/yasin.png';
import logoIrem from '../images/logo.png';
import User from '../images/user.png';
export default class StudentProfil extends Component {


    constructor(props) {
        super();

    }
    

    render() {
        return (
            <div className='row justify-content-center pt-2 m-0' >

                {
                    this.props.aktifKullaniciProfil && (
                     
                        this.props.ogrenciprofilShow && (
                            <div className="col-lg-6 p-3 rounded row justify-content-center scourseleft" style={{ transition: 'all 6s',marginBottom:"110px" }}>
                            <div className="col-3 p-2 me-3">
                                <a href="#"><img src={this.props.aktifKullaniciProfil.resminin_pathi=="yasin"?logoYasin:User} style={{ borderRadius: "5px" }} className="card-img-top pt-1" alt="Logo" height={"152"} /></a>
                            </div>

                            <div className='col-7 course-detail'>
                                <h6 className='text-dark pt-2 text-start'>Ad: {this.props.aktifKullaniciProfil.ad}</h6>
                                <h6 className='text-dark pt-2 text-start'>Soyad: {this.props.aktifKullaniciProfil.soyad}</h6>
                                <h6 className='text-dark pt-2 text-start'>Yaş: {this.props.aktifKullaniciProfil.yas}</h6>
                                <h6 className='text-dark pt-2 text-start'>Bölüm: {this.props.aktifKullaniciProfil.mezun_oldugu_bolum}</h6>
                                <h6 className='text-dark pt-2 text-start'>Doğum Tarihi: {this.props.aktifKullaniciProfil.dogum_tarihi}</h6>
                                <h6 className='text-dark pt-2 text-start'>Üyelik Tarihi: {this.props.aktifKullaniciProfil.uyelik_tarihi}</h6>
                                <h6 className='text-dark pt-2 text-start'>Mail Adresi: {this.props.aktifKullaniciProfil.mail_adresi}</h6>

                                <div className="pt-2 text-start">
                                    <h6 className='text-dark'>İçerik:</h6>
                                    <ul>
                                        {this.props.aktifKullaniciProfil.kurslar.map(kurs => (
                                            <li key={kurs.kurs_id}>{kurs.kurs_adi} - İlerleme: {kurs.ilerleme}%</li>
                                        ))}
                                    </ul>
                                </div>


                            </div>

                        </div>
                        )
                    )
                }




            </div>
        )
    }
}
