import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import '../sass/components/element.scss';
import { Link } from 'react-router';
import { debounce } from 'lodash';
export default class PostImage extends Component {

  static propTypes = {
    image      : PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageVisible: false,
      imageLoaded: false,
      width:0
    };

    this.updateViewport = debounce( () => {
      if ( this.shouldLoad() )
      {
        this.setState({
          imageVisible: true
        });
        window.removeEventListener('scroll', this.updateViewport);
      }

    }, 200);

    this.onLoad = () => {
      this.setState({
        imageLoaded: true
      });
      window.removeEventListener('resize', this.updateViewport);
    };
  }

  componentDidMount()
  {
    if (this.shouldLoad())
    {
      this.setState({
        imageVisible: true
      });
    } else {
      window.addEventListener('scroll', this.updateViewport);
    }

    window.addEventListener('resize', this.updateViewport);

  }

  componentWillUnmount()
  {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  }

  /**
   * return true if the parent offset is in the viewport
   * @return {boolean}
   */
  shouldLoad(){
    let el  = ReactDOM.findDOMNode(this);
    if (el.offsetWidth !== this.state.width)
    {
      this.setState({width: el.offsetWidth});
    }
    return (window.pageYOffset + window.innerHeight) > (el.offsetParent.offsetTop - 100);
  }


  render() {

    const {image} = this.props;
    const styles =
    {
      base:
      {
        textDecoration:'none',
        color:'#666',
        textAlign:'center'
      },
      loading: {
        height: Math.floor(this.state.width / image.ratio),
        backgroundColor:'#EEE',
        backgroundImage:'url(/public/img/grid.svg)',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center center'
      }
    };

    let computedStyles = styles.base;
    if (!this.state.imageLoaded)
    {
      computedStyles = {...computedStyles, ...styles.loading};
    }

    return (
      <Link className="image image--border" style={ computedStyles } to={`${image.postUrl}/${image._id}`}>
        { this.state.imageVisible ? // http://eg0.me/uploads/ego/
           <img alt={image.label} style={{display:this.state.imageLoaded ? 'inline-block' : 'none'}} className="element__image" onLoad={this.onLoad} src={ `/orig/${image.file}` } />
           :
           null
        }
      </Link>
    );
  }
}
