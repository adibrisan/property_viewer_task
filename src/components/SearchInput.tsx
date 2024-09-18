import { Input } from 'antd';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { filterBuildings } from '../features/buildingsSlice';

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(filterBuildings(value));
    }, 500),
    [dispatch]
  );

  const handleOnSearchBuildings = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Search
      placeholder="search building by name"
      onChange={handleOnSearchBuildings}
      style={{ width: '220px' }}
    />
  );
};

export default SearchInput;
