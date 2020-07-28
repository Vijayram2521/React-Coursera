import React, { Component } from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props) ;

        this.state= {
            dish : null
        }
    }

    renderComments(dishComments) {
       if(dishComments != null) {
           const comt = dishComments.map((com)=>{
               return (
                   <React.Fragment>
                       <li>{com.comment}</li><br/>
                       <li>-- {com.author}, {com.date}</li> <br/>
                   </React.Fragment>
               ) ;
           }) ;
         return(
             <React.Fragment>
                 <h4>Comments</h4>
             <ul className="list-unstyled">
                 {comt}
             </ul>
             </React.Fragment>
         ) ; 
       }
    }
    

   render() {
       const dish = this.props.dish ;
       if (dish != null) {
           return (
               <React.Fragment>
                 <div className="container">
                <div className="row">
                  <div className="col-12 col-md-5 m-1">
                    <Card>
                     <CardImg width="100%" top src={dish.image} alt={dish.name} />
                      <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="col-12 col-md-5 m-1">
                         {this.renderComments(dish.comments)}
                  </div>
                </div>
            </div>
               </React.Fragment>   
           ) ;
       }
       else
          return(<div></div>)
   }
}

export default DishDetail ;