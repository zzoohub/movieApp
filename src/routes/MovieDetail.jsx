import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, getSimilarMovies } from "../api";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";

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
  video {
    position: absolute;
    top: 17%;
    left: 55%;
    width: 500px;
    height: 300px;
    background-color: #333;
    object-fit: cover;
  }
`;
const Title = styled.h2`
  margin-top: 50px;
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 30px;
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
    margin: 20px 0px 10px 0px;
    font-size: 18px;
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
    flex-direction: column;
    width: 100px;
    margin-right: 10px;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 5px;
    }
  }
`;
const Genre = styled.ul`
  display: flex;
  margin: 10px 0px;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9d9d9;
    padding: 5px;
    border-radius: 2px;
    margin-right: 10px;
    color: #333;
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
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.color === "gold" ? "gold" : "#d9d9d9")};
  padding: 7px 10px;
  border-radius: 5px;
  margin-left: 30px;
  border: 1px solid gold;
  cursor: pointer;
  :active {
    transform: scale(0.96);
  }
  :hover {
    background-color: #ecc800;
  }
  span {
    color: #333;
    font-weight: bold;
    font-size: 16px;
  }
  svg {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }
`;
const Overview = styled.p`
  max-width: 50%;
  line-height: 1.5;
  margin-top: 15px;
`;
const SimilarTitle = styled.h2`
  font-size: 20px;
  color: #ff3d3d;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 20px;
`;
const SimilarMoviesWrap = styled.div`
  width: 100%;
  overflow-x: scroll;
  height: 200px;
`;
const SimilarMovies = styled.div`
  display: flex;
  gap: 15px;
  width: max-content;
  padding: 0px 10px;
  margin-top: 15px;
`;
const SimilarMovie = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  background-color: transparent;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #f9f9f9;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  overflow: hidden;
  :hover {
    transform: scale(1.03);
    border: 3px solid #ff3d3d;
  }
  :hover h3 {
    bottom: 0px;
  }
`;
const SimilarMovieImg = styled.div`
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  background-size: cover;
`;
const SimilarMovieName = styled.h3`
  position: absolute;
  bottom: -50px;
  width: 100%;
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #f9f9f9;
  padding: 5px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all ease-in-out 0.2s;
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
  const [mp4, setMp4] = useState();
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
    fetch(`https://dogs-api.nomadcoders.workers.dev`)
      .then((res) => res.json())
      .then((json) => setMp4(json));
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const aleadyLiked = loginUser?.like?.movie?.find((value) => value === id);
    if (aleadyLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
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
                  <Title>{data?.title}</Title>
                  <MoreDetail>
                    <video src={mp4 ? mp4.url : ""} autoPlay controls></video>
                    <BaseInfo>
                      <Period>
                        {data.release_date} 개봉 &nbsp;&nbsp;&nbsp;총{" "}
                        {data.runtime}분
                      </Period>
                      <Genre>
                        {data.genres.map((genre) => (
                          <li key={genre.name}>{genre.name}</li>
                        ))}
                      </Genre>
                      <Rating>
                        <span>평점</span>
                        {[1, 2, 3, 4, 5].map((index) =>
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
                        )}
                        <LikeBtn
                          onClick={toggleLike}
                          color={isLiked ? "gold" : "gray"}
                        >
                          <span>Like</span>
                          {!isLiked ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                            >
                              <path d="M204.3 32.01H96c-52.94 0-96 43.06-96 96c0 17.67 14.31 31.1 32 31.1s32-14.32 32-31.1c0-17.64 14.34-32 32-32h108.3C232.8 96.01 256 119.2 256 147.8c0 19.72-10.97 37.47-30.5 47.33L127.8 252.4C117.1 258.2 112 268.7 112 280v40c0 17.67 14.31 31.99 32 31.99s32-14.32 32-31.99V298.3L256 251.3c39.47-19.75 64-59.42 64-103.5C320 83.95 268.1 32.01 204.3 32.01zM144 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S166.1 400 144 400z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="#ff3d3d"
                            >
                              <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                            </svg>
                          )}
                        </LikeBtn>
                      </Rating>

                      {data?.production_companies[0] !== undefined ? (
                        <>
                          <strong>제작사</strong>
                          <Creator>
                            {data?.production_companies.map((company) => (
                              <li key={company.id}>
                                {company.logo_path ? (
                                  <img
                                    src={makeImgPath(company.logo_path, "w500")}
                                    alt=""
                                  />
                                ) : (
                                  <div className="img">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <span>{company.name}</span>
                              </li>
                            ))}
                          </Creator>
                        </>
                      ) : null}
                      <Overview>
                        {data.overview.length < 150
                          ? data.overview
                          : data.overview.slice(0, 150) + "..."}
                      </Overview>
                    </BaseInfo>
                    <SimilarTitle>비슷한 영화</SimilarTitle>
                    <SimilarMoviesWrap>
                      <SimilarMovies>
                        {similarData?.results.map((result) => (
                          <Link key={result.id} to={`/movies/${result.id}`}>
                            <SimilarMovie>
                              <SimilarMovieImg
                                bgImg={
                                  result.backdrop_path
                                    ? makeImgPath(result.backdrop_path, "w500")
                                    : "null"
                                }
                              ></SimilarMovieImg>
                              <SimilarMovieName>
                                {result.title}
                              </SimilarMovieName>
                            </SimilarMovie>
                          </Link>
                        ))}
                      </SimilarMovies>
                    </SimilarMoviesWrap>
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
