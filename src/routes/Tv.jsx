import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday } from "../api";
import SlideMulti from "../components/multiSlider";
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
`;
const TopRated = styled.section`
  width: 100%;
  height: 250px;
  margin-top: 30px;
  height: 300px;
  margin-top: 30px;
`;
const TopTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: #ff3d3d;
  margin: 20px 50px;
  em {
    font-size: 24px;
    margin-left: 10px;
    color: #f9f9f9;
  }
`;
export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "airingToday"], getTvAiringToday);
  // const { data, isLoading } = useQuery(["tv", "topRatedT"], getTopRatedTvs);
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
            {/* <TopRated>
              <TopTitle>
                TOP 20<em>Movies</em>
              </TopTitle>
              <SlideMulti offset={5} data={topRated?.results}></SlideMulti>
            </TopRated>
            <PopularTV /> */}
          </Main>
        </Wrapper>
      )}
    </>
  );
}
