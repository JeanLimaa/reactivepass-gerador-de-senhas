import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@/components/Buttons/Button'

export default function ModalDeletePass({labelPassword, index, isOpen, toggle, setDataFromServer, setToastSuccess}) {

    const handleDeletePassword = async (index) => {
        toggle()
        try {
            await fetch("/api/deletePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            }).then(async (res) => {
                const result = await res.json();

                if (result.status === 201) {
                    setDataFromServer((prevData) => {
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
        } catch {
            //Ffazer algo
        }
    }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Excluir senha do perfil</ModalHeader>
        <ModalBody>
          <h2>Tem certeza de que deseja excluir a senha com o label {labelPassword} de índice {index + 1}?</h2>
        </ModalBody>
        <ModalFooter>
          <Button text="Excluir" className="bg-red-600 hover:bg-red-700" onClick={() => handleDeletePassword(index)} />
          <Button text="Cancelar" onClick={toggle} />
        </ModalFooter>
      </Modal>
    </div>
  );
}

