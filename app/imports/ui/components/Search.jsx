import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ keyword, setKeyword }) => (
  <input
    key="random1"
    value={keyword}
    placeholder={'search country'}
    onChange={(e) => setKeyword(e.target.value)}
  />
);

SearchBar.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.string,
};

export default SearchBar;
