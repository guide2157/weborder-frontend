import React from 'react'
import {Modal, ModalBody} from "reactstrap";

type Props = {
    isOpen:boolean, toggleModal: any, text: string
}

class ConfirmationModal extends React.Component<Props> {
    render () {
        const {isOpen, toggleModal, text}= this.props
        return (
            <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalBody>
                    <h5 style={{textAlign: "center"}}>{text}</h5>
                </ModalBody>
            </Modal>
        )
    }

}

export default ConfirmationModal