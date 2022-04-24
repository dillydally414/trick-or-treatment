import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Color from '../styles/colors';
import Axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const PageContainer = styled.div`
  height: 100%;
  background-color: ${Color.ORANGE};
`;

const SearchInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchHeader = styled.h1`
  color: black;
  font-size: 32px;
`;

export default function Treatment() {

  const [treatmentSearchField, setTreatmentSearchField] = useState('')
  const [treatmentResultList, setTreatmentResultList] = useState([])

  const submitSearch = () => {
    Axios.post("http://localhost:3001/api/getTreatment", {
      params: {
        searchForTreatment: treatmentSearchField
      }}).then((response) => {
        setTreatmentResultList(response.data)
      })
  }

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <SearchInfo>
          <SearchHeader>Search Treatments</SearchHeader>
          {/* TODO: Style tf out of this mf search bar */}
          {/* TODO: Make the search bar work :-) */}
          {/* TODO: Use a SearchBar component here or nah? */}
          <input
              type="text"
              id="header-search"
              placeholder={"Search treatments"}
              name="s" 
              onChange={(e) => {
                setTreatmentSearchField(e.target.value)
              }}
          />
          <button type="submit" onClick={submitSearch}>Search</button>
        </SearchInfo>
        {Array.isArray(treatmentResultList) && treatmentResultList.map((val) => {
          return <h1>Treatment Result: {val.name}</h1>
        })}
      </PageContainer>
    </Container>
  );
}
