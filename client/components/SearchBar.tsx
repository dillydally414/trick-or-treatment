import React, { useState } from 'react'
import styled from 'styled-components';
import Color from '../styles/colors';
import { Search } from '@mui/icons-material';
import Font from '../styles/fonts';
import Axios from 'axios';

const SearchContainer = styled.form`
  background-color: ${Color.LIGHT_GRAY};
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
`;

const TextInput = styled.input`
  background-color: transparent;
  border-color: transparent;
  color: ${Color.BLACK};
  font-family: ${Font.SECONDARY};
  font-size: 1.5rem;
  width: 100%;
  :focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${Color.DARK_GRAY}
  }
`;

const SubmitButton = styled.button`
  align-items: center;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  display: flex;
`;

const SearchIcon = styled(Search)`
  color: ${Color.DARK_GRAY};
`;

interface SearchBarProps {
  placeholder: string;
  setSearchResults: Function;
}

export default function SearchBar({
  placeholder,
  setSearchResults
}: SearchBarProps) {

  const [searchField, setSearchField] = useState('')

  const submitSearch = () => {
    if (placeholder === "Search diseases") {
      Axios.post("http://localhost:3001/api/getDisease", {
        params: {
          searchForDisease: searchField
        }}).then((response) => {
          setSearchResults(response.data)
        })
    }
    else if (placeholder === "Search treatments") {
      Axios.post("http://localhost:3001/api/getTreatment", {
        params: {
          searchForTreatment: searchField
        }}).then((response) => {
          setSearchResults(response.data)
        })
    }
  }

  return (
    <SearchContainer action="/" method="get" onSubmit={(e) => {e.preventDefault()}}>
      <TextInput
        type="text"
        id="header-search"
        placeholder={placeholder}
        name="s"
        onChange={(e) => {
          setSearchField(e.target.value)
        }}
      />
      <SubmitButton type="submit" onClick={submitSearch}>
        <SearchIcon />
      </SubmitButton>
    </SearchContainer>
  )
}
