import moment from "moment";
import 'moment/locale/es'
export const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

// Parsear Fecha para poder ordenarla
export const convertDate = (fecha) => {
  // console.log(fecha);
  const time = new Date(fecha.seconds * 1000);
  // console.log(time);
  return time;
};

// Parsear Fecha con Moment en Español
export const formatDate=(item)=>{
  const date=convertDate(item.date)
  // console.log(date);
  const dateParsed=moment(date).locale('es').format('LL')
  // console.log(dateParsed);
  return dateParsed;
}