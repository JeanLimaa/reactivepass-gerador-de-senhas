'use client'
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../Buttons/Button';
import { useSession } from "next-auth/react"
import axios from 'axios';
import LabelInput from './LabelInput';
import LoadingButton from '@/components/Buttons/LoadingButton';

function ModalSavePass({ disabled, valuePass, isToastOpen, setIsToastOpen, ...args }) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [labelPassword, setLabelPassword] = useState('');
  const [passwordExists, setPasswordExists] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const toggle = () => setModal(!modal);

  async function handleSavePassword(ev) {
    ev.preventDefault();
    setIsFormSubmitting(true)

    const userEmail = session.user.email;
    const passwordData = {
      passwordGenerated: valuePass,
      email: userEmail,
      labelPassword: labelPassword,
    };

    await axios.post('/api/savepass', passwordData)
      .then(response => {
        console.log(response.data);
        toggle()
        setPasswordExists(false);
        setLabelPassword('');
        setIsToastOpen(true)
        setTimeout(() => {
          setIsToastOpen(false)
        }, 4 * 1000)
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro de resposta do servidor:', error.response.data);
          setPasswordExists(true);
        } else if (error.request) {
          console.error('Erro na solicitação:', error.request);
        } else {
          console.error('Erro inesperado:', error.message);
        }
        setLabelPassword('');
      });
      
      setIsFormSubmitting(false)
  }
  function handleChangeText(e) {
    setLabelPassword(e.target.value);
    setPasswordExists(false)
  }
  return (
    <>
      <Button onClick={toggle}
        text="Salvar"
        altHelpCircle="Você deve estar logado para salvar sua senha."
        titleHelpCircle="Você deve estar logado para salvar sua senha."
        type="button"
        disabled={disabled}
      />
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Escolha um nome para a senha</ModalHeader>
        <ModalBody>
          <h2 className='text-base font-medium'>Esse nome ficará atrelada a sua senha para facilitar com que você reconheça para qual fim ela é utilizada!</h2>
          <p className='text-red-400'>OBS: Caso não queira escolher um nome, será atribuido o nome Generic.</p>
        </ModalBody>

        <LabelInput
          passwordExists={passwordExists}
          name="nameForPassword"
          text="Nome para a senha: "
          onChange={handleChangeText}
        />
        <LabelInput
          name="passworDisplay"
          text="Sua senha: "
          value={valuePass}
          disabled={true}
        />
        <ModalFooter>
          <LoadingButton text="Confirmar" onClick={handleSavePassword} isFormSubmitting={isFormSubmitting} />{' '}
          <Button text="Cancelar" onClick={() => {
            toggle();
            setPasswordExists(false);
          }
          }
          />
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalSavePass;