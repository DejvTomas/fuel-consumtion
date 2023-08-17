import { createContext, ReactNode, useState } from 'react';
import { Modal } from '../components/modal';

export interface IModalProps {
  title: string;
  text: string;
  onSubmit: () => void;
}

interface IModalContext {
  modal?: IModalProps;
  removeModal: () => void;
  setModal: (props: IModalProps) => void;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export function ModalContextProvider(props: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<IModalProps | undefined>(
    undefined
  );
  const removeModal = () => {
    setModalProps(undefined);
  };
  const setModal = (props: IModalProps) => {
    setModalProps(props);
  };

  return (
    <ModalContext.Provider value={{ modal: modalProps, removeModal, setModal }}>
      {props.children}
      <Modal />
    </ModalContext.Provider>
  );
}
