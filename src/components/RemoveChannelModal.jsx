import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  removeChannelModal: state.removeChannelModal,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'removeChannelForm' })
export default class RemoveChannelModal extends React.Component {
  submit = () => {
    const { channelId } = this.props.removeChannelModal;
    this.props.removeChannel(channelId);
    this.props.reset();
  }

  hideModal = () => {
    this.props.toggleRemoveChannelModal({ isOpen: false });
  }

  render() {
    const { handleSubmit, removeChannelModal } = this.props;

    return (
      <Modal show={removeChannelModal.isOpen} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex" onSubmit={handleSubmit(this.submit)}>
            <Button block type="submit" variant="danger">Remove</Button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
};
