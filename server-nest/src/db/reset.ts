import query from './index';

let socks = [
  'Rothco Coyote Brown Crew Socks',
  'Rothco Black Military Dress Socks',
  'Rothco Black Tube Socks',
  'Rothco Olive Drab Tube Socks',
  'Rothco Coyote Tube Socks',
  'Rothco Olive Drab Socks',
  'Rothco G.I. Type Irregular Cushion Sole Socks',
  'Rothco G.I. Type BLack Cushion Sole Sock US Made',
  'Rothco Olive Drab Cushion Sole Socks',
  'Rothco Khaki Cushion Sole Socks',
  'Rothco Coyote Brown Cushion Sole Socks',
  'Rothco Olive Drab Thermal Socks',
  'Rothco Moisture Wicking Military Sock',
  'Covert Threads Medium Rock Socks',
  'Rothco Mid Calf Military Boot Sock',
  'Fox River Military Stryker Sock',
  'Fox River  Tactical Boot Sock',
  'Fox River Sock Wick Dry Maximum',
  'Covert Threads Medium Ice Socks',
  'Covert Threads XLarge Ice Socks',
  'Fox River Military Cold Weather Sock',
  'Wigwam F Hot Weather BDU Pro Socks',
  'Fox River Military Fatigue Fighter Sock',
  'Rothco Coyote Brown Crew Socks',
  'Rothco Black Military Dress Socks',
  'Rothco Black Tube Socks',
  'Rothco Olive Drab Tube Socks',
  'Rothco Coyote Tube Socks',
  'Rothco Olive Drab Socks',
  'Rothco G.I. Type Irregular Cushion Sole Socks',
  'Rothco G.I. Type BLack Cushion Sole Sock US Made',
  'Rothco Olive Drab Cushion Sole Socks',
  'Rothco Khaki Cushion Sole Socks',
  'Rothco Coyote Brown Cushion Sole Socks',
  'Rothco Olive Drab Thermal Socks',
  'Rothco Moisture Wicking Military Sock',
  'Covert Threads Medium Rock Socks',
  'Rothco Mid Calf Military Boot Sock',
  'Fox River Military Stryker Sock',
  'Fox River  Tactical Boot Sock',
  'Fox River Sock Wick Dry Maximum',
  'Covert Threads Medium Ice Socks',
  'Covert Threads XLarge Ice Socks',
  'Fox River Military Cold Weather Sock',
  'Wigwam F Hot Weather BDU Pro Socks',
  'Fox River Military Fatigue Fighter Sock',
];

const sizes = [40, 42, 44, 46, 48];

async function dropAllTables() {
  await query('DROP TABLE IF EXISTS locations_history');
  await query('DROP TABLE IF EXISTS socks');
  await query('DROP TABLE IF EXISTS officers');
  await query('DROP TABLE IF EXISTS locations');
}

async function addSocksToDb() {
  await query(
    `CREATE TABLE IF NOT EXISTS socks(
          id SERIAL PRIMARY KEY,
          model TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          size INTEGER NOT NULL,
          manufacturing_year DATE NOT NULL,
          location_id INTEGER,
          FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE,
          officer_id INTEGER,
          FOREIGN KEY(officer_id) REFERENCES officers(id) ON DELETE CASCADE       
          )`,

    /*
          CONSTRAINT "fk_location"
              FOREIGN KEY(location_id)
                  REFERENCES locations(id)
                      ON DELETE CASCADE,
          CONSTRAINT "fk_officer"
              FOREIGN KEY(officer_id)
                  REFERENCES officers(id)
                      ON DELETE CASCADE
          */
  );

  let location_ids = await query(
    'SELECT ARRAY_AGG(id) as ids from locations',
  ).then((res) => res.rows[0].ids);
  let officer_ids = await query(
    'SELECT ARRAY_AGG(id) as ids from officers',
  ).then((res) => res.rows[0].ids);

  const params = socks.map((model) => {
    const quantity = Math.floor(Math.random() * 50 + 40);
    const size = getRandomNFromArr(sizes, 1)[0];
    const year = new Date(Math.floor(Math.random() * 10 + 1970) + '');
    const location_id = getRandomNFromArr(location_ids, 1)[0];
    const officer_id = getRandomNFromArr(officer_ids, 1)[0];
    return [model, quantity, size, year, location_id, officer_id];
  });
  let index = 1;

  const queryStr = `INSERT INTO socks(model, quantity, size, manufacturing_year, "location_id", "officer_id") VALUES 
   ${params
     .map(
       () =>
         `($${index++},$${index++},$${index++},$${index++},$${index++},$${index++})`,
     )
     .join(', ')}`;
  await query(queryStr, params.flat());
}

async function addOfficersToDb() {
  await query(`CREATE TABLE IF NOT EXISTS officers(
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          army_id_number TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL
      )`);
  let names = [
    'Valdimir',
    'Alex',
    'Maxim',
    'Mikhail',
    'Boris',
    'Demitri',
    'Igor',
    'Oleg',
  ];

  let params = names.map((name) => {
    let phone = generatePhoneNumber();
    let army_id_number = generateID(7);
    let email = name + '@wpra.ru';
    return [name, army_id_number, email, phone];
  });

  let index = 1;

  const queryStr = `INSERT INTO officers(name, army_id_number, email, phone) VALUES 
   ${params
     .map(() => `($${index++},$${index++},$${index++},$${index++})`)
     .join(', ')}`;
  await query(queryStr, params.flat());
}

async function addLocationsToDb() {
  // latitude and longitude - location coordinates
  let russian_cities = [
    'Sevastopol',
    'Kursk',
    'Surgut',
    'Belgorod',
    'Vladimir',
    'Arzamas',
    'Verkhoturye',
    'Belozersk',
    'Astrakhan',
  ];

  await query(
    `CREATE TABLE IF NOT EXISTS locations(
          id SERIAL PRIMARY KEY,
          lat DECIMAL NOT NULL,
          lon DECIMAL NOT NULL,
          base_name TEXT NOT NULL,
          nearest_city TEXT NOT NULL
      )`,
  );

  let params = russian_cities.map((nearestCity) => {
    let baseName = nearestCity + "'s base";
    let lon = Number(generateRandomLong());
    let lat = Number(generateRandomLat());
    return [nearestCity, baseName, lon, lat];
  });
  let index = 1;
  await query(
    `INSERT INTO locations(nearest_city, base_name, lon,lat) VALUES 
    ${params
      .map(() => `($${index++},$${index++},$${index++},$${index++})`)
      .join(', ')}`,
    params.flat(),
  );
}

async function addLocationsHistoryToDb() {
  await query(
    `CREATE TABLE IF NOT EXISTS locations_history(
          id SERIAL PRIMARY KEY,
          arrival_date DATE NOT NULL,
          departure_date DATE NOT NULL,
          location_id INTEGER,
          FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE,
          sock_id INTEGER,
          FOREIGN KEY(sock_id) REFERENCES socks(id) ON DELETE CASCADE
          )`,
    /*
           CONSTRAINT fk_location
              FOREIGN KEY(location_id)
                  REFERENCES locations(id)
                      ON DELETE CASCADE,
          CONSTRAINT fk_sock
              FOREIGN KEY(sock_id)
                  REFERENCES socks(id)
                      ON DELETE CASCADE
          */
  );

  let location_ids = await query(
    'SELECT ARRAY_AGG(id) as ids from locations',
  ).then((res) => res.rows[0].ids);
  const socks_ids = await query('SELECT ARRAY_AGG(id) as ids from socks').then(
    (res) => res.rows[0].ids,
  );
  let params = socks_ids
    .map((sock_id) => {
      return getRandomNFromArr(location_ids, 3)
        .map((loc_id) => {
          let departure_date = departureDate(
            new Date(1980, 0, 1),
            new Date(1990, 0, 1),
          );
          let arrival_date = calcArrival(departure_date);
          return [arrival_date, departure_date, loc_id, sock_id];
        })
        .flat();
    })
    .flat(5);
  let index = 1;

  await query(
    `INSERT INTO locations_history(arrival_date, departure_date, location_id, sock_id) VALUES 
   ${Range(socks_ids.length * 3)
     .map(() => `($${index++},$${index++},$${index++},$${index++})`)
     .join(', ')}`,
    params.flat(),
  );
}

function getRandomNFromArr(arr = [], n = 0) {
  const result = [];
  arr = [...arr];
  if (n > arr.length || n == 0) {
    return arr;
  }
  for (const i in Range(n)) {
    let index = Math.floor(Math.random() * arr.length);
    result.push(arr[index]);
    arr.splice(index, 1);
    if (!arr.length) break;
  }
  return result;
}

function departureDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function calcArrival(departure_date = new Date()) {
  const departureDate = Date.parse(departure_date.toISOString());
  const oneWeek = new Date(departureDate - 1 * 7 * 24 * 60 * 60 * 1000);
  const twoWeeks = new Date(departureDate - 2 * 7 * 24 * 60 * 60 * 1000);
  const threeWeeks = new Date(departureDate - 3 * 7 * 24 * 60 * 60 * 1000);
  const datesArr = [oneWeek, twoWeeks, threeWeeks];
  const index = Math.floor(Math.random() * datesArr.length);
  return datesArr[index];
}

// LONGITUDE -180 to + 180
function generateRandomLong() {
  var num = Number((Math.random() * 180 * 1.0).toFixed(3));
  var posorneg = Math.floor(Math.random() * 2);
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}
// LATITUDE -90 to +90
function generateRandomLat() {
  let num = Number((Math.random() * 90 * 1.0).toFixed(3));
  var posorneg = Math.floor(Math.random() * 2);
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}

function generatePhoneNumber() {
  let base = `+7(${generateID(3)})`;
  let numbers = '1234567890';
  for (const i in Range(7)) {
    base += numbers[Math.floor(Math.random() * numbers.length)];
    if ([2, 4].includes(Number(i))) base += '-';
  }
  return base;
}

function generateID(length = 7) {
  let base = '';
  let numbers = '1234567890';
  for (const i in Range(length)) {
    base +=
      numbers[
        Math.floor(Math.random() * (numbers.length + (Number(i) == 0 ? -1 : 0)))
      ];
  }
  return base;
}

function Range(length): number[] {
  return Array(length).fill(1);
}

export default async function initDB() {
  await dropAllTables();
  await addOfficersToDb();
  await addLocationsToDb();
  await addSocksToDb();
  await addLocationsHistoryToDb();
  console.log('done!');
}
