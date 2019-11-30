import * as React from "react";
import { useMakePost } from "../Api/api";

const Home = () => {
  const { mutate } = useMakePost({});

  const postMake = () => {
    mutate({ id: 0, name: "test from front" }).then(res => console.log(res));
  };

  return (
    <div>
      <button onClick={postMake}>Post</button>
    </div>
  );
};

export default Home;
