
import {dataURLtoBlob} from '../libs/utilities';
export default ({
    currentEditingAnnotation,
    createAnnotation,
    updateAnnotation,
    stopEditingCurrentAnnotation,
    segmentation,
    context
    }) => {
  return {
    onClick: ({evt: {x,y}}) => {
      const {Collections: {AnnotationBitmaps}} = context();
      const {canvas, getLabelForClick} = segmentation;
      const {width, height} = canvas;
      // console.log(x,y);
      // console.log(canvas.getContext('2d').getImageData(0,0, width,height));
      const label = getLabelForClick(x,y);
      // console.log(label);
      const annotationCanvas = document.createElement('canvas');
      annotationCanvas.width = width;
      annotationCanvas.height = height;
      const annotationContext = annotationCanvas.getContext('2d');
      const annotationData = annotationContext.getImageData(0,0,width, height);
      for (let pixel of label.pixels) {
        annotationData.data[pixel] = 255;// result.data[pixel];
        annotationData.data[pixel + 1] = 0;// result.data[pixel];
        annotationData.data[pixel + 2] = 0;// result.data[pixel];
        annotationData.data[pixel + 3] = 128;
      }
      // console.log(annotationData.data);
      annotationContext.putImageData(annotationData, 0,0);
      const dataUrl = annotationCanvas.toDataURL();
      const blob = dataURLtoBlob(dataUrl);
      blob.lastModifiedDate = new Date();
      blob.name = 'annotation.png';



      if (true || !currentEditingAnnotation) {
        const upload = AnnotationBitmaps.insert({file: blob});
        upload.on('end', (error, file) => {
          if (file) {
            // console.log(file);
            createAnnotation('bitmap', {bitmapId: file._id});
          }

        });

      // createAnnotation('bitmap', {bitmap:data});
      }
      else {
      // update
      }


    }
  };
};
