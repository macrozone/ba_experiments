

export const bufferToArray = (buffer) => {
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return new Float32Array(arrayBuffer);
};
