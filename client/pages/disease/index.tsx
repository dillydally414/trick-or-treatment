import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import SearchBar from '../../components/SearchBar';
import { BodyContainer, Container, PageContainer } from '../../styles/CommonStyles';
import { SearchInfo, SearchHeader, SearchResults } from '../../styles/SearchStyles';
import { DiseaseType } from '../../types';

export default function Disease() {
  const [results, setResults] = useState<DiseaseType[]>([]);

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchInfo>
            <SearchHeader>Search Diseases</SearchHeader>
            <SearchBar placeholder="Search diseases" setSearchResults={setResults} />
          </SearchInfo>
          <SearchResults>
            {results.map((disease) => {
              return <Result key={disease.disease_id} title={disease.name} link={`/disease/${disease.disease_id}`} />
            })}
          </SearchResults>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
