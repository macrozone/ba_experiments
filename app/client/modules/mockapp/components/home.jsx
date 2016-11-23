import React from 'react';
import withTheme from '/lib/with_theme';
import Draw from '../containers/draw';
import Panel from '../containers/panel';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        display: 'flex'
      },
      style // allow override
    ],
    draw: {
      flex: '3'
    },
    panel: {
      flex: '1'
    }
  };
};

const Component = ({styles}) => {
  return (
    <div style={styles.base}>
      <Draw style={styles.draw}/>
      <Panel style={styles.panel}/>
    </div>
  );
};

const Home = withTheme(Styles, Component);

Home.propTypes = {

};

Home.defaultProps = {
};

Home.displayName = 'Home';
Component.displayName = 'withTheme(Home)';
export default Home;
