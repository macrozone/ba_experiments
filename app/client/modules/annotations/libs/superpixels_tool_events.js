import Color from 'color';
import { dataURLtoBlob } from '../libs/utilities';
export default ({
    currentEditingAnnotation,
    createAnnotation,
    segmentation,
    caseId,
    context,
    }) => ({
      onClick: ({ evt: { x, y } }) => {
        const { LocalState, Collections: { AnnotationBitmaps, Labels } } = context();
        const labelId = LocalState.get('labels.currentLabelId');
        const label = Labels.findOne(labelId);
        const color = new Color(label.color);
        const colorArray = color.rgbArray();
        const { canvas, getSegmentForClick } = segmentation;
        const { width, height } = canvas;
      // console.log(x,y);
      // console.log(canvas.getContext('2d').getImageData(0,0, width,height));
        const segment = getSegmentForClick(x, y);
      // console.log(segment);
        const annotationCanvas = document.createElement('canvas');
        annotationCanvas.width = width;
        annotationCanvas.height = height;
        const annotationContext = annotationCanvas.getContext('2d');
        const annotationData = annotationContext.getImageData(0, 0, width, height);
        for (const pixel of segment.pixels) {
          annotationData.data[pixel] = colorArray[0];// result.data[pixel];
          annotationData.data[pixel + 1] = colorArray[1];// result.data[pixel];
          annotationData.data[pixel + 2] = colorArray[2];// result.data[pixel];
          annotationData.data[pixel + 3] = 128;
        }
      // console.log(annotationData.data);
        annotationContext.putImageData(annotationData, 0, 0);
        const dataUrl = annotationCanvas.toDataURL();
        const blob = dataURLtoBlob(dataUrl);
        blob.lastModifiedDate = new Date();
        blob.name = 'annotation.png';

        if (true || !currentEditingAnnotation) {
          const upload = AnnotationBitmaps.insert({ file: blob });
          upload.on('end', (error, file) => {
            if (file) {
            // console.log(file);
              createAnnotation({ caseId, type: 'bitmap2d', props: { bitmapId: file._id } });
            }
          });

      // createAnnotation('bitmap', {bitmap:data});
        } else {
      // update
        }
      },
    });
