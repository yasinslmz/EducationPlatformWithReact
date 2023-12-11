import React, { Component } from 'react'
import Logo from '../images/logo.png';
import User from '../images/user.png';

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentShow: true,
            courses:null,
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

    componentDidUpdate(prevProps){
        if(prevProps.contentShow!==this.props.contentShow ){
          
          this.setState({contentShow:this.props.contentShow});
        
          console.log(this.state.contentShow);
        
        }
       
    
      }

    
     

    render() {

        return (
            <div className='content m-0 p-0' id='content'>

                {
                    this.state.contentShow && (
                        <div className='container' style={{paddingTop:"135px"}}>
                            <em><h2 >Kurslar</h2></em>
                            <hr />
                            <div className="row ">

                                {   
                                    this.state.courses && (
                                        this.state.courses.map(course => (
                                            <div className="col-3 g-4">
                                                <div className="card lift-on-hover h-100" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                                    <a href="#" onClick={()=>this.props.genelKurslarShow(course)}><img src={course.logo?course.logo:User} className="card-img-top" height={"260"} /></a>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{course.title}</h5>
                                                        <p className="card-text">{course.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
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
