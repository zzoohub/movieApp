import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getSimilarTvs, getTvDetail } from "../api";
import { makeImgPath } from "../util/makeImgPath";

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
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
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
`;
const Title = styled.h2`
  margin-top: 50px;
  font-size: 77px;
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
const Creator = styled.ul`
  display: flex;
  li {
    display: flex;
    flex-direction: column;
    width: 100px;
    margin-right: 10px;
    img,
    div {
      display: block;
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
      background-color: #333;
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
const Overview = styled.p`
  max-width: 50%;
`;
const SimilarTitle = styled.h2`
  font-size: 22px;
  color: #ff3d3d;
  font-weight: bold;
  margin-top: 100px;
`;
const SimilarTvsWrap = styled.div`
  width: 100%;
  overflow-x: scroll;
  height: 200px;
`;
const SimilarTvs = styled.div`
  display: flex;
  gap: 15px;
  width: max-content;
  padding: 0px 10px;
  margin-top: 20px;
`;
const SimilarTv = styled.div`
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
const SimilarTvImg = styled.div`
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  background-size: cover;
`;
const SimilarTvName = styled.h3`
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
  const { data, isLoading, refetch } = useQuery(["tv", "detail"], () =>
    getTvDetail(id)
  );
  const {
    data: similarData,
    isLoading: similarLoading,
    refetch: similarRefetch,
  } = useQuery(["tv", "similar"], () => getSimilarTvs(id));

  useEffect(() => {
    refetch();
    similarRefetch();
  }, [id]);

  return (
    <Wrapper>
      <Main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Banner bannerImg={makeImgPath(data?.backdrop_path)}></Banner>
            <DetailInfo>
              {data?.adult ? <Ban>19금</Ban> : null}
              <Title>{data?.name}</Title>

              <MoreDetail>
                <Period>
                  {data.first_air_date} ~ {data.last_air_date}{" "}
                  &nbsp;&nbsp;&nbsp;총 {data.number_of_episodes}회
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
                </Rating>

                {data?.created_by[0] !== undefined ? (
                  <>
                    <strong>연출</strong>
                    <Creator>
                      {data?.created_by.map((person) => (
                        <li key={person.id}>
                          {person.profile_path ? (
                            <img
                              src={makeImgPath(person.profile_path, "w500")}
                              alt=""
                            />
                          ) : (
                            <div className="img"></div>
                          )}
                          <span>{person.name}</span>
                        </li>
                      ))}
                    </Creator>
                  </>
                ) : null}
                <Overview>{data.overview}</Overview>
                <SimilarTitle>비슷한 TV쇼</SimilarTitle>
                <SimilarTvsWrap>
                  <SimilarTvs>
                    {similarData?.results.map((result) => (
                      <Link key={result.id} to={`/tv/${result.id}`}>
                        <SimilarTv>
                          <SimilarTvImg
                            bgImg={
                              result.backdrop_path
                                ? makeImgPath(result.backdrop_path, "w500")
                                : "null"
                            }
                          ></SimilarTvImg>
                          <SimilarTvName>{result.name}</SimilarTvName>
                        </SimilarTv>
                      </Link>
                    ))}
                  </SimilarTvs>
                </SimilarTvsWrap>
              </MoreDetail>
            </DetailInfo>
          </>
        )}
      </Main>
    </Wrapper>
  );
}
