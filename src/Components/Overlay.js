import React, { Component } from 'react'
import Logo from '../images/logo.png';
import Card from './Card';


export default class Overlay extends Component {

  constructor(props) {
    super(props);
    this.state={
      courses:null,
      db:null,
      error:null
    }
  }


  componentDidMount(){
    this.fetchData();
  
   
  }

  fetchData=()=>{

    

    fetch("http://localhost:3000/kurslar")
      .then(response => response.json())
      .then((courses) => {
    
        this.setState({courses:courses});
      })
      .catch((error) => {
        console.error('Öğrenci verisi çekme hatası:', error);
      });
  
  


  }


  

  render() {
    return (
      <div className='row justify-content-center w-100 px-0'>

        {
          this.props.isShowMenu && (
            <div className='dropdownMenu p-5' onMouseLeave={this.props.hideMenu}>
              <div className="row">
              {
                this.state.courses.map(course=>(
                  <Card course={course} genelKurslarShow={this.props.genelKurslarShow}  title={course.title} text={course.description} logo={course.logo} />
                ))
              }

                {/* İstediğiniz kadar kart ekleyebilirsiniz */}
              </div>
            </div>
          )
        }


      </div>
    )
  }
}
