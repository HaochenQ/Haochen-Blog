import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Translate from "@docusaurus/Translate";
const experience = [
  {
    company: "University of Melbourne",
    position: "Master of Information Technology",
    date: "July 2018 - December 2020 ",
    desc: {
      1: "Gained knowledge about fundamentals of the fields of Information Technology and Computer Science.",
      2: "Formed a deep understanding of modern cloud-driven network architecture with hands-on experience.",
      3: "Acquired a comprehensive understanding of the integration of Machine Learning models and modern Web Development by finishing the graduation project.",
    },
  },
  {
    company: "University of North Carolina",
    position: "Exchange Graduate",
    date: "August 2019 - December 2019 ",
    desc: {
      1: "Learnt modern web development and got familar with several modern web framworks.",
      2: "Refined web development skills with hands on projects",
      3: "Excelled in user experience and user interfaces.",
    },
  },
  {
    company: "Psych Press",
    position: "Front-End Developer Intern",
    date: "March 2020 - July 2020 ",
    desc: {
      1: "Implemented reusable React components which helped save development time and budget for the development team.",
      2: "Collaborated with product team members to implement new website features to improve the customers’ experience.",
      3: "Gained experience by working in the agile/scrum development environment with frequently changing requirements and actively participating in scrum meetings and reviews.",
    },
  },
  {
    company: "Wicrecend",
    position: "Azure Cloud Engineer",
    date: "Mid 2021 - Jan 2023 ",
    desc: {
      1: "Developed a comprehensive understanding of the structure of Azure Services such as App Service, Azure VMs, and Azure SQL Database.",
      2: "Helped numerous customers resolve the issues and difficulties they encountered using Azure Services throughout the development, CI/CD, and deployment phases.",
      3: "Provided suggestions and recommendations to help customers to migrate and build robust Cloud-Native apps. ",
      4: "Boosted customers' confidence and satisfaction towards Azure by effectively connecting the customers with the Product Group in terms of product limitations and emerging issues. ",
    },
  },
];
function Experience() {
  const [value, setValue] = useState(0);
  const { company, position, date, desc } = experience[value];

  return (
    <section className="experience">
      <h2 className="experience-title">
        <Translate>Experience</Translate>
      </h2>
      <div className="underline"></div>
      <div className="experiences-center">
        <div className="btn-container">
          {experience.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setValue(index)}
                className={`experience-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <article className="experience-info">
          <h3>{position}</h3>
          <h4>{company}</h4>
          <p className="experience-date">{date}</p>
          {Object.keys(desc).map((key, index) => {
            return (
              <div key={index} className="experience-desc">
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className="experience-icon"
                ></FontAwesomeIcon>
                <p>{desc[key]}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Experience;
