import React, { Component } from 'react'
import StudentCard from './CardForStCourses';




export default class StudentCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: null,
            ogrenciler: null,
            kurslar: null,
            error: null,
            update: 0
        }

    }

    selectCourse = (course) => {
        this.setState({ selectedCourse: course })

    }


    componentDidMount() {
        this.setState({ update: this.props.update });
        this.fetchData();


    }

    componentDidUpdate(prevProps) {
        if (prevProps.update != this.props.update) {
            this.fetchData();
            console.log(prevProps.update);
            console.log(this.props.update);
            console.log(this.state.kurslar);
            console.log(this.state.ogrenciler);
        }


    }


    fetchData = () => {



        fetch("http://localhost:3000/ogrenciler")
            .then(response => response.json())
            .then((ogrenciler) => {

                this.setState({ ogrenciler: ogrenciler });
                console.log(ogrenciler);
            })
            .catch((error) => {
                console.error('Öğrenci verisi çekme hatası:', error);
            });

        fetch("http://localhost:3000/kurslar")
            .then(response => response.json())
            .then((kurslar) => {

                this.setState({ kurslar: kurslar });
                console.log(this.state.kurslar);
            })
            .catch((error) => {
                console.error('Öğrenci verisi çekme hatası:', error);
            });


    }


    render() {
        return (
            <div className='container' style={{ paddingTop: "50px" }}>
                {

                    this.props.mycoursesShow && (
                        <div className='row'>
                            <div className='col-4 justify-content-center rounded scourseleft' style={{ height: "550px", overflowY: 'scroll', scrollbarWidth: 'thin', scrollbarColor: 'rgba(155, 155, 155, 0.5) rgba(255, 255, 255, 0.1)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                <h4 className='pt-4 txee'>Kurslarım</h4>
                                <hr />

                                <div className='col-12' onMouseLeave={this.props.hideMenu}>
                                    <div className="justify-content-center row w-100">
                                        {
                                            this.state.ogrenciler.find(ogrenci => ogrenci.id === this.props.aktifKullanici)?.kurslar.map(course => {
                                                let matchingCourse = this.state.kurslar.find(kurs => kurs.id === course.kurs_id);
                                                matchingCourse = { ...matchingCourse, ilerleme: course.ilerleme };
                                                return matchingCourse && (
                                                    <StudentCard
                                                        key={matchingCourse.id}
                                                        course={matchingCourse}
                                                        selectCourse={this.selectCourse}
                                                        title={matchingCourse.title}
                                                        text={matchingCourse.description}
                                                        logo={matchingCourse.logo}
                                                    />
                                                );
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-8">


                                <div className='col-12' onMouseLeave={this.props.hideMenu}>
                                    <div className="justify-content-evenly row">
                                        {

                                            this.state.selectedCourse && (
                                                <div className="col-lg-8 row">
                                                    <div className="col-4 p-2">
                                                        <a href=""><img src={this.state.selectedCourse.logo} style={{ borderRadius: "7px" }} className="card-img-top" alt="Logo" height={"112"} /></a>
                                                    </div>
                                                    <div className='col-8 course-detail'>
                                                        <h6 className='text-dark pt-2 text-start' >Kurs: {this.state.selectedCourse.title} </h6>
                                                        <h6 className='text-dark pt-2 text-start' >Kurs Değerlendirme: {this.state.selectedCourse.degerlendirme} </h6>
                                                        <h6 className='text-dark pt-2 text-start' >Kurs İlerlemem: </h6>
                                                        {/* Progress Bar */}
                                                        <div className="progress mt-2">

                                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.selectedCourse.ilerleme}%` }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{this.state.selectedCourse.ilerleme}%</div>
                                                        </div>

                                                        <p className='text-start pt-2'><span style={{ fontSize: '1rem', fontWeight: '500' }}>Kurs Özet:</span>{this.state.selectedCourse.ozet}</p>

                                                        {/* İçerik Listesi */}
                                                        <div className="pt-2  text-start">
                                                            <h6 className='text-dark'>İçerik:</h6>
                                                            <ul>
                                                                {this.state.selectedCourse.icerik.map(item => (
                                                                    <li>{item}</li>
                                                                ))
                                                                }


                                                            </ul>
                                                        </div>

                                                        {/* Favori Sayısı */}
                                                        <div className="pt-2">
                                                            <h6 className='text-dark text-start'>Kursa kayıtlı kişi sayısı:<span className="text-primary">
                                                                <i className="bi bi-heart"> {this.state.selectedCourse.kayitli_kisi_sayisi}  </i>
                                                            </span></h6>

                                                        </div>

                                                        {/* Eğitmen Adı */}
                                                        <div className="pt-2  text-start">
                                                            <h6 className='text-dark'>Eğitmen: {this.state.selectedCourse.egitmen}</h6>

                                                        </div>
                                                    </div>
                                                </div>

                                            )

                                        }

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
