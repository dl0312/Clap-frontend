import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";

interface IProps {
  category: {
    id: number;
    name: string;
    topWikiImage: {
      id: number;
      shownImage: any;
    } | null;
  };
  display: "text" | "photo" | "both";
}

const CategoryTag: React.SFC<IProps> = ({ category, display }) => (
  <Tag
    style={{
      padding: "0"
    }}
  >
    <Link
      to={`/category/read/${category.id}`}
      style={{
        height: "100%",
        textDecoration: "none",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "top"
      }}
    >
      {category.topWikiImage && (display === "photo" || display === "both") && (
        <img
          style={{
            height: "100%",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
            borderRight: "1px solid #d9d9d9"
          }}
          src={category.topWikiImage.shownImage}
        />
      )}
      {(display === "text" || display === "both") && (
        <span style={{ padding: "0 7px" }}>{category.name}</span>
      )}{" "}
    </Link>
  </Tag>
);

export default CategoryTag;
