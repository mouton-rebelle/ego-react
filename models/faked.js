import ElementInfoData from './ElementInfoData';
import ElementImageData from './ElementImageData';
import ElementMeshData from './ElementMeshData';

export const elements = [
  new ElementMeshData(
    true,
     0,
    [
      new ElementImageData(
       'http://eg0.me/uploads/ego/orig/9352.jpg',
        0.5,
        new ElementInfoData('le champ','bien labouré, non ?')
      ),
      new ElementImageData(
        'http://eg0.me/uploads/ego/orig/9351.jpg',
        0.5,
        new ElementInfoData('firefox')
      )
    ],
    new ElementInfoData('il fait beau')
  ),
  new ElementMeshData(
    true,
     0,
    [
      new ElementImageData(
       'http://eg0.me/uploads/ego/orig/9359.jpg',
        0.305,
        new ElementInfoData('tonton')
      ),
      new ElementImageData(
        'http://eg0.me/uploads/ego/orig/9360.jpg',
        0.695,
        new ElementInfoData('tilo')
      )
    ],
    new ElementInfoData('il fait beau')
  )
];