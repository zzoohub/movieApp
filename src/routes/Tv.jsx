import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday } from "../api";
import InfoBox from "../components/InfoBox";
import PopularTV from "../components/PopularTV";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";
import { ReactComponent as MoreBtn } from "../images/arrow-up-right-from-square-solid.svg";

const Wrapper = styled.div`
  height: max-content;
  width: 100%;
  background-color: #111c26;
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
  position: relative;
  justify-content: flex-end;
  flex-direction: column;
  padding: 50px;
  width: 100%;
  height: 85vh;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.1), #111c26),
    url(${(props) => props.bannerImg});
  background-position: center;
  background-size: cover;
  color: #f9f9f9;
  div {
    display: flex;
    align-items: center;
    h3 {
      font-size: 56px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .moreBtn {
      margin-left: 30px;
      svg:hover {
        transform: scale(1.05);
      }
    }
  }
  span {
    margin: 10px 0px;
    font-size: 18px;
    font-weight: 600;
    max-width: 50%;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.7;
    width: 50%;
  }
  video {
    position: absolute;
    top: 25%;
    left: 50%;
    width: 750px;
    height: 450px;
    background-color: #333;
    object-fit: cover;
    border-radius: 10px;
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

export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "airingToday"], getTvAiringToday);
  const bannerData = data?.results.find(
    (result) => result.backdrop_path && result.overview
  );
  const fitered = data?.results.filter(
    (result) => result.backdrop_path !== bannerData.backdrop_path
  );

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <Main>
            <Banner bannerImg={makeImgPath(bannerData?.backdrop_path)}>
              <div>
                <h3>{bannerData?.original_name}</h3>
                <Link to={`/tv/${bannerData?.id}`} className="moreBtn">
                  <MoreBtn width={40} fill={"#ff3d3d"} />
                </Link>
              </div>
              <span>첫방송 {bannerData.first_air_date}</span>
              <span>평점 {bannerData.vote_average}</span>
              <p>{bannerData?.overview}</p>
            </Banner>
            <Title>Today Tv Shows</Title>
            <Grid>
              {fitered.map((tv) => (
                <Link to={`/tv/${tv.id}`} key={tv.id}>
                  <InfoBox
                    bgUrl={
                      tv.backdrop_path
                        ? makeImgPath(tv.backdrop_path, "w500")
                        : null
                    }
                    name={tv.name}
                    firstDate={tv.first_air_date}
                    voteAverage={tv.vote_average}
                  ></InfoBox>
                </Link>
              ))}
            </Grid>
            <PopularTV />
          </Main>
        </Wrapper>
      )}
    </>
  );
}
