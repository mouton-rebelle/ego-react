import ElementInfo from './ElementInfo';
import ElementImage from './ElementImage';
import ElementMesh from './ElementMesh';

export const elements = [
  new ElementMesh(
    true,
     0,
    [
      new ElementImage(
       'http://eg0.me/uploads/ego/orig/9352.jpg',
        0.5,
        new ElementInfo('le champ')
      ),
      new ElementImage(
        'http://eg0.me/uploads/ego/orig/9351.jpg',
        0.5,
        new ElementInfo('firefox')
      )
    ],
    new ElementInfo('il fait beau')
  ),
  new ElementMesh(
    true,
     0,
    [
      new ElementImage(
       'http://eg0.me/uploads/ego/orig/9359.jpg',
        0.305,
        new ElementInfo('tonton')
      ),
      new ElementImage(
        'http://eg0.me/uploads/ego/orig/9360.jpg',
        0.695,
        new ElementInfo('tilo')
      )
    ],
    new ElementInfo('il fait beau')
  )
];