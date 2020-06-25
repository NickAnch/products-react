import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Product from './containers/Product/Product';
import Auth from './containers/Admin/Auth/Auth';
import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/auth';
import Dashboard from './containers/Admin/Dashboard/Dashboard';
import CreateProduct from './containers/Admin/CreateProduct/CreateProduct';
import EditProduct from './containers/Admin/EditProduct/EditProduct';

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/admin/login" component={Auth} />
        <Route path="/product/:id" component={Product} />
        <Route path="/" exact component={Home} />
        <Redirect to={'/'} />
      </Switch>
    );

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/create" component={CreateProduct} />
          <Route path="/admin/product/:id/edit" component={EditProduct} />
          <Route path="/product/:id" component={Product} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Home} />
          <Redirect to={'/admin/dashboard'} />
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
