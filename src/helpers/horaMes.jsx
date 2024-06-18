import moment from 'moment';



// eslint-disable-next-line no-unused-vars
export const horaMes = (fecha) => {

    const hoyMes = moment(fecha);

    return hoyMes.format('HH:mm a | MMMM Do');


}