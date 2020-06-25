import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts, removeProduct } from '../../../store/actions/product';
import { NavLink } from 'react-router-dom';
import moment from "moment";
import Loader from '../../../components/UI/Loader/Loader';

class Dashboard extends Component {

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    return (
      <>
        {
          this.props.loading || !this.props.products.length
          ? <Loader />
          : <table className="table table-striped mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.title}</td>
                      <td>{product.cost} $</td>
                      <td>{product.manufacturer}</td>
                      <td>{moment(product.date).format('lll')}</td>
                      <td>
                        <NavLink
                          to={`/admin/product/${product.id}/edit`}
                          className="btn btn-outline-info mr-4"
                        >
                          Edit
                        </NavLink>
                        <button
                          onClick={this.props.removeProduct.bind(this, product.id)}
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.products,
    loading: state.product.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    removeProduct: id => dispatch(removeProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
