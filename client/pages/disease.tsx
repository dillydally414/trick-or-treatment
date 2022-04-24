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

export default function Disease() {

  const [diseaseSearchField, setDiseaseSearchField] = useState('')
  const [diseaseResultList, setDiseaseResultList] = useState([])

  const submitSearch = () => {
    Axios.post("http://localhost:3001/api/getDisease", {
      params: {
        searchForDisease: diseaseSearchField
      }}).then((response) => {
        console.log(response)
        setDiseaseResultList(response.data)
      })
  }

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <SearchInfo>
          <SearchHeader>Search Diseases</SearchHeader>
          {/* TODO: Style tf out of this mf search bar */}
          {/* TODO: Make the search bar work :-) */}
          {/* TODO: Use a SearchBar component here or nah? */}
          <input
              type="text"
              id="header-search"
              placeholder={"Search diseases"}
              name="s" 
              onChange={(e) => {
                setDiseaseSearchField(e.target.value)
              }}
          />
          <button type="submit" onClick={submitSearch}>Search</button>
        </SearchInfo>
        {Array.isArray(diseaseResultList) && diseaseResultList.map((val) => {
          return <h1>Disease Result: {val.name}</h1>
        })}
      </PageContainer>
    </Container>
  );
}
