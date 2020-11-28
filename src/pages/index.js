import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import { Typography, Grid, Button } from "@material-ui/core";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
// import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTrail, animated, useSpring } from "react-spring";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import resume from "../../static/files/resume.pdf";
function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const animatedHero = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(8em)" },
    config: { mass: 2, tension: 260, friction: 30 },
    delay: 600,
  });
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: "translateY(3em)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
    delay: 200,
  });

  return (
    <Layout
      title={` ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Grid container spacing={2} className="hero">
        {/*Personal Intro */}
        <Grid item lg={6} style={{ padding: 10 }} className="homeIntro">
          <animated.div style={animatedTexts[0]}>
            <Typography variant="h2" gutterBottom>
              Hello! I am
              <span className="intro__name"> {siteConfig.title}</span>
            </Typography>
          </animated.div>
          <animated.div style={animatedTexts[1]}>
            <Typography variant="body1">
              A Melbourne University graduate who has a greate passion on web
              development. While keeping updated with the most recent
              technologies, I always seek to improve and grow as a professional
              full-stack web developer as well as a person.
            </Typography>
          </animated.div>
          &nbsp;
          <animated.div style={animatedTexts[2]}>
            <Typography variant="h6" gutterBottom>
              My Skills:
            </Typography>
            <Typography variant="body1" gutterBottom>
              React.js、React Native、Node.js、Material UI、JavaScript、HTML5
              etc.
            </Typography>
          </animated.div>
          &nbsp;
          <animated.p style={animatedTexts[3]}>
            <Button
              style={{ textTransform: "none" }}
              color="primary"
              variant="outlined"
              size="small"
              href={resume}
            >
              My Resume
            </Button>
          </animated.p>
          <SocialLinks animatedProps={animatedTexts[4]} />
        </Grid>

        <Grid item lg={6} className="homeImg">
          <animated.img src="/img/programming.svg" style={animatedHero} />
        </Grid>
      </Grid>
    </Layout>
  );
}
function SocialLinks({ animatedProps, ...props }) {
  return (
    <animated.div className="social__links" style={animatedProps}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography display={"inline"} gutterBottom>
            Social Media:
          </Typography>
        </Grid>
        <Grid item>
          <a href="https://www.linkedin.com/in/haochen-qi-a36393171/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </Grid>
        <Grid item>
          <a href="https://github.com/HaochenQ">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </Grid>
      </Grid>
    </animated.div>
  );
}

export default Home;
