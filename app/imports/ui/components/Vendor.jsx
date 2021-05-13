import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Vendor table. See pages/ViewVendors.jsx. */
class Vendor extends React.Component {
  render() {
    return (
      <Card centered>
        <img alt={'vendor image'} src={this.props.vendor.image} height={250}/>
        <Card.Content>
          <Card.Header>{this.props.vendor.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.vendor.storeHours}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.vendor.bio}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='location arrow' />
            {this.props.vendor.address}
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
              Contact Us: {this.props.vendor.email}
          </a>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Vendor.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    storeHours: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Vendor);
