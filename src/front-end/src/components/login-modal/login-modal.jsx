import Modal from '../../containers/modal.jsx';
import styles from './login-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import SubmitLoginButton from './submit-login-button.jsx';
import connect from 'react-redux/es/connect/connect';
import { closeLoginModal } from '../../reducers/modals.js';
import mapStateToProps from 'react-redux/es/connect/mapStateToProps';
import { compose } from 'redux';
const LoginModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.title}
        id="loginModal"
        onRequestClose={props.onCancel}
    >
        <Box>
            <input
                className={styles.minInput}
                name="account"
                placeholder="账号"
                type="text"
            /><br />
            <input
                className={styles.minInput}
                name="password"
                placeholder="密码"
                type="password"
            /><br />
            <SubmitLoginButton className={styles.btnSubmit} />
        </Box>
    </Modal>
);
LoginModal.propTypes = {
    onCancel: PropTypes.func,
    title: PropTypes.string.isRequired
}

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeLoginModal())
});

connect (mapStateToProps,mapDispatchToProps);

export default compose(
    LoginModal
);