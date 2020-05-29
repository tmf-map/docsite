/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, useCallback} from 'react';
import classnames from 'classnames';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './styles.css';

const Search = props => {
  const [algoliaLoaded, setAlgoliaLoaded] = useState(false);
  const initialized = useRef(false);
  const searchBarRef = useRef(null);
  const history = useHistory();
  const {siteConfig = {}} = useDocusaurusContext();
  const {baseUrl} = siteConfig;
  const initAlgolia = () => {
    if (!initialized.current) {
      // eslint-disable-next-line
      new window.DocSearch({
        searchData: window.searchData,
        inputSelector: '#search_input_react',
        // Override algolia's default selection event, allowing us to do client-side
        // navigation and avoiding a full page refresh.
        handleSelected: (_input, _event, suggestion) => {
          const url = baseUrl + suggestion.url;
          // Use an anchor tag to parse the absolute url into a relative url
          // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
          const a = document.createElement('a');
          a.href = url;
          // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
          // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.

          history.push(url);
        }
      });
      initialized.current = true;
    }
  };

  const getSearchData = () =>
    process.env.NODE_ENV === 'production'
      ? fetch(`${baseUrl}search-data.json`).then(content => content.json())
      : Promise.resolve([]);

  const loadAlgolia = () => {
    if (!algoliaLoaded) {
      Promise.all([
        getSearchData(),
        import('./lib/DocSearch'),
        import('./algolia.css')
      ]).then(([searchData, {default: DocSearch}]) => {
        setAlgoliaLoaded(true);
        window.searchData = searchData;
        window.DocSearch = DocSearch;
        initAlgolia();
      });
    } else {
      initAlgolia();
    }
  };

  const toggleSearchInput = useCallback(() => {
    loadAlgolia();

    if (algoliaLoaded) {
      searchBarRef.current.focus();
    }

    props.handleSearchBarToggle(!props.isSearchBarExpanded);
  }, [props.isSearchBarExpanded]);

  const handleSearchInputBlur = useCallback(() => {
    props.handleSearchBarToggle(!props.isSearchBarExpanded);
  }, [props.isSearchBarExpanded]);

  const handleSearchInput = useCallback(e => {
    const needFocus = e.type !== 'mouseover';

    loadAlgolia(needFocus);
  });

  return (
    <div className="navbar__search" key="search-box">
      <div className="searchWrapper">
        <span
          aria-label="expand searchbar"
          role="button"
          className={classnames('searchIconButton', {
            searchIconButtonHidden: props.isSearchBarExpanded
          })}
          onClick={toggleSearchInput}
          onKeyDown={toggleSearchInput}
          tabIndex={0}
        />

        <input
          id="search_input_react"
          type="search"
          placeholder="Search"
          aria-label="Search"
          className={classnames('navbar__search-input', 'searchInput', {
            searchInputExpanded: props.isSearchBarExpanded
          })}
          onMouseOver={handleSearchInput}
          onFocus={handleSearchInput}
          onBlur={handleSearchInputBlur}
          ref={searchBarRef}
        />
      </div>
    </div>
  );
};

export default Search;
