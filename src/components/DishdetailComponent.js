import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Col, Breadcrumb, BreadcrumbItem, Row, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    const required = (val) => val && val.length;
    const maxLength = (len)=>(val)=>!(val)||(val.length<=len);
    const minLength = (len)=>(val)=>(val) && (val.length>=len);

    class CommentComponent extends Component{
        constructor(props){
            super(props);
            this.state = {
                modalOpen: false
            }
            this.handleToggle = this.handleToggle.bind(this);
            this.submitComment = this.submitComment.bind(this);
        }
        handleToggle = () => {
            console.log("OPenede");
            this.setState({
                modalOpen: !this.state.modalOpen
            });
        }

        submitComment = (values) => {
            console.log("Current State is:" + JSON.stringify(values));
            alert("Current State is:" + JSON.stringify(values));
        }

        render() {
            return (
                <React.Fragment>
                    <Button className="bg-white text-dark" type="submit" onClick={this.handleToggle}>
                        <i className="fa fa-pencil fa-lg"></i>{' '}Submit Comment
                    </Button>
                    <Modal isOpen={this.state.modalOpen} toggle={this.handleToggle}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => {this.submitComment(values)}}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={4}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={4}>Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" className="form-control"
                                        validators = {{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Author Name Required',
                                                minLength: 'Auhtor Name must be > 3',
                                                maxLength: 'Author Name must be <15'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={4}>Name</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                                rows="6"
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".comment"
                                                show="touched"
                                                messages={{
                                                    required:'Comment Required'
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button className="bg-primary" type="submit">
                                            <i className="fa fa-pencil fa-lg"></i>{' '}Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }
    
    function RenderDetailItem({dish}){
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    function RenderComments({comments}) {
        if(comments != null){
            const result = comments.map((comment) => {
                return(
                    <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                )
            });
    
            return (
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    {result.length > 0 ? result : null}
                    <CommentComponent />
                </div>
            );
        }
        else{
            return <div></div>
        }
    }
    const DishDetail = (props) => {
        if(props.dish != null)
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> Menu </h3>
                        <hr />
                    </div>
                </div>
                    <div className = "row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDetailItem dish={props.dish} />
                        </div>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>    
            );
        else
            return <div></div>
    }
export default DishDetail;