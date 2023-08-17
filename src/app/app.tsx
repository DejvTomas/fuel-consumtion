import styles from './app.module.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  LocalGasStation,
  Settings,
  PointOfSale,
  Close,
  Edit,
} from '@mui/icons-material';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { NewItemForm } from './components/addNewItemForm/addNewItemForm';
import { ColumnType, DataTable } from './components/dataTable/dataTable';
import { IItem } from './structures/item';
import * as API from 'src/api/api.service';
import { Costs } from './Costs';
import { toFixed } from './utils/toFixed';
import { Consumtions } from './Consumtions';
import { Modal } from './components/modal';
import { ModalContext, ModalContextProvider } from './contexts/modalContext';
import { useModal } from './hooks/useModal';
import { Data } from './Data/data';

enum Navigation {
  Consumption = 'consumption',
  Costs = 'costs',
  Settings = 'settings',
}

export function App() {
  const [navigation, setNavigation] = useState(Navigation.Consumption);
  const [records, setRecords] = useState<IItem[]>([]);

  const fetchItems = async () => {
    const items = await API.fetchConsumptionItems();
    setRecords(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getContent = () => {
    return (
      <>
        {navigation === Navigation.Consumption && (
          <div>
            <Consumtions items={records} />
          </div>
        )}
        {navigation === Navigation.Costs && (
          <div>
            <Costs items={records} />
          </div>
        )}
        {navigation === Navigation.Settings && (
          <Data items={records} setItems={setRecords} />
        )}
      </>
    );
  };

  return (
    <ModalContextProvider>
      <Container
        maxWidth="xl"
        sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}
      >
        <div className={styles['main-layout']}>
          <div className={styles['main-layout-header']}>
            <AppBar component="nav">
              <Toolbar sx={{ justifyContent: 'center' }}>
                <Typography variant="h6" component="div">
                  Fuel Consumption
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div className={styles['main-layout-content']}>{getContent()}</div>
          <div className={styles['main-layout-navigation']}>
            <BottomNavigation
              showLabels
              value={navigation}
              onChange={(event, newValue) => {
                setNavigation(newValue);
              }}
            >
              <BottomNavigationAction
                value={Navigation.Consumption}
                label="Consumption"
                icon={<LocalGasStation />}
              />
              <BottomNavigationAction
                value={Navigation.Costs}
                label="Costs"
                icon={<PointOfSale />}
              />
              <BottomNavigationAction
                value={Navigation.Settings}
                label="Data"
                icon={<Settings />}
              />
            </BottomNavigation>
          </div>
        </div>
      </Container>
    </ModalContextProvider>
  );
}

export default App;
