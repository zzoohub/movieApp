import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  height: max-content;
  width: 100%;
`;
const Main = styled.main`
  max-width: 1920px;
  margin: 0 auto;
`;
const Title = styled.h2`
  color: #ff3d3d;
  font-weight: bold;
  font-size: 22px;
  margin: 30px 0px 0px 20px;
`;
const Banner = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  width: 100%;
  height: 70vh;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.7)
    ),
    url(${(props) => props.bannerImg});
  background-position: center;
  background-size: cover;
  color: #f9f9f9;
  h3 {
    font-size: 56px;
    margin-bottom: 10px;
  }
  span {
    margin: 10px 0px;
    font-size: 18px;
    font-weight: 600;
    max-width: 50%;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
  width: 100%;
  margin: auto;
  height: max-content;
  padding: 15px;
`;
const TvItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  overflow: hidden;
  background-color: #222;
  border-radius: 10px;
  border-style: outset;
  border: 3px solid transparent;
  transition: all ease-in-out 0.1s;
  :hover {
    transform: scale(1.02);
    border: 3px solid #d9d9d9;
  }
`;
const TvItemImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  border-bottom: ${(props) =>
    props.bgImg === "border" ? "1px solid gray" : "none"};
  svg {
    width: 70px;
    height: 70px;
    color: gray;
  }
`;
const SubInfo = styled.div`
  padding: 7px;
  h3 {
    font-weight: 600;
    color: #d9d9d9;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  font-size: 12px;
  color: #d9d9d9;
`;

export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "airingToday"], getTvAiringToday);
  const bannerData = data?.results.find((result) => result.backdrop_path);
  const fitered = data?.results.filter(
    (result) => result.backdrop_path !== bannerData.backdrop_path
  );
  console.log(fitered);

  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Main>
          <Banner bannerImg={makeImgPath(bannerData?.backdrop_path)}>
            <h3>{bannerData?.original_name}</h3>
            <span>첫방송 {bannerData.first_air_date}</span>
            <span>평점 {bannerData.vote_average}</span>
            <span>{bannerData?.overview}</span>
          </Banner>
          <Title>Today Tv Shows</Title>
          <Grid>
            {fitered.map((tv) => (
              <Link to={`/tv/${tv.id}`} key={tv.id}>
                <TvItem>
                  <TvItemImg
                    bgImg={
                      tv.backdrop_path
                        ? makeImgPath(tv.backdrop_path, "w500")
                        : "border"
                    }
                  >
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
                  <SubInfo>
                    <h3>{tv.name}</h3>
                    <Flex>
                      <span>{tv.first_air_date}</span>
                      <span>평점 {tv.vote_average}</span>
                    </Flex>
                  </SubInfo>
                </TvItem>
              </Link>
            ))}
          </Grid>
        </Main>
      )}
    </Wrapper>
  );
}
