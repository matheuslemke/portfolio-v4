import { usePrefersReducedMotion } from '@hooks';
import { loaderDelay, navDelay } from '@utils';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const headerIntro = <h1>Hi, my name is</h1>;
  const fullName = (
    <h2 className="big-heading">
      <span className="emphasis">Lemke</span>, Anderson Matheus.
    </h2>
  );
  const subtitle = <h3 className="big-heading">I build software.</h3>;
  const minibio = (
    <>
      <p>
        I'm a software engineer and consultant. I like to help people and companies to improve their
        results with digital transformation. Working with software for over 9 years, currently, at{' '}
        <a href="https://www.taller.net.br/" target="_blank" rel="noreferrer">
          Taller
        </a>
        , one of the most well-recognized Brazilian software development and consulting companies.
      </p>
    </>
  );
  const badges = (
    <div>
      <div className="wrapper">
        <p />
        <StaticImage
          className="img"
          src="../../images/badges/kmp.png"
          width={120}
          formats={['AUTO']}
          alt="Kanban Management Professional - KMP"
        />
      </div>
    </div>
  );

  const items = [headerIntro, fullName, subtitle, minibio, badges];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
