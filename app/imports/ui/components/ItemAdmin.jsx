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
        <Table.Cell>{this.props.item.recipeEmail}</Table.Cell>
        <Table.Cell>{this.props.item.description}</Table.Cell>
        <Table.Cell>{this.props.item.image}</Table.Cell>
        <Table.Cell>{this.props.item.total}</Table.Cell>
        <Table.Cell>{this.props.item.rating}</Table.Cell>
        <Table.Cell>{this.props.item.servings}</Table.Cell>
        <Table.Cell>{this.props.item.restrictions}</Table.Cell>
        <Table.Cell>{this.props.item.ingredients}</Table.Cell>
        <Table.Cell>{this.props.item.tools}</Table.Cell>
        <Table.Cell>{this.props.item.steps}</Table.Cell>
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
    recipeEmail: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,

    total: PropTypes.number,
    rating: PropTypes.number,
    servings: PropTypes.number,

    restrictions: PropTypes.string,
    ingredients: PropTypes.string,
    tools: PropTypes.string,
    steps: PropTypes.string,

    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ItemAdmin;
