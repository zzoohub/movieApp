import styled from "styled-components";

const TvItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  border: ${(props) =>
    props.bgUrl === "border" ? "1px solid #d9d9d9" : "none"};
  transition: all ease-in-out 0.2s;
  :hover {
    transform: scale(1.03);
  }
  svg {
    width: 80px;
    height: 80px;
    color: gray;
  }
`;

const Title = styled.h2`
  color: #d9d9d9;
  position: absolute;
  bottom: -30px;
  left: 0px;
  width: max-content;
  max-width: 100%;
  font-size: 14px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

export default function InfoBox({ bgUrl, name, firstDate, voteAverage }) {
  return (
    <TvItem bgImg={bgUrl ? bgUrl : "border"}>
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

      <Title>{name}</Title>
    </TvItem>
  );
}
