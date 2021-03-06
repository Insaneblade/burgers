import React from "react";
import PropTypes from "prop-types"
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

class MenuAdmin extends React.Component{

    static = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
    }

    render() {
        return(
            <div className="menu-admin">
                <h2>Управление Меню</h2>
                {Object.keys(this.props.burgers).map(key => {
                    return <EditBurgerForm key={key} index={key} burger = { this.props.burgers[key]} updateBurger={this.props.updateBurger} deleteBurger={this.props.deleteBurger}/>
                })}
                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
            </div>
        )
    }
}

export default MenuAdmin;