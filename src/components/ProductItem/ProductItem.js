import React from 'react';
import moment from "moment";
import { NavLink } from 'react-router-dom';

const ProductItem = props => {
  return (
    <div className="card my-5">

      <div className="card-header">
        {props.product.title}
      </div>

      <div className="card-body">
        <h5 className="card-title">{props.product.manufacturer}</h5>
        <strong>{props.product.cost} $</strong>
        <p>{moment(props.product.date).format('lll')}</p>
        
        <NavLink to={`/product/${props.product.id}`}>Open</NavLink>
      </div>

    </div>
  );
}

export default ProductItem;
