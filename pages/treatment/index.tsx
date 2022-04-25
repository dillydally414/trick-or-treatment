import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import SearchBar from '../../components/SearchBar';
import { BodyContainer, Container, PageContainer } from '../../styles/CommonStyles';
import { SearchInfo, SearchHeader, SearchResults } from '../../styles/SearchStyles';
import { TreatmentType } from '../../types';

export default function Treatment() {
  const [results, setResults] = useState<TreatmentType[]>([]);

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchInfo>
            <SearchHeader>Search Treatments</SearchHeader>
            <SearchBar type="treatment" placeholder="Search treatments" setSearchResults={setResults} />
          </SearchInfo>
          <SearchResults>
            {results.map((treatment) => {
              return <Result
                key={treatment.medication_id}
                title={treatment.name}
                link={`/treatment/${treatment.medication_id}`}
              />
            })}
          </SearchResults>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
