import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Vendors (Admin) table. See pages/ListItemsAdmin.jsx. */
class VendorAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.vendor.name}</Table.Cell>
        <Table.Cell>{this.props.vendor.address}</Table.Cell>
        <Table.Cell>{this.props.vendor.storeHours}</Table.Cell>
        <Table.Cell>{this.props.vendor.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
VendorAdmin.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    storeHours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default VendorAdmin;
