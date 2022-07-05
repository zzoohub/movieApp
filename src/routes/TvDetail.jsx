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

  background: linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bannerImg});
  background-position: center;
  background-size: cover;
`;
const Title = styled.h2``;
const Period = styled.span``;
const Vote = styled.span``;

export default function TvDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["tv", "detail"], () => getTvDetail(id));

  return (
    <Wrapper>
      <Main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Banner bannerImg={makeImgPath(data.backdrop_path)}></Banner>
        )}
      </Main>
    </Wrapper>
  );
}
