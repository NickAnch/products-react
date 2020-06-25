import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { createControl, validate, validateForm } from '../../../form/formFrame';
import { connect } from 'react-redux';
import { fetchProductById, editProduct } from '../../../store/actions/product';
import Loader from '../../../components/UI/Loader/Loader';

function createFormControls(product) {
  return {
    title: createControl({
      label: 'Name',
      errorMessage: 'Name can\'t be empty',
      value: product.title,
    }, {required: true}),
    manufacturer: createControl({
      label: 'Manufacturer',
      errorMessage: 'Manufacturer can\'t be empty',
      value: product.manufacturer,
    }, {required: true}),
    cost: createControl({
      label: 'Cost',
      type: 'number',
      errorMessage: 'Cost can\'t be empty',
      value: product.cost,
    }, {required: true}),
  };
}

class EditProduct extends Component {

  state = {
    isFormValid: true,
  };

  componentDidMount() {
    this.props.fetchProductById(this.props.match.params.id)
      .then(() => this.setState({ formControls: createFormControls(this.props.product) }));
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event.target.value, controlName)}
        />
      );
    });
  }

  submit = (event) => {
    event.preventDefault();
  }

  edit = () => {
    const product = {
      id: this.props.match.params.id,
      title: this.state.formControls.title.value,
      manufacturer: this.state.formControls.manufacturer.value,
      cost: this.state.formControls.cost.value,
      date: this.props.product.date,
    };

    this.props.editProduct(product).then(() =>
      this.props.history.push("/admin/dashboard")
    );
  }

  render() {
    return (
      <>
      {
        !this.state.formControls
          ? <Loader />
          : <form onSubmit={this.submit} className="manage-form mt-3">
              <h1 className="text-center">Edit product ({this.props.product.title})</h1>

              { this.renderInputs() }

              <button
                type="submit"
                className="btn btn-dark"
                onClick={this.edit}
                disabled={!this.state.isFormValid}
              >
                Save
              </button>
            </form>
      }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product.product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProductById: id => dispatch(fetchProductById(id)),
    editProduct: (item) => dispatch(editProduct(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
