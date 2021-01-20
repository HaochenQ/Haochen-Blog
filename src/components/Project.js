import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import useBaseUrl from "@docusaurus/useBaseUrl";
const Project = ({ description, title, github, stack, url, image, index }) => {
  return (
    <article className="work">
      <div className="work-img" onClick={() => window.open(url)}>
        {image && <img src={useBaseUrl(image)} className="image" />}
        <div className="img-mask"></div>
      </div>
      <div className="work-info">
        <span className="work-number">0{index + 1}.</span>
        <h3>{title || "default title"}</h3>
        <p className="work-desc">{description}</p>
        <div className="work-stack">
          {stack.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </div>
        <div className="work-links">
          <a href={github}>
            <FontAwesomeIcon icon={faGithub} className="work-icon" />
          </a>
          <a href={url}>
            <FontAwesomeIcon icon={faExternalLinkAlt} className="work-icon" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Project;
