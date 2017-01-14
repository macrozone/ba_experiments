import annotationBitmaps from './annotation_bitmaps';
import cases from './cases';
import labels from './labels';
import annotations from './annotations';

export default function () {
  cases();
  labels();
  annotationBitmaps();
  annotations();
}
