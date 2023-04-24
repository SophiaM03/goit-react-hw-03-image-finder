import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return ReactDOM.createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalContainer className="modal-content">
          {this.props.children}
        </ModalContainer>
      </Overlay>,
      document.getElementById('modal-root')
    );
  }
}

export default Modal;
