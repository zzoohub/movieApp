import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday, getTopRatedTvs } from "../api";
import SlideMulti from "../components/multiSlider";
// import PopularTV from "../components/PopularTV";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";
import { ReactComponent as MoreBtn } from "../images/more_btn.svg";
import InfiniteSlide from "../components/InfiniteSlide";

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
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
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
    align-items: flex-start;
    h3 {
      word-break: keep-all;
      font-size: 56px;
      font-weight: bold;
      margin-bottom: 10px;
      max-width: 70%;
      line-height: 1.3;
    }
    .moreBtn {
      margin-left: 20px;
      margin-top: 10px;
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
`;
const TopRated = styled.section`
  width: 100%;
  height: 300px;
  margin-top: 30px;
`;
const TopTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: gold;
  margin: 20px 50px;
  em {
    font-size: 24px;
    margin-left: 10px;
    color: #f9f9f9;
  }
`;
const PopularTV = styled.section`
  width: 100%;
  height: 250px;
  margin-top: 30px;
`;
const OnTheAir = styled(PopularTV)`
  margin-bottom: 50px;
`;
const Trending = styled(PopularTV)``;
const AiringToday = styled(PopularTV)``;

export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "airingToday"], getTvAiringToday);
  const { data: topRateData, isLoading: topRateisLoading } = useQuery(
    ["tv", "topRated"],
    getTopRatedTvs
  );
  const bannerData = data?.results.find(
    (result) => result.backdrop_path && result.overview
  );
  const fitered = data?.results.filter(
    (result) => result.backdrop_path !== bannerData.backdrop_path
  );
  // console.log(topRateData);
  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <Main>
            <Banner bannerImg={makeImgPath(bannerData?.backdrop_path)}>
              <div>
                <h3>{bannerData?.name}</h3>
                <Link to={`/tv/${bannerData?.id}`} className="moreBtn">
                  <MoreBtn width={50} fill={"#ff3d3d"} />
                </Link>
              </div>
              <span>첫방송 {bannerData.first_air_date}</span>
              <span>평점 {bannerData.vote_average}</span>
              <p>
                {bannerData?.overview.length > 200
                  ? bannerData?.overview.slice(0, 200) + "..."
                  : bannerData?.overview}
              </p>
            </Banner>
            <TopRated>
              <TopTitle>
                TOP 20<em>TV</em>
              </TopTitle>
              <SlideMulti
                offset={5}
                data={topRateData?.results}
                type="tv"
              ></SlideMulti>
            </TopRated>
            <Trending>
              <Title>Weekly Trending</Title>
              <InfiniteSlide
                url={`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
                offset={5}
                gap={10}
              ></InfiniteSlide>
            </Trending>
            <PopularTV>
              <Title>Popular TV</Title>
              <InfiniteSlide
                url={`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
                offset={5}
                gap={10}
              ></InfiniteSlide>
            </PopularTV>
            <OnTheAir>
              <Title>On The Air</Title>
              <InfiniteSlide
                url={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
                offset={5}
                gap={10}
              ></InfiniteSlide>
            </OnTheAir>
            <AiringToday>
              <Title>Airing Today</Title>
              <InfiniteSlide
                url={`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
                offset={5}
                gap={10}
              ></InfiniteSlide>
            </AiringToday>
          </Main>
        </Wrapper>
      )}
    </>
  );
}
