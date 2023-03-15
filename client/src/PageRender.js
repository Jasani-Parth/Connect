import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/NotFound";

const generatePage = (pageName) => {
  //   console.log(pageName);
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = page;

  if (id) {
    pageName = pageName.concat(`/${id}`);
  }
  //   console.log(pageName);

  return generatePage(pageName);
};

export default PageRender;
