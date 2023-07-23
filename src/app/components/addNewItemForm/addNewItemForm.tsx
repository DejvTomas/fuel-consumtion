import styles from './addNewItemForm.module.scss';
import { Add } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import { IItem } from 'src/app/structures/item';
import { ChangeEvent, useState } from 'react';

export interface INewItemFormProps {
  onCreate: (item: IItem) => Promise<boolean>;
}

export function NewItemForm({ onCreate }: INewItemFormProps) {
  const [date, setDate] = useState<string>(new Date().toJSON().slice(0, 10));
  const [price, setPrice] = useState(0);
  const [liters, setLiters] = useState(0);
  const [tachometer, setTachometer] = useState(0);

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
          <Button
            variant="contained"
            onClick={async () => {
              const result = await onCreate({
                date: new Date(date),
                price,
                amount: liters,
                tachometer,
              })
              debugger;
              if(result) {
                setDate(new Date().toJSON().slice(0, 10));
                setLiters(0);
                setPrice(0);
                setTachometer(0);
              }}
            }
            startIcon={<Add />}
          >
            Add New Item
          </Button>
        </div>
      </Stack>
    </div>
  );
}
