import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.item.recipeName}</Table.Cell>
        <Table.Cell>{this.props.item.recipeAuthor}</Table.Cell>
        <Table.Cell>{this.props.item.ingredients}</Table.Cell>
        <Table.Cell>{this.props.item.total}</Table.Cell>
        <Table.Cell>{this.props.item.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ItemAdmin.propTypes = {
  item: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeAuthor: PropTypes.string,
    ingredients: PropTypes.string,
    total: PropTypes.number,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ItemAdmin;
