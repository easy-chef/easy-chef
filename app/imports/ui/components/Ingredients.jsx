import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class Ingredients extends React.Component {
  handleClick = () => {
    VendorIngredients.collection.remove(this.props.vendoringredient._id);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.vendoringredient.ingredient}</Table.Cell>
        <Table.Cell>${this.props.vendoringredient.price}</Table.Cell>
        <Table.Cell>{this.props.vendoringredient.size}</Table.Cell>
        <Table.Cell>{this.props.vendoringredient.quantity}</Table.Cell>
        <Table.Cell>
          <Link to={`/editingredients/${this.props.vendoringredient._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>
          <Icon name='trash' textAlign='right' onClick={this.handleClick}></Icon>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Ingredients.propTypes = {
  vendoringredient: PropTypes.shape({
    ingredient: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
    quantity: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Ingredients);
