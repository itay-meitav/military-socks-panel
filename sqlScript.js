const { Client, Pool } = require("pg");
const fs = require("fs");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();



let socks = [
  "Rothco Coyote Brown Crew Socks",
  "Rothco Black Military Dress Socks",
  "Rothco Black Tube Socks",
  "Rothco Olive Drab Tube Socks",
  "Rothco Coyote Tube Socks",
  "Rothco Olive Drab Socks",
  "Rothco G.I. Type Irregular Cushion Sole Socks",
  "Rothco G.I. Type BLack Cushion Sole Sock US Made",
  "Rothco Olive Drab Cushion Sole Socks",
  "Rothco Khaki Cushion Sole Socks",
  "Rothco Coyote Brown Cushion Sole Socks",
  "Rothco Olive Drab Thermal Socks",
  "Rothco Moisture Wicking Military Sock",
  "Covert Threads Medium Rock Socks",
  "Rothco Mid Calf Military Boot Sock",
  "Fox River Military Stryker Sock",
  "Fox River  Tactical Boot Sock",
  "Fox River Sock Wick Dry Maximum",
  "Covert Threads Medium Ice Socks",
  "Covert Threads XLarge Ice Socks",
  "Fox River Military Cold Weather Sock",
  "Wigwam F Hot Weather BDU Pro Socks",
  "Fox River Military Fatigue Fighter Sock",
  "Rothco Coyote Brown Crew Socks",
  "Rothco Black Military Dress Socks",
  "Rothco Black Tube Socks",
  "Rothco Olive Drab Tube Socks",
  "Rothco Coyote Tube Socks",
  "Rothco Olive Drab Socks",
  "Rothco G.I. Type Irregular Cushion Sole Socks",
  "Rothco G.I. Type BLack Cushion Sole Sock US Made",
  "Rothco Olive Drab Cushion Sole Socks",
  "Rothco Khaki Cushion Sole Socks",
  "Rothco Coyote Brown Cushion Sole Socks",
  "Rothco Olive Drab Thermal Socks",
  "Rothco Moisture Wicking Military Sock",
  "Covert Threads Medium Rock Socks",
  "Rothco Mid Calf Military Boot Sock",
  "Fox River Military Stryker Sock",
  "Fox River  Tactical Boot Sock",
  "Fox River Sock Wick Dry Maximum",
  "Covert Threads Medium Ice Socks",
  "Covert Threads XLarge Ice Socks",
  "Fox River Military Cold Weather Sock",
  "Wigwam F Hot Weather BDU Pro Socks",
  "Fox River Military Fatigue Fighter Sock"
]


async function addSocksToDb() {
  await pool.query("DROP TABLE IF EXISTS socks");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS socks(
        id SERIAL PRIMARY KEY,
        model TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        size INTEGER NOT NULL,
        manufacturing_year DATE NOT NULL,
        CONSTRAINT location_id
            FOREIGN KEY(id)
                REFERENCES locations(id),
        CONSTRAINT officer_id
            FOREIGN KEY(id)
                REFERENCES officers(id)
    )`
  );

  let location_ids = (await pool.query('SELECT ARRAY_AGG(id) as ids from locations').then(res => res.rows[0].ids))
  let officers_ids = (await pool.query('SELECT ARRAY_AGG(id) as ids from officers').then(res => res.rows[0].ids))

}

async function addOfficersToDb() {
  await pool.query("DROP TABLE IF EXISTS officers");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS officers(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        army_id_number INTEGER NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL
    )`
  );
  let names = [
    'Valdimir',
    'Alex',
    'Maxim',
    'Mikhail',
    'Boris',
    'Demitri',
    'Igor',
    'Oleg'
  ]


  let params = names.map((name) => {

    let phone = generatePhoneNumber()
    let army_id_number = generateID()
    let email = name + '@wpra.ru'
    return [name, army_id_number, email, phone]

  })

  let index = 1;

  await pool.query(`INSERT INTO officers(name, army_id_number, email, phone) VALUES 
 ${params.map(() => `($${index++},$${index++},$${index++}),$${index++})`).join(', ')})`, params.flat())
}

async function addLocationsToDb() {
  // latitude and longitude - location coordinates
  let russian_cities = ['Sevastopol', 'Kursk', 'Surgut', 'Belgorod', 'Vladimir']

  await pool.query("DROP TABLE IF EXISTS locations");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS locations(
        id SERIAL PRIMARY KEY,
        lat INTEGER NOT NULL,
        lon INTEGER NOT NULL,
        base_name TEXT NOT NULL,
        nearest_city TEXT NOT NULL
    )`
  );

  let params = russian_cities.map((nearestCity) => {
    let baseName = nearestCity + '\'s base'
    let lon = generateRandomLong()
    let lat = generateRandomLat()
    return [
      nearestCity,
      baseName,
      lon, lat
    ]

  })
  let index = 1;

  await pool.query(`INSERT INTO locations(nearest_city, base_name, lon,lat) VALUES 
  ${params.map(() => `($${index++},$${index++},$${index++}),$${index++})`).join(', ')})`, params.flat())

}




async function addLocationsHistoryToDb() {
  await pool.query("DROP TABLE IF EXISTS locations_history");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS locations_history(
        id SERIAL PRIMARY KEY,
        arrival_date DATE NOT NULL,
        departure_date DATE NOT NULL,
        CONSTRAINT location_id
            FOREIGN KEY(id)
                REFERENCES locations(id),
        CONSTRAINT sock_id
            FOREIGN KEY(id)
                REFERENCES socks(id)
        )`
  );

  let location_ids = (await pool.query('SELECT ARRAY_AGG(id) as ids from locations').then(res => res.rows[0].ids))
  const socks_ids = await pool.query('SELECT ARRAY_AGG(id) as ids from socks').then(res => res.rows[0].ids)
  let params = location_ids.map(loc_id => {
    return getNRandromFromArr(socks_ids, Math.floor(socks_ids / 2)).map((sock_id) => {
      let departure_date = departureDate(new Date(1980, 0, 1), new Date(1990, 0, 1));
      let arrival_date = calcArrival(departure_date);
      return [arrival_date, departureDate, loc_id, sock_id]
    }).flat()
  }).flat()


  await pool.query(`INSERT INTO locations_history(arrival_date, departure_date, location_id, sock_id) VALUES 
 ${Array(location_ids.length * socks_ids.length).map(() => `($${index++},$${index++},$${index++}),$${index++})`).join(', ')}`, params.flat())


}

function getNRandromFromArr(arr = [], n = 0) {
  const result = []
  arr = [...arr]
  if (n > arr.length) {
    return arr
  }
  for (const i in Array(n)) {
    let index = Math.floor(Math.random() * arr.length)
    result.push(arr.splice(index, 1)[0])
    if (!arr.length) break
  }
  return result
}

function departureDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function calcArrival(departure_date) {
  const departureDate = departure_date.getTime();
  const oneWeek = new Date(departureDate + 7 * 24 * 60 * 60 * 1000);
  const twoWeeks = new Date(departureDate + 14 * 24 * 60 * 60 * 1000);
  const threeWeeks = new Date(departureDate + 21 * 24 * 60 * 60 * 1000);
  const calcNewDate = [oneWeek, twoWeeks, threeWeeks];
  const arrivalDate = Math.random() * calcNewDate.length;
  return arrivalDate;
}

// LONGITUDE -180 to + 180
function generateRandomLong() {
  var num = ((Math.random() * 180).toFixed(3)) * 1.0;
  var posorneg = Math.floor(Math.random() * 2);
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}
// LATITUDE -90 to +90
function generateRandomLat() {
  var num = (Math.random() * 90).toFixed(3) * 1.0;
  var posorneg = Math.floor(Math.random() * 2);
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}

function generatePhoneNumber() {
  let base = `+7(${generateID(3)})`
  let numbers = '1234567890'
  for (const i in Array(7)) {
    base += numbers[Math.floor(Math.random() * numbers.length)]
    if ([2, 4].includes(i)) base += '-'
  }
  return base
}


function generateID(length = 7) {
  let base = ''
  let numbers = '1234567890'
  for (const i in Array(length)) {
    base += numbers[Math.floor(Math.random() * numbers.length + i == 0 ? -1 : 0)]
  }
  return base
}


function getRandSize() {
  let sizes = [
    ''
  ]
}






