import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/global/NotFound";
//전달받은 파라미터 값을 확인하기 위해

import { IParams } from "./utils/TypeScript";

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

function PageRender() {
  // 아하, app.tsx에 path 경로를 /:page/:slug 로 지정해서 그런듯?
  const { page, slug }: IParams = useParams();

  let name = "";
  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
  }

  return generatePage(name);
}

export default PageRender;
