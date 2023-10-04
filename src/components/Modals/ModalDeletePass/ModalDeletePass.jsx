'use client';
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@/components/Buttons/Button'
import LoadingButton from '@/components/Buttons/LoadingButton';

export default function ModalDeletePass({index, isOpen, toggle, setPasswordList, setToastSuccess}) {
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const handleDeletePassword = async (index) => {
      setIsFormSubmitting(true)  
      toggle()
        try {
            await fetch("/api/deletepass", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            }).then(async (res) => {
                const result = await res.json();

                if (result.status === 201) {
                    setPasswordList((prevData) => {
                        const newData = [...prevData];
                        newData.splice(index, 1);
                        return newData;
                    });
                    setToastSuccess(true)
                    setTimeout(() => {
                        setToastSuccess(false)
                    }, 3 * 1000)
                } else {
                    alert(result.message)
                    //Ffazer algo
                }

            });
        } catch(err) {
            console.log(err)
        }
        setIsFormSubmitting(false)
    }

  return (
    
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Excluir senha do perfil</ModalHeader>
        <ModalBody>
          <h2 className='text-lg font-medium'>Tem certeza de que deseja excluir a senha de índice {index + 1}?</h2>
        </ModalBody>
        <ModalFooter>
          <LoadingButton text="Excluir" color="bg-red-600 hover:bg-red-700" isFormSubmitting={isFormSubmitting} onClick={() => handleDeletePassword(index)} />
          <Button text="Cancelar" onClick={toggle} />
        </ModalFooter>
      </Modal>
    
  );
}