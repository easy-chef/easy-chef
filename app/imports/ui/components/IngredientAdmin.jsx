import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Ingredients (Admin) table. */
class IngredientAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.ingreditem.ingredient}</Table.Cell>
        <Table.Cell>{this.props.ingreditem.price}</Table.Cell>
        <Table.Cell>{this.props.ingreditem.size}</Table.Cell>
        <Table.Cell>{this.props.ingreditem.quantity}</Table.Cell>
        <Table.Cell>{this.props.ingreditem.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
IngredientAdmin.propTypes = {
  ingreditem: PropTypes.shape({
    ingredient: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
    quantity: PropTypes.number,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default IngredientAdmin;
