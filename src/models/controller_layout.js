import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {
  generateQueryCreateTable,
  generateQueryInsert,
  generateQueryUpdate,
} from '../helper';

const tableName = 'controller_layout';
const structure = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  controller_id: 'INTEGER NOT NULL',
  x: 'varchar(225)',
  y: 'varchar(10)',
  text: 'varchar(50)',
  text_size: 'varchar(10)',
  text_bold: 'varchar(10)',
  icon_name: 'varchar(50)',
  icon_color: 'varchar(50)',
  type: 'varchar(50) NOT NULL',
  com_onTouchStart: 'varchar(50)',
  com_onTouchEnd: 'varchar(50)',
  com_onPress_val1: 'varchar(50)',
  com_onPress_val2: 'varchar(50)',
  com_onPress_val3: 'varchar(50)',
  com_onPress_val4: 'varchar(50)',
  com_onPress_val5: 'varchar(50)',
  com_toogle_on: 'varchar(50)',
  com_toogle_off: 'varchar(50)',
  slide_min_val: 'varchar(50)',
  slide_max_val: 'varchar(50)',
  com_slide_val: 'varchar(50)',
};

export const structure_controller_layout = structure;

enablePromise(true);

export const createTableControllerLayout = async db => {
  const query = generateQueryCreateTable({
    table: tableName,
    structure: structure,
  });
  console.log(query);
  return await db.executeSql(query);
};

export const getControllerLayout = async (db, controller_id) => {
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

export const insertControllerLayout = async (db, data) => {
  let query = generateQueryInsert({
    table: tableName,
    structure: structure,
    values: data,
  });
  const results = await db.executeSql(query);
  return results;
};

export const updateControllerLayout = async (db, data) => {
  let query = generateQueryUpdate({
    table: tableName,
    structure: structure,
    values: data,
  });
  const results = await db.executeSql(query);
  return results;
};
