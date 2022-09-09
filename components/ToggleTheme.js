import React, { Fragment, useContext } from 'react';
import { ThemeContext } from '../context/theme';
import Head from 'next/head';
const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <Fragment>
      <Head>
        <link
          rel='stylesheet'
          href={`/css/${theme}.css`}
        />
      </Head>
      {theme === 'light' ? (
        <span
          style={{ fontSize: '24px' }}
          onClick={() => {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
          }}>
          🌚
        </span>
      ) : (
        <span
          style={{ fontSize: '24px' }}
          onClick={() => {
            setTheme('light');
            localStorage.setItem('theme', 'light');
          }}>
          🌞
        </span>
      )}
    </Fragment>
  );
};

export default ToggleTheme;
