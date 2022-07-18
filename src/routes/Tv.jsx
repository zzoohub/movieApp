import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTvAiringToday } from "../api";
import InfoBox from "../components/InfoBox";
import OnTheAiringTV from "../components/OnTheAiringTV";
import PopularTV from "../components/PopularTV";
import LatestTV from "../components/LatestTV";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";
import { ReactComponent as MoreBtn } from "../images/arrow-up-right-from-square-solid.svg";
import { useState, useEffect } from "react";

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
  position: relative;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  width: 100%;
  height: 85vh;
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
  .moreBtn {
    position: relative;
    left: 180px;
    top: -80px;
    svg:hover {
      transform: scale(1.1);
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
  const [mp4, setMp4] = useState();
  useEffect(() => {
    fetch(`https://dogs-api.nomadcoders.workers.dev`)
      .then((res) => res.json())
      .then((json) => setMp4(json));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <Main>
            <Banner bannerImg={makeImgPath(bannerData?.backdrop_path)}>
              <h3>{bannerData?.original_name}</h3>
              <span>첫방송 {bannerData.first_air_date}</span>
              <span>평점 {bannerData.vote_average}</span>
              <p>{bannerData?.overview}</p>
              <Link to={`/tv/${bannerData?.id}`} className="moreBtn">
                <MoreBtn width={20} fill={"#ff3d3d"} />
              </Link>
              <video src={mp4 ? mp4.url : ""} autoPlay controls></video>
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
            <OnTheAiringTV />
            <PopularTV />
            <LatestTV />
          </Main>
        </Wrapper>
      )}
    </>
  );
}
