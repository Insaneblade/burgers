import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurders from '../sample-burgers';
import base from "../base";
import PropTypes from 'prop-types'



class App extends React.Component{

    static propTypes = {
        match: PropTypes.object
    }

    state = {
        burgers:{},
        order:{}
    };

    componentDidMount(){
        const localStorageRef = localStorage.getItem(this.props.match.params.restaurantId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${this.props.match.params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        })
    }

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.restaurantId, JSON.stringify(this.state.order))
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addBurger = (burger) =>{
        const burgers = {...this.state.burgers};
        burgers[`burgers${Date.now()}`] = burger;
        this.setState({burgers: burgers})
    }

    updateBurger = (key, updatedBurger) => {
        const burgers = {...this.state.burgers};
        burgers[key] = updatedBurger;
        this.setState({burgers})
    }

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers}
        burgers[key] = null;
        this.setState({burgers})
    }

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurders})
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1;
        this.setState({order: order})
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    render(){
        return(
            <div className="burger-paradise">
                <div className="menu">
                    <Header title="Very Hot Burger" amount={10} hot={true} />
                    <ul className="burgers">
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger key={key} index={key} addToOrder={this.addToOrder} details={this.state.burgers[key]}/>;
                        })}
                    </ul>
                </div>
                <Order burgers={this.state.burgers} order={this.state.order} deleteFromOrder = {this.deleteFromOrder}/>
                <MenuAdmin addBurger={this.addBurger} loadSampleBurgers={this.loadSampleBurgers} burgers={this.state.burgers} updateBurger={this.updateBurger} deleteBurger={this.deleteBurger}/>
            </div>
        )
    }
}

export default App;