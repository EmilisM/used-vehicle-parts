import * as React from "react";
import useFetch from "../Utils/useFetch";

import { Model, api } from '../Constants/api';

const Home = () => {
    const [models] = useFetch<Model[]>(api.model, {});

    return <div>{models && models.map(model => <div>{model.id} {model.name} {model.make.name}</div>)}</div>;
};

export default Home;
