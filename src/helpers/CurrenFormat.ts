export const currencyFormat = (value:number)=>{
    return new Intl.NumberFormat('en-US',{
        style: 'decimal',
        currency:'USD',
        minimumFractionDigits:2,
        maximumFractionDigits:2
    }).format(value);
}