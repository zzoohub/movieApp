import styled from "styled-components";

const TvItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  overflow: hidden;
  background-color: #071626;
  border-style: outset;
  transition: all ease-in-out 0.2s;
  box-shadow: 0px 15px 12px -5px rgba(0, 0, 0, 0.4);
  :hover {
    transform: scale(1.04);
  }
`;
const TvItemImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 180px;
  border-bottom: ${(props) =>
    props.bgImg === "border" ? "1px solid gray" : "none"};
  svg {
    width: 70px;
    height: 70px;
    color: gray;
  }
`;
const SubInfo = styled.div`
  padding: 10px 8px;
  h3 {
    font-weight: 600;
    color: #d9d9d9;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  font-size: 12px;
  color: #d9d9d9;
`;

export default function InfoBox({ bgUrl, name, firstDate, voteAverage }) {
  return (
    <TvItem>
      <TvItemImg bgImg={bgUrl ? bgUrl : "border"}>
        {bgUrl ? null : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </TvItemImg>
      <SubInfo>
        <h3>{name}</h3>
        <Flex>
          <span>{firstDate}</span>
          <span>평점 {voteAverage}</span>
        </Flex>
      </SubInfo>
    </TvItem>
  );
}
