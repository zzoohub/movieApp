import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InfoBox from '../components/InfoBox';
import { makeImgPath } from '../util/makeImgPath';

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 50px;
  color: #f9f9f9;
  em {
    font-weight: bold;
    font-size: 28px;
  }
  strong {
    font-size: 28px;
    :last-of-type {
      margin-right: 10px;
    }
  }
  span {
    font-size: 22px;
    margin-top: 2px;
    font-weight: 100;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: calc(100% - 30px);
  margin: 20px auto;
  border-bottom: 1px solid #94979e;
`;
const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  background: none;
  color: ${props => (props.tabMatch ? '#fff' : '#94979E')};
  border: none;
  border-bottom: ${props => (props.tabMatch ? '2px solid #ff3d3d' : 'none')};
  font-size: 18px;
  font-weight: ${props => (props.tabMatch ? '500' : '300')};
  transition: all linear 0.2s;
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-template-rows: auto;
  gap: 40px;
  row-gap: 60px;
  width: 100%;
  margin: 5px auto;
  height: max-content;
  padding: 15px;
  margin-bottom: 50px;
`;

const Contents = styled.div``;

export default function SearchedInfo() {
  const [searchedData, setSearchedData] = useState(undefined);
  const [tvs, setTvs] = useState(undefined);
  const [movies, setMovies] = useState(undefined);
  const [tab, setTab] = useState('movie');
  const [page, setPage] = useState(undefined);
  const location = useLocation();
  let keyword = new URLSearchParams(location.search).get('keyword');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=ko&query=${keyword}&page=${page ? page : '1'}`,
    )
      .then(res => res.json())
      .then(json => setSearchedData(json));
  }, [keyword]);

  useEffect(() => {
    setTvs(searchedData?.results.filter(result => result.media_type === 'tv'));
    setMovies(searchedData?.results.filter(result => result.media_type === 'movie'));
  }, [searchedData, keyword]);

  return (
    <>
      {searchedData ? (
        <>
          <Title>
            <strong>"</strong>
            <em>{keyword}</em>
            <strong>"</strong>
            <span>
              검색 결과가&nbsp;
              <em>
                {tab === 'movie'
                  ? movies?.length > 0
                    ? `${movies?.length}`
                    : ''
                  : tvs?.length > 0
                  ? `${tvs?.length}`
                  : ''}
              </em>
            </span>
            <span>
              {tab === 'movie'
                ? movies?.length > 0
                  ? `개 있습니다.`
                  : '없습니다.'
                : tvs?.length > 0
                ? `개 있습니다.`
                : '없습니다.'}
            </span>
          </Title>
          <Tabs>
            <Tab onClick={() => setTab('movie')} tabMatch={tab === 'movie' ? true : false}>
              영화
            </Tab>
            <Tab onClick={() => setTab('tv')} tabMatch={tab === 'tv' ? true : false}>
              TV쇼
            </Tab>
          </Tabs>
          <Contents>
            {tab === 'movie' ? (
              <Grid>
                {movies?.map(movie => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <InfoBox
                      bgUrl={movie.backdrop_path ? makeImgPath(movie.backdrop_path, 'w500') : null}
                      name={movie.title}
                      voteAverage={movie.vote_average}
                      firstDate={movie.release_date}
                    ></InfoBox>
                  </Link>
                ))}
              </Grid>
            ) : (
              <Grid>
                {tvs?.map(tv => (
                  <Link key={tv.id} to={`/tv/${tv.id}`}>
                    <InfoBox
                      bgUrl={tv.backdrop_path ? makeImgPath(tv.backdrop_path, 'w500') : null}
                      name={tv.name}
                      voteAverage={tv.vote_average}
                      firstDate={tv.first_air_date}
                    ></InfoBox>
                  </Link>
                ))}
              </Grid>
            )}
          </Contents>
        </>
      ) : null}
    </>
  );
}
