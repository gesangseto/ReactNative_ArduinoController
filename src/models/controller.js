import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {generateQueryCreateTable, generateQueryInsert} from '../helper';

const tableName = 'controller';
const column = ['id', 'controller_name'];
const structure = {INTEGER: 8, VARCHAR: 50};

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'arduino-controller.db', location: 'default'});
};

export const createTableController = async db => {
  let values = {id: 1, controller_name: 'Test'};
  generateQueryInsert({table: tableName, column: column, values: values});

  const query = generateQueryCreateTable({
    table: tableName,
    column: column,
    structure: structure,
  });
  await db.executeSql(query);
};

export const getController = async db => {
  const datas = [];
  const results = await db.executeSql(`SELECT * FROM ${tableName}`);
  console.log(results);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      datas.push(result.rows.item(index));
    }
  });
  return datas;
};

export const insertController = async (db, data) => {
  const datas = [];
  const results = await db.executeSql(`SELECT * FROM ${tableName}`);
  console.log(results);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      datas.push(result.rows.item(index));
    }
  });
  return datas;
};
