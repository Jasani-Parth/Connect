import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  // console.log(pageName);
  // console.log(`./pages/${pageName}`);
  const component = () => require(`../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let pageName = "";
  if (auth.token) {
    pageName = page;
    if (id) {
      pageName = pageName.concat(`/[id]`);
    }
    // console.log(pageName);
  }

  return generatePage(pageName);
};

export default PageRender;
