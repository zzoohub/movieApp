import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getTvDetail } from "../api";
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
  padding: 15px;
  color: #f9f9f9;
`;
const Title = styled.h2`
  font-size: 58px;
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
`;
const Creator = styled.ul`
  display: flex;
  li {
    display: flex;
    flex-direction: column;
    img {
      display: block;
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;
const Genre = styled.ul`
  display: flex;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
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

export default function TvDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["tv", "detail"], () => getTvDetail(id));
  console.log(data);

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
              <Overview>{data.overview}</Overview>
              <strong>장르</strong>
              <Genre>
                {data.genres.map((genre) => (
                  <li>{genre.name}</li>
                ))}
              </Genre>
              <MoreDetail>
                <Period>
                  방영기간 {data.first_air_date} ~ {data.last_air_date}
                </Period>
                <span>총 {data.number_of_episodes}부작</span>
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
                <Creator>
                  {data?.created_by.map((person) => (
                    <li key={person.id}>
                      <img
                        src={
                          person.profile_path
                            ? makeImgPath(person.profile_path, "w500")
                            : null
                        }
                        alt=""
                      />
                      <span>{person.name}</span>
                    </li>
                  ))}
                </Creator>
              </MoreDetail>
            </DetailInfo>
          </>
        )}
      </Main>
    </Wrapper>
  );
}
