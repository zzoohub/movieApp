import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopulaTvs } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  height: 200vh;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
  width: 100%;
  height: max-content;
  margin-top: 150px;
`;
const Movie = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;
const MovieImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export default function Tv() {
  const { data, isLoading } = useQuery(["tv", "popula"], () => getPopulaTvs(1));
  console.log(data?.results);
  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Grid>
          {data?.results.map((movie) => (
            <Movie key={movie.id}>
              <MovieImg bgImg={makeImgPath(movie.backdrop_path || "")}>
                {movie.backdrop_path ? null : (
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
              </MovieImg>
              <h1>{movie.name}</h1>
            </Movie>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}
