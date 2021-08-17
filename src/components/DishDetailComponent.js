import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}){
        if(dish != null)
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
            else{
                return(
                    <div></div>
                )
            }
    }

    function RenderComments({comments}){
       if(comments != null){
        var commentList = comments.map((comment) => {
            return(
                <li key={comment.id}>
                    {comment.comment}
                    <br />
                    -- {comment.author}, 
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    <br /><br />
                </li>
                
            )
         })
         return(
             <div>
                 <h4>Comments</h4>
                 <ul className="list-unstyled">{commentList}</ul>
                 <CommentForm />
             </div>
         )
       }
       else{
           return(
               <div></div>
           )
       }
       
    }

    const DishDetail = (props) => {
        if(props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                       <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                       <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    export default DishDetail;

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    export class CommentForm extends Component {

        constructor(props){
            super(props)

            this.state = {
                isModalOpen: false
            }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit(values){
            console.log("Current State is:" + JSON.stringify(values));
            alert("Current State is:" + JSON.stringify(values));
        }

        render() {
                return(
                    <div>
                        <Button color="secondary" onClick={this.toggleModal}>
                        <i className="fa fa-pencil"></i>
                        Submit Comment
                    </Button>
                    <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Content</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group"> 
                                <Label className="ml-3" htmlfor="rating">Rating</Label>
                                <Col>
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
                            <Label className="ml-3" htmlFor="telnum">Your Name</Label>
                                <Col >
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                        <Errors 
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less',
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3" htmlFor="comment">Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12" className="form-control"/>
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
                    </div>
                    </div>
                    
                    
                )
        }
    }
    