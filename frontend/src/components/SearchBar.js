import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { DroneContext } from '../contexts/DroneProvider';

const TableTitle = styled.p`
  font-family: jungkalight,sans-serif;
  font-size: 20px;
  flex: 1;
  padding-left: 20px;
`

export default function SearchBar() {
  const [, dispatch ] = React.useContext(DroneContext);
  const handleSearchChange = (e) => {
    dispatch({ type : "update-search-query", payload : e.target.value.toLowerCase() });
  }

  return (
    <Box sx={{ m: 1, display : "flex", flexDirection : "row", width : "100%" }}>
      <TableTitle>NDZ Violations</TableTitle>
      <FormControl sx={{ flex : 2, mr : 5}} variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Search by pilot ID
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}