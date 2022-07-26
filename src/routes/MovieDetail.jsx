import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, getSimilarMovies } from "../api";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";
import InfoBox from "../components/InfoBox";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const Main = styled.main`
  position: relative;
  display: flex;
  max-width: 1920px;
  margin: 0 auto;
`;
const Banner = styled.section`
  position: fixed;
  top: 0%;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bannerImg});
  background-position: center;
  background-size: cover;
`;
const DetailInfo = styled.section`
  position: relative;
  width: 100%;
  height: max-content;
  margin-top: 100px;
  padding: 50px;
  color: #f9f9f9;
  iframe {
    position: absolute;
    top: 12%;
    left: 60%;
    width: 580px;
    height: 340px;
    background-color: #333;
    object-fit: cover;
  }
`;
const Title = styled.h2`
  margin-top: 50px;
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 30px;
  max-width: 50%;
  line-height: 1.2;
  word-break: keep-all;
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Ban = styled.div`
  position: absolute;
  right: 5%;
  top: 5%;
  background-color: red;
  color: #333;
  font-size: 24px;
  padding: 10px;
  border-radius: 50%;
`;
const MoreDetail = styled.div`
  display: flex;
  flex-direction: column;
  strong {
    margin: 15px 0px 10px 0px;
    font-size: 16px;
  }
`;
const BaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
`;
const Creator = styled.ul`
  display: flex;
  li {
    display: flex;
    align-items: center;
    /* width: 100px; */
    margin-right: 20px;
    img,
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      svg {
        width: 40px;
        height: 40px;
      }
    }
    span {
      /* overflow: hidden; */
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 5px;
    }
  }
`;
const CreatorWrap = styled.div`
  display: flex;
  align-items: center;
  strong {
    margin-right: 10px;
  }
`;
const Genre = styled.ul`
  display: flex;
  margin: 10px 0px;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
    padding: 7px;
    border-radius: 2px;
    margin-right: 10px;
    color: #f9f9f9;
    border: 1px solid #f9f9f9;
  }
`;
const Period = styled.span``;
const Rating = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }
  svg {
    width: 30px;
    height: 30px;
    color: gold;
  }
`;
const LikeBtn = styled.em`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 20px;
  margin-top: 10px;
  cursor: pointer;
  :active {
    transform: scale(0.96);
  }
  span {
    position: relative;
    top: 1px;
    color: #f9f9f9;
    font-weight: bold;
    font-size: 16px;
  }
  svg:hover {
    transform: scale(1.05);
  }
`;
const ShareBtn = styled(LikeBtn)``;
const Overview = styled.p`
  max-width: 50%;
  line-height: 1.5;
  margin-top: 15px;
`;
const SimilarTitle = styled.h2`
  font-size: 20px;
  color: #f9f9f9;
  font-weight: bold;
  margin-top: 100px;
  padding-bottom: 10px;
  border-bottom: 1px solid #94979e;
`;
const SimilarMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 40px;
  width: 100%;
  margin-top: 15px;
`;

export default function TvDetail() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(["movie", "detail"], () =>
    getMovieDetail(id)
  );
  const {
    data: similarData,
    isLoading: similarLoading,
    refetch: similarRefetch,
  } = useQuery(["movie", "similar"], () => getSimilarMovies(id));
  const [video, setVideo] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      return alert("로그인이 필요합니다.");
    }
    const aleadyLiked = loginUser.like.movie.find((value) => value === id);
    if (aleadyLiked) {
      const removed = loginUser.like.movie.filter((value) => value !== id);
      loginUser.like.movie = removed;
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      localStorage.setItem("user", JSON.stringify(loginUser));
      setIsLiked(false);
    } else {
      loginUser.like.movie = [...loginUser.like.movie, id];
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      localStorage.setItem("user", JSON.stringify(loginUser));
      setIsLiked(true);
    }
  };

  useEffect(() => {
    refetch();
    similarRefetch();
    setIsLiked(false);
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const aleadyLiked = loginUser?.like?.movie?.find((value) => value === id);
    if (aleadyLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.results[0]) {
          setVideo(json.results[0].key);
        } else {
          setVideo("");
        }
      });
  }, [id]);
  return (
    <>
      {isLoading || similarLoading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <Main>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Banner bannerImg={makeImgPath(data?.backdrop_path)}></Banner>
                <DetailInfo>
                  {data?.adult ? <Ban>19금</Ban> : null}
                  <TitleWrap>
                    <Title>{data?.title}</Title>
                    <LikeBtn
                      onClick={toggleLike}
                      color={isLiked ? "gold" : "gray"}
                    >
                      {!isLiked ? (
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2913 13.5104L23.9992 14.2182L24.7063 13.5096L26.3469 11.8653C26.347 11.8652 26.3471 11.8651 26.3472 11.865C30.1625 8.05009 36.3389 8.0502 40.1541 11.8653C43.9606 15.6719 43.9571 21.8267 40.1563 25.65C40.1559 25.6505 40.1554 25.651 40.1549 25.6515L24.3543 41.4429L24.3541 41.4431C24.1588 41.6384 23.8422 41.6384 23.6469 41.4431L7.85621 25.6525C4.04858 21.8448 4.04859 15.6715 7.8562 11.8639L7.8562 11.8639C11.6638 8.05625 17.8372 8.05626 21.6447 11.8639L21.6447 11.8639L23.2913 13.5104Z"
                            stroke="white"
                            stroke-width="2"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2913 13.5104L23.9992 14.2182L24.7063 13.5096L26.3469 11.8653C26.347 11.8652 26.3471 11.8651 26.3472 11.865C30.1625 8.05009 36.3389 8.0502 40.1541 11.8653C43.9606 15.6719 43.9571 21.8267 40.1563 25.65C40.1559 25.6505 40.1554 25.651 40.1549 25.6515L24.3543 41.4429L24.3541 41.4431C24.1588 41.6384 23.8422 41.6384 23.6469 41.4431L7.85621 25.6525C4.04858 21.8448 4.04859 15.6715 7.8562 11.8639L7.8562 11.8639C11.6638 8.05625 17.8372 8.05626 21.6447 11.8639L21.6447 11.8639L23.2913 13.5104Z"
                            fill="white"
                            stroke="white"
                            stroke-width="2"
                          />
                        </svg>
                      )}
                      <span>찜</span>
                    </LikeBtn>
                    <ShareBtn>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="35"
                          cy="12"
                          r="6"
                          stroke="white"
                          stroke-width="2"
                        />
                        <circle
                          cx="35"
                          cy="36"
                          r="6"
                          stroke="white"
                          stroke-width="2"
                        />
                        <circle
                          cx="14"
                          cy="24"
                          r="6"
                          stroke="white"
                          stroke-width="2"
                        />
                        <path
                          d="M18.5001 20.4998L29.4904 14.134"
                          stroke="white"
                          stroke-width="2"
                        />
                        <path
                          d="M30.4904 33.6338L19 27"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                      <span>공유</span>
                    </ShareBtn>
                  </TitleWrap>
                  <MoreDetail>
                    {video ? (
                      <iframe
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`}
                        frameBorder="0"
                        autoPlay
                      ></iframe>
                    ) : null}
                    <BaseInfo>
                      <Period>
                        {data.release_date} 개봉 &nbsp;|&nbsp;&nbsp;총{" "}
                        {data.runtime}분
                      </Period>
                      <Genre>
                        {data.genres.map((genre) => (
                          <li key={genre.name}>{genre.name}</li>
                        ))}
                      </Genre>
                      <Rating>
                        <span>
                          평점:&nbsp;&nbsp;{Math.round(data.vote_average) / 2}
                        </span>
                        {/* {[1, 2, 3, 4, 5].map((index) =>
                          Math.round(data.vote_average) / 2 >= index ? (
                            <svg
                              key={index}
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ) : null
                        )} */}
                      </Rating>

                      {data?.production_companies[0] !== undefined ? (
                        <CreatorWrap>
                          <strong>제작사:</strong>
                          <Creator>
                            {data?.production_companies.map((company) => (
                              <li key={company.id}>
                                <span>{company.name}</span>
                              </li>
                            ))}
                          </Creator>
                        </CreatorWrap>
                      ) : null}
                      <Overview>
                        {data.overview.length < 250
                          ? data.overview
                          : data.overview.slice(0, 250) + "..."}
                      </Overview>
                    </BaseInfo>
                    <SimilarTitle>비슷한 영화</SimilarTitle>
                    <SimilarMovies>
                      {similarData?.results.slice(0, 5).map((result) => (
                        <Link key={result.id} to={`/movies/${result.id}`}>
                          <InfoBox
                            bgUrl={
                              result.backdrop_path
                                ? makeImgPath(result.backdrop_path, "w500")
                                : null
                            }
                            name={result.title}
                            voteAverage={result.vote_average}
                            firstDate={result.release_date}
                          ></InfoBox>
                        </Link>
                      ))}
                    </SimilarMovies>
                  </MoreDetail>
                </DetailInfo>
              </>
            )}
          </Main>
        </Wrapper>
      )}
    </>
  );
}
