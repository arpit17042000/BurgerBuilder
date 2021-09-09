import React,{ Component } from 'react'
import Button from '../UI/Button/Button'

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log("[OrderSummary.js] component will update")
    }


    render(){
         const ingredientsSummary = Object.keys(this.props.ingredients).map((igkeys)=>{
        return(
            <li key={igkeys}>
                <span style={{textTransform: 'capitalize'}}>{igkeys}</span> : {this.props.ingredients[igkeys]}
            </li>
        )
    })
        return (
             <div>
            <h3>Your Order</h3>
            <p>A shitty burger with overpriced shitty ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price:{this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Want to Continue?</p>
            <Button 
                btnType="Success"
                clicked={this.props.purchaseContinue}>YES</Button>
            <Button
                btnType="Danger"
                clicked={this.props.purchaseCancelled}>NO</Button>
             </div>
        )
    }
} 

export default OrderSummary
