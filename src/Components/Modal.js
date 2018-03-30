import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    const {modalRoot} = this.props
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    const {modalRoot} = this.props
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}