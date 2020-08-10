import React, {Component} from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Modal,ModalHeader,Button, ModalBody,Row, Label,Col} from 'reactstrap';
import {Link} from 'react-router-dom' ;
import { LocalForm , Control, Errors} from 'react-redux-form';
import { addComment } from '../redux/ActionCreator';
import {Loading} from './LoadingComponent' ;
import { baseUrl } from '../shared/baseUrl';

function RenderDish ({dish}) {

    if (dish != null) {
        return (
                 <React.Fragment>
                 <Card>
                  <CardImg width="100%" top src={baseUrl + dish.image} alt={dish.name} />
                   <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                   </CardBody>
                 </Card>
            </React.Fragment>  
        ) ;
    }
    else
       return(<div></div>) ;
}

const minLength = (len) => (val) => !(val) || (val.length >= len) ;
const maxLength = (len) => (val) => (!val) || (val.length <= len) ;
const required = (val) => val && val.length ;

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false 
        } ;
        this.toggleModal = this.toggleModal.bind(this) ;
        this.handleSubmit = this.handleSubmit.bind(this) ;
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating, values.name, values.comment);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    
    render() {
        return(
            <React.Fragment>
                <span><Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg" />Submit Comment</Button></span>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group" >
                                 <Label md={2} htmlFor="rating">Rating</Label>
                                 <Col md={12} >
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={4} htmlFor="name">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" name="name"
                                           className="form-control" placeholder="Your Name"
                                           validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
                                           />
                                    <Errors className="text-danger" show="touched" model=".name"
                                     messages={{
                                         required: 'Field Required',
                                         minLength: 'Must be greater than 2 characters',
                                         maxLength: 'Must be 15 characters or less'
                                     }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={4} htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" placeholder="Your Comments" rows="6" className="form-control col-12" validators={{required}}/>
                                    <Errors className="text-danger" show="touched" model=".comment"
                                         messages={{
                                             required: 'Comment cannot be empty'
                                         }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


function RenderComments({dishComments, addComment, dishId}) {
    if(dishComments != null) {
        const comt = dishComments.map((com)=>{
            return (
                <React.Fragment>
                    <li>{com.comment}</li><br/>
                    <li>-- {com.author}, {new Intl.DateTimeFormat('en-US',{year : 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li> <br/>
                </React.Fragment>
            ) ;
        }) ;   
     return (
         <React.Fragment>
                      <h4>Comments</h4>
            <ul className="list-unstyled">
             {comt}
         </ul>
         <CommentForm dishId={dishId} addComment={addComment}/>
         </React.Fragment>
     )   
  }
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
     else if(props.dish != null)
        return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments dishComments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
            </div>
        </div>
        </div>
    );
    else return (<div></div>);
}


export default DishDetail ;