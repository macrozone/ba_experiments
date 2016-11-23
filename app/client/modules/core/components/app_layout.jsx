import React from 'react';
import withTheme from '/lib/with_theme';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        display: 'flex',
        height: '100vh',
        position: 'absolute',
        width: '100vw'
      },
      style // allow override
    ],
    main: {
      flex: '3'
    },
    panel: {
      flex: '1'
    }
  };
};

const Component = ({styles, main, panel}) => {
  return (
    <div style={styles.base}>
      <div style={styles.main}>
        {main()}
      </div>
      <div style={styles.panel}>
        {panel()}
      </div>
    </div>
  );
};

const AppLayout = withTheme(Styles, Component);

AppLayout.propTypes = {

};

AppLayout.defaultProps = {
};

AppLayout.displayName = 'AppLayout';
Component.displayName = 'withTheme(AppLayout)';
export default AppLayout;
