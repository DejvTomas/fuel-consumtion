import { Edit, Close } from '@mui/icons-material';
import { Stack, IconButton } from '@mui/material';
import { NewItemForm } from '../components/addNewItemForm/addNewItemForm';
import { DataTable, ColumnType } from '../components/dataTable/dataTable';
import { toFixed } from '../utils/toFixed';
import * as API from 'src/api/api.service';
import { IItem } from '../structures/item';
import { useState } from 'react';
import { getSortItemsByDateFnc } from '../utils/sort';
import { useModal } from '../hooks/useModal';
import { dateFormate } from '../utils/dateFormate';

export interface IDataProps {
  items: IItem[];
  setItems: (items: IItem[]) => void;
}

export function Data({ items, setItems }: IDataProps) {
  const [itemToEdit, setItemToEdit] = useState<IItem | undefined>();
  const { addModal } = useModal();

  const insertItemOrUpdate = async (item: IItem): Promise<boolean> => {
    const updatedItems = await API.insertOrUpdate(item);
    if (updatedItems && updatedItems.length) {
      setItems(updatedItems);
      return true;
    }
    return false;
  };

  const removeItem = async (item: IItem): Promise<boolean> => {
    const updatedItems = await API.remove(item);
    if (updatedItems && updatedItems.length) {
      setItems(updatedItems);
      return true;
    }
    return false;
  };

  return (
    <div>
      <Stack>
        <NewItemForm
          editItem={itemToEdit}
          onCreateOrUpdate={async (item) => {
            const returnValue = await insertItemOrUpdate(item);
            if (itemToEdit) {
              setItemToEdit(undefined);
            }
            return returnValue;
          }}
          onEditCancel={() => {
            setItemToEdit(undefined);
          }}
        />
        <DataTable
          items={items.sort(getSortItemsByDateFnc('date'))}
          columns={[
            {
              header: 'Date',
              valueGetter: (item) => item.date.toLocaleDateString(),
            },
            {
              header: 'Tachometer',
              valueGetter: (item) => item.tachometer.toString(),
            },
            {
              header: 'Price',
              valueGetter: (item) => item.price.toString(),
            },
            {
              header: 'Amount',
              valueGetter: (item) => item.amount.toString(),
            },
            {
              header: 'Total Price',
              valueGetter: (item) => toFixed(item.amount * item.price),
            },
            {
              header: '',
              type: ColumnType.Action,
              valueGetter: (item) => (
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => {
                    setItemToEdit(item);
                  }}
                >
                  {' '}
                  <Edit />
                </IconButton>
              ),
            },
            {
              header: '',
              type: ColumnType.Action,
              valueGetter: (item) => (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    addModal({
                      title: 'We are about to remove data item.',
                      text: `Are you sure, you want to remove item from ${dateFormate(
                        item.date
                      )}?`,
                      onSubmit: () => removeItem(item),
                    });
                  }}
                >
                  <Close />
                </IconButton>
              ),
            },
          ]}
        />
      </Stack>
    </div>
  );
}
