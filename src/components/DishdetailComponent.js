import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
    constructor(props){

        super(props);
        this.state = {}
    
    }
    renderComments(comments) {
        if(comments !=null){
            return (
                <div>
                    <h3>Comments</h3>
                        {comments}
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    render() {
        const dish = this.props.selectedDish;
        if(dish != null){
            const comments = dish.comments.map((comment) => {
                return(
                    <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {comment.date}</p>
                    </div>
                );
            });
            return(
                <div className="container">
                    <div className = "row">
                        <Card className="col-12 col-md-5 m-1 border-0">
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        <Card className="col-12 col-md-5 m-1 border-0">
                            {this.renderComments(comments)}
                        </Card>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
        
    }
}
export default DishDetail;