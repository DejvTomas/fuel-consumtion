import styles from './app.module.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from 'react';
import { Container } from '@mui/system';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  LocalGasStation,
  Settings,
  PointOfSale,
  ExpandMore,
  Add,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { NewItemForm } from './components/addNewItemForm/addNewItemForm';
import { DataTable } from './components/dataTable/dataTable';
import { IItem } from './structures/item';
import * as localStorage from './localStorage/localStorage';

enum Navigation {
  Consumption = 'consumption',
  Costs = 'costs',
  Settings = 'settings',
}

export function App() {
  const [navigation, setNavigation] = useState(Navigation.Consumption);
  const [records, setRecords] = useState<IItem[]>(localStorage.getItems());

  return (
    <Container>
      <div className={styles['main-layout']}>
        <div className={styles['main-layout-header']}>
          <AppBar component="nav">
            <Toolbar>
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
  );

  function getContent() {
    return (
      <>
        {navigation === Navigation.Consumption && <div>consumption</div>}
        {navigation === Navigation.Costs && <div>costs</div>}
        {navigation === Navigation.Settings && (
          <div>
            <Stack>
              <NewItemForm
                onCreate={(item) => {
                  localStorage.setItems([...records, item]);
                  setRecords(localStorage.getItems());
                }}
              />
              <DataTable
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
                    valueGetter: (item) => item.liters.toString(),
                  },
                  {
                    header: 'Total Price',
                    valueGetter: (item) =>
                      Math.round(item.liters * item.price).toString(),
                  },
                ]}
                items={records.sort((a, b) => {
                  if (a.date.getTime() > b.date.getTime()) {
                    return -1;
                  }
                  return 1;
                })}
              />
            </Stack>
          </div>
        )}
      </>
    );
  }
}

export default App;