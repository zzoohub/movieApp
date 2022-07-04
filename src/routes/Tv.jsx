import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  height: 200vh;
  width: 100%;
`;
const Main = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 100px;
`;
const Title = styled.h2`
  text-align: center;
  color: #ff3d3d;
  font-size: 24px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: max-content;
  padding: 10px;
`;
const Banner = styled.section`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bannerImg});
  background-position: center;
  background-size: cover;
`;
const TvItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;
const TvItemImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  svg {
    width: 70px;
    height: 70px;
    color: gray;
  }
`;

export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "airingToday"], getTvAiringToday);
  const bannerData = data?.results.find((result) => result.backdrop_path);
  const fitered = data?.results.filter(
    (result) => result.backdrop_path !== bannerData.backdrop_path
  );

  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Main>
          <Title>오늘 하는 방송</Title>
          <Banner bannerImg={makeImgPath(bannerData?.backdrop_path)}>
            {bannerData?.original_name}
          </Banner>
          <Grid>
            {fitered.map((tv) => (
              <Link to={`/tv/${tv.id}`} key={tv.id}>
                <TvItem>
                  <TvItemImg bgImg={makeImgPath(tv.backdrop_path || "")}>
                    {tv.backdrop_path ? null : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </TvItemImg>
                  <h1>{tv.name}</h1>
                </TvItem>
              </Link>
            ))}
          </Grid>
        </Main>
      )}
    </Wrapper>
  );
}
