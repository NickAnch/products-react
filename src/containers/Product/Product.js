import React, { Component } from 'react';
import classes from './Product.module.scss';
import { connect } from 'react-redux';
import { fetchProductById } from '../../store/actions/product';
import { NavLink } from 'react-router-dom';
import moment from "moment";
import Loader from '../../components/UI/Loader/Loader';

class Product extends Component {

  componentDidMount() {
    this.props.fetchProductById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.post}>
        {
          this.props.loading || !this.props.product
          ? <Loader />
          : <>
              <div className={classes.header}>
                <h1>{this.props.product.title}</h1>
                <NavLink className="btn btn-outline-info" to={'/'}>Main page</NavLink>
              </div>

              <div className={classes.info}>
                <h5 className="card-title">{this.props.product.manufacturer}</h5>
                <strong>{this.props.product.cost} $</strong>
                <p>{moment(this.props.product.date ).format('lll')}</p>
              </div>
            </>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.product.loading,
    product: state.product.product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProductById: id => dispatch(fetchProductById(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
