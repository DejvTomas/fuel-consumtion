import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useContext } from 'react';
import { ModalContext } from 'src/app/contexts/modalContext';

export function Modal() {
  const modalContext = useContext(ModalContext);

  return modalContext && modalContext.modal ? (
    <Dialog
      open={true}
      onClose={modalContext.modal.onSubmit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{modalContext.modal.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalContext.modal.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            modalContext.removeModal();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            modalContext.modal?.onSubmit();
            modalContext.removeModal();
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
