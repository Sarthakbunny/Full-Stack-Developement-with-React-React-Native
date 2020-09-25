import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
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