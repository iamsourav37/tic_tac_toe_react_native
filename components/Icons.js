import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const Icons = ({iconName}) => {
  switch (iconName) {
    case 'cross':
      return <EvilIcon name="close" size={55} color="#333" />;
    case 'circle':
      return <Icon name="circle-thin" size={55} />;

    default:
      return <EvilIcon name="pencil" color="#0D0D0D" size={55} />;
  }
};

export default Icons;
