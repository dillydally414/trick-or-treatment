import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import SearchBar from '../../components/SearchBar';
import { BodyContainer, Container, PageContainer } from '../../styles/CommonStyles';
import { SearchInfo, SearchHeader, SearchResults } from '../../styles/SearchStyles';
import { DiseaseType } from '../../types';

export default function Disease() {
  const [results, setResults] = useState<DiseaseType[]>([{ id: 1, name: "Migraines" }]);

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchInfo>
            <SearchHeader>Search Diseases</SearchHeader>
            {/* TODO: Make the search bar work :-) */}
            <SearchBar placeholder="Search diseases" />
          </SearchInfo>
          <SearchResults>
            {results.map((disease) => {
              return <Result key={disease.id} title={disease.name} link={`/disease/${disease.id}`} />
            })}
          </SearchResults>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
