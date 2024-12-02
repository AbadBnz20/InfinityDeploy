'use client';
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { getCookie } from 'cookies-next';
export const ModalTerm = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const term = getCookie('terms');
  return (
    <>
    <span onClick={onOpen} className="text-blue-700 font-semibold cursor-pointer">Terminos y condiciones </span>
      <Modal scrollBehavior={'inside'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Terminos y condiciones.</ModalHeader>
              <ModalBody>
                {
                    term ? <div dangerouslySetInnerHTML={{ __html: term?.toString() }} /> : <p>El hotel no espesifico sus terminos y condiciones.</p>
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
