import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'black' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              Easy Chef <br />
              http://easy-chef.github.io/<br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
