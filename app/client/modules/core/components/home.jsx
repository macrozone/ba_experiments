import React from 'react';
import withTheme from '/manul-utils/with_theme';

import {Button} from 'react-bootstrap';


const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        textAlign: 'center',
        marginTop: 60
      },
      style // allow override
    ]
  };
};

const Component = ({styles}) => {
  return (
    <div style={styles.base}>
      <Button href="/pet3dviewer">PET 3dViewer</Button>
      <Button href="/annotation2d">2D Annotation Sample App</Button>
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
