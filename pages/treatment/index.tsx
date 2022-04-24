import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import SearchBar from '../../components/SearchBar';
import { BodyContainer, Container, PageContainer } from '../../styles/CommonStyles';
import { SearchInfo, SearchHeader, SearchResults } from '../../styles/SearchStyles';
import { TreatmentType } from '../../types';

export default function Treatment() {
  const [results, setResults] = useState<TreatmentType[]>([{ id: 1, name: "Aspirin" }]);

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchInfo>
            <SearchHeader>Search Treatments</SearchHeader>
            {/* TODO: Make the search bar work :-) */}
            <SearchBar placeholder="Search diseases" />
          </SearchInfo>
          <SearchResults>
            {results.map((treatment) => {
              return <Result key={treatment.id} title={treatment.name} link={`/treatment/${treatment.id}`} />
            })}
          </SearchResults>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
