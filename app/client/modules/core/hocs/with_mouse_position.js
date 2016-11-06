import ReactCursorPosition from 'react-cursor-position';


export default () => (C) => props => {
  const CWithNewProps = (newProps) => <C {...newProps} { ...props} />;
  return (
  <ReactCursorPosition>
    <CWithNewProps />
  </ReactCursorPosition>
);
};
