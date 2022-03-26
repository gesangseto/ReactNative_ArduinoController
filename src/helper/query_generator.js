export const generateQueryCreateTable = ({table, column, structure}) => {
  let values = '';
  let idx = 0;
  for (const it of column) {
    let type = Object.keys(structure)[idx];
    let len = structure[Object.keys(structure)[idx]];
    values += ` ${it} ${type}(${len}),`;
    idx += 1;
  }
  values = values.substring(0, values.length - 1);
  const query = `CREATE TABLE IF NOT EXISTS ${table} (${values});`;
  console.log(query);
  return query;
};

export const generateQueryInsert = ({table, column, values}) => {
  let col = '';
  for (const it of column) {
    col += ` ${it},`;
  }
  col = col.substring(0, col.length - 1);
  let query = `INSERT OR REPLACE INTO ${table} 
        (${col}) 
        values 
        ('', '1'),
        ('','');`;

  console.log(query);
};
