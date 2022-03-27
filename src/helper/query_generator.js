export const generateQueryCreateTable = ({table, structure}) => {
  let values = '';
  for (const key in structure) {
    values += ` ${key} ${structure[key]},`;
  }
  values = values.substring(0, values.length - 1);
  const query = `CREATE TABLE IF NOT EXISTS ${table} (${values});`;
  console.log(query);
  return query;
};

export const generateQueryInsert = ({table, structure, values}) => {
  let column = '';
  let datas = '';
  let query = `INSERT INTO ${table} `;
  if (typeof values === 'object' && values !== null) {
    for (const key_v in values) {
      for (const key_s in structure) {
        if (key_v === key_s) {
          if (values[key_v]) {
            column += ` ${key_v},`;
            datas += ` '${values[key_v]}',`;
          }
        }
      }
    }
    column = ` (${column.substring(0, column.length - 1)}) `;
    datas = ` (${datas.substring(0, datas.length - 1)}) `;
    query += ` ${column} VALUES ${datas} `;
  }
  console.log(query);
  return query;
};

export const generateQueryUpdate = ({table, structure, values}) => {
  let val = '';
  let query = `UPDATE  ${table}`;
  for (const key_v in values) {
    for (const key_s in structure) {
      if (key_v === key_s) {
        if (values[key_v]) {
          val += ` ${key_v} = '${values[key_v]}',`;
        }
      }
    }
  }
  val = ` SET ${val.substring(0, val.length - 1)} WHERE id='${values.id}'`;
  query += ` ${val} `;
  console.log(query);
  return query;
};
