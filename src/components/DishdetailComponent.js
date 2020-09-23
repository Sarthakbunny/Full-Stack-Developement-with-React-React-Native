import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
    
    function RenderDetailItem({dish}){
        if(dish != null){
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
        else{
            return <div></div>
        }
    }
    function RenderComments({dish}) {
        if(dish != null){
            const comments = dish.comments.map((comment) => {
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
                    {comments.length > 0 ? comments : null}
                </div>
            );
        }
        else{
            return <div></div>
        }
    }
    
    const DishDetail = (props) => {
        return(
            <div className="container">
                <div className = "row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDetailItem dish={props.dish} />
                    </div>
                    <RenderComments dish={props.dish} />
                </div>
            </div>    
        );
    }
export default DishDetail;