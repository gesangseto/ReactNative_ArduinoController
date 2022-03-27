import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {
  generateQueryCreateTable,
  generateQueryInsert,
  generateQueryUpdate,
} from '../helper';

const tableName = 'controller';
const structure = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  controller_name: 'varchar(50) NOT NULL',
  controller_desc: 'varchar(225)',
  code: 'varchar(10)',
  background_color: 'varchar(50)',
  icon_name: 'varchar(50)',
  icon_color: 'varchar(50)',
};

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'arduino-controller.db', location: 'default'});
};

export const createTableController = async db => {
  const query = generateQueryCreateTable({
    table: tableName,
    structure: structure,
  });
  console.log(query);
  return await db.executeSql(query);
};

export const getController = async db => {
  const datas = [];
  const results = await db.executeSql(
    `SELECT * FROM ${tableName} ORDER BY id DESC;`,
  );
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      datas.push(result.rows.item(index));
    }
  });
  return datas;
};

export const insertController = async (db, data) => {
  let query = generateQueryInsert({
    table: tableName,
    structure: structure,
    values: data,
  });

  const results = await db.executeSql(query);
  return results;
};

export const updateController = async (db, data) => {
  let query = generateQueryUpdate({
    table: tableName,
    structure: structure,
    values: data,
  });
  const results = await db.executeSql(query);
  return results;
};
