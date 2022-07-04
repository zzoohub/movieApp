import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTvDetail } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const Main = styled.main`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 120px;
  padding: 10px;
`;
const BaseInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const DetailInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Title = styled.h2``;
const Period = styled.span``;
const Vote = styled.span``;
export default function TvDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["tv", "detail"], () => getTvDetail(id));
  console.log(data);
  return (
    <Wrapper>
      <Main>
        <BaseInfo>
          <img src={makeImgPath(data?.backdrop_path)}></img>
          <Title>{data?.original_name}</Title>
          <Period>
            {data?.first_air_date} ~ {data?.last_air_date}
          </Period>
          <Vote>
            평점 {data?.vote_average} / {data?.vote_count}명
          </Vote>
        </BaseInfo>
        <DetailInfo></DetailInfo>
      </Main>
    </Wrapper>
  );
}
