import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const MAXPRICES = {
  salad: 0.4,
  meat: 100,
  bacon: 1000,
  cheese: 0.1,
};

class BurgerBuilder extends Component {
  state = {
    Ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-d0b36-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ Ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  setPurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKeys) => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredients = (type) => {
    const updatedCount = this.state.Ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.Ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.price + MAXPRICES[type];
    this.setState({
      price: newPrice,
      Ingredients: updatedIngredients,
    });
    this.setPurchasableState(updatedIngredients);
  };
  removeIngredients = (type) => {
    if (this.state.Ingredients[type] > 0) {
      const updatedCount = this.state.Ingredients[type] - 1;
      const updatedIngredients = {
        ...this.state.Ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.price - MAXPRICES[type];
      this.setState({
        price: newPrice,
        Ingredients: updatedIngredients,
      });
      this.setPurchasableState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchseHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price,
    //   customer: {
    //     name: "test test",
    //     address: {
    //       street: "testStreet",
    //       zipCode: "1234",
    //       count: "test",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    // // alert("Fuck Off!!!")
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.state.Ingredients,
    };
    for (let keys in disabledInfo) {
      disabledInfo[keys] = disabledInfo[keys] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.Ingredients) {
      burger = (
        <Aux>
          <Burger Ingredients={this.state.Ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredients}
            ingredientRemoved={this.removeIngredients}
            totalAmount={this.state.price}
            disable={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.Ingredients}
          purchaseContinue={this.continuePurchseHandler}
          purchaseCancelled={this.cancelPurchaseHandler}
          totalPrice={this.state.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
