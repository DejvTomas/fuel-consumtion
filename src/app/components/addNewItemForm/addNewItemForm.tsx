import styles from './addNewItemForm.module.scss';
import { Add, Edit } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import { IItem } from 'src/app/structures/item';
import { ChangeEvent, useEffect, useState } from 'react';

export interface INewItemFormProps {
  onEditCancel: () => void;
  onCreateOrUpdate: (item: IItem) => Promise<boolean>;
  editItem?: IItem;
}

export function NewItemForm({
  onCreateOrUpdate,
  onEditCancel,
  editItem,
}: INewItemFormProps) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<string>(new Date().toJSON().slice(0, 10));
  const [price, setPrice] = useState(0);
  const [liters, setLiters] = useState(0);
  const [tachometer, setTachometer] = useState(0);

  useEffect(() => {
    if (editItem) {
      setId(editItem.id);
      setDate(new Date(editItem.date).toJSON().slice(0, 10));
      setPrice(editItem.price);
      setLiters(editItem.amount);
      setTachometer(editItem.tachometer);
    }
  }, [editItem]);

  return (
    <div className={styles['form-body']}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          variant="standard"
          value={date}
          onInput={(ev: ChangeEvent<HTMLInputElement>) => {
            setDate(ev.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Price/ Liter"
          value={price}
          type="number"
          variant="standard"
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setPrice(parseFloat(ev.target.value))
          }
        />
        <TextField
          fullWidth
          value={liters}
          label="Liters"
          type="number"
          variant="standard"
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setLiters(parseFloat(ev.target.value))
          }
        />
        <TextField
          fullWidth
          label="Tachometer"
          value={tachometer}
          type="number"
          variant="standard"
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setTachometer(parseFloat(ev.target.value))
          }
        />
        <div className={styles['form-footer']}>
          <Stack direction="row" spacing={2} justifyContent="end">
            {editItem && (
              <Button
                variant="text"
                onClick={() => {
                  onEditCancel();
                }}
              >
                {'Cancel'}
              </Button>
            )}
            <Button
              variant="contained"
              onClick={async () => {
                const result = await onCreateOrUpdate({
                  id: id || undefined,
                  date: new Date(date),
                  price,
                  amount: liters,
                  tachometer,
                });
                if (result) {
                  setDate(new Date().toJSON().slice(0, 10));
                  setLiters(0);
                  setPrice(0);
                  setTachometer(0);
                }
              }}
              startIcon={editItem ? <Edit /> : <Add />}
            >
              {editItem ? 'Edit' : 'Add New Item'}
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
