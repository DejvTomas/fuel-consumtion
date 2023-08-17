import { useContext } from "react";
import { IModalProps, ModalContext } from "../contexts/modalContext";

export function useModal(): {addModal: (props: IModalProps) => void} {
    const modalContext = useContext(ModalContext);
    
    const addModal = (props: IModalProps)=> {
        modalContext?.setModal(props)
    }

    return {addModal}
}