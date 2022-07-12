import styled from "styled-components";
import { useUser } from "../util/useUser";
import env from "react-dotenv";
import { useEffect, useState } from "react";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  min-height: 100vh;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  width: 70%;
  height: 200px;
  margin: 0 auto;
  max-width: 1080px;
  background-color: #333;
`;
const Item = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-size: cover;
  background-color: gold;
`;
export default function Favorits() {
  const { user } = useUser();
  const [tvs, setTvs] = useState([]);

  function fetchLoop() {
    if (user?.like?.tv) {
      for (const tv of user?.like?.tv) {
        fetch(
          `https://api.themoviedb.org/3/tv/${tv}?api_key=${env.API_KEY}&language=ko`
        )
          .then((res) => res.json())
          .then((json) => setTvs((old) => [...old, json]));
      }
    }
  }
  console.log(tvs);

  useEffect(() => {
    fetchLoop();
  }, [user?.like?.tv]);
  return (
    <Wrapper>
      <Grid>
        {tvs[0]
          ? tvs?.map((tv) => (
              <Item
                key={tv.id}
                bgUrl={
                  tv.backdrop_path
                    ? makeImgPath(tv.backdrop_path, "w500")
                    : "no"
                }
              ></Item>
            ))
          : null}
      </Grid>
    </Wrapper>
  );
}
