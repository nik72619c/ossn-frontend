import React from 'react';

// Styles
import './../../base-styles/base/normalize.scss'
import './layout-2col-unequal.scss'

const Layout2ColsUnequal = (props) =>{

  const baseClass = 'layout-2col-unequal';

  const children = React.Children.map(props.children, (child) => {
    const className = `${child.props.className} ${baseClass}__col`;
    const props = { ...child.props, className: className };
    const newChild = React.cloneElement(child, props);
    return newChild;
  });

  let classes = [baseClass];
  if (props.horizontalGutters) classes.push(`${baseClass}--with-horizontal-gutters`);
  if (props.verticalGutters) classes.push(`${baseClass}--with-vertical-gutters`);
  if (props.alwaysTwoCols) classes.push(`${baseClass}--always-2col`);
  if (props.onTablet) classes.push(`${baseClass}--two-columns-on-tablet`);
  if (props.secondNarrow) classes.push(`${baseClass}--second-is-narrow`);
  if (props.inverse) classes.push(`${baseClass}--inverse`);

  const classString = classes.join(" ")

  return(
  <div className={classString}>
      {children}
    </div>
  );
};

export default Layout2ColsUnequal;