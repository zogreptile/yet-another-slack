import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Button, ListGroup, Col } from 'react-bootstrap';
import * as actionCreators from '../actions';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  channels: selectors.channelsSelector(state),
  currentChannelId: state.currentChannelId,
  addChannelModal: state.addChannelModal,
  removeChannelModal: state.removeChannelModal,
});

@connect(mapStateToProps, actionCreators)
export default class ChannelsList extends React.Component {
  switchChannel = id => () => {
    const { switchChannel } = this.props;
    switchChannel(id);
  }

  showAddChannelModal = () => {
    const { toggleAddChannelModal } = this.props;
    toggleAddChannelModal({ isOpen: true });
  }

  showRemoveChannelModal = id => () => {
    const { toggleRemoveChannelModal } = this.props;
    toggleRemoveChannelModal({
      isOpen: true,
      channelId: id,
    });
  }

  renderChannels = () => {
    const { channels, currentChannelId } = this.props;
    const listItemClasses = id => cn({
      'p-0': true,
      'd-flex': true,
      'list-group-item-secondary': currentChannelId === id,
    });

    return (
      <React.Fragment>
        <Button
          block
          variant="dark"
          className="mb-3"
          onClick={this.showAddChannelModal}
        >
          New channel
        </Button>

        <ListGroup as="ul">
          {channels.map(({ id, name, removable }) => (
            <ListGroup.Item as="li" key={id} className={listItemClasses(id)}>
              <Button
                block
                variant="light"
                className="bg-transparent text-left border-0"
                onClick={this.switchChannel(id)}
              >
                {`# ${name}`}
              </Button>

              {
                removable
                  ? (
                    <Button
                      variant="light"
                      className="bg-transparent text-danger border-0"
                      onClick={this.showRemoveChannelModal(id)}
                    >
                    ×
                    </Button>
                  )
                  : null
              }
            </ListGroup.Item>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Col sm={3} as="aside" className="mb-3">
        <h3 className="mb-3">Channels</h3>
        {this.renderChannels()}
      </Col>
    );
  }
}
