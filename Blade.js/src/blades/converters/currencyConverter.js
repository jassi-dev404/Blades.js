/**
 * Converts currency using approximate exchange rates
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {{convertedAmount: number, rate: number}} Converted amount and exchange rate
 */
export default function currencyConverter(amount, fromCurrency, toCurrency) {
  const rates = {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50,
    CNY: 7.24, CHF: 0.88, CAD: 1.36, AUD: 1.53, KRW: 1320.50,
    BRL: 4.97, MXN: 17.15, RUB: 92.50, ZAR: 19.05, SGD: 1.34,
    HKD: 7.82, NOK: 10.65, SEK: 10.55, DKK: 6.87, NZD: 1.63,
    THB: 35.50, MYR: 4.72, PHP: 55.80, IDR: 15500, PLN: 3.98,
    TRY: 30.25, AED: 3.67, SAR: 3.75, CZK: 22.60, HUF: 355,
    ILS: 3.65, CLP: 880, ARS: 350, COP: 3950, PEN: 3.72,
    VND: 24350, EGP: 30.90, PKR: 278, NGN: 780, BDT: 109.50,
    KES: 153, GHS: 12.10, UAH: 36.80, RON: 4.57, BGN: 1.80,
    HRK: 6.93, ISK: 137, TWD: 31.50, LKR: 307, MMK: 2100,
    MAD: 10.10, JOD: 0.71, QAR: 3.64, KWD: 0.31, BHD: 0.376,
    OMR: 0.385, UZS: 12350, TMT: 3.50, AZN: 1.70, GEL: 2.68,
    AMD: 403, KZT: 450, BYN: 3.27, MDL: 17.80, RSD: 108,
    ALL: 93.50, MKD: 56.70, BAM: 1.80, TND: 3.10, DZD: 135,
    LYD: 4.82, ANG: 1.79, XCD: 2.70, BBD: 2.00, JMD: 155,
    TTD: 6.78, BZD: 2.01, GTQ: 7.82, HNL: 24.70, NIO: 36.70,
    CRC: 520, PAB: 1.00, DOP: 57.50, UYU: 39.20, PYG: 7250,
    BOB: 6.91, SVC: 8.75, GYD: 209, SRD: 37.50, FKP: 0.79,
    GIP: 0.79, SHP: 0.79, JEP: 0.79, GGP: 0.79, IMP: 0.79,
    TJS: 10.90, KGS: 89.00, MNT: 3450, LAK: 20500, KHR: 4100,
    BND: 1.34, MOP: 8.06, AFN: 71.50, NAD: 19.05, BWP: 13.60,
    MUR: 45.50, SCR: 13.50, MWK: 1060, ZMW: 26.50, MZN: 63.80,
    AOA: 830, UGX: 3780, TZS: 2520, RWF: 1260, ETB: 55.80,
    SOS: 571, DJF: 177, ERN: 15.00, SDG: 601, SSP: 130,
    CDF: 2500, XOF: 603, XAF: 603, KMF: 453, MGA: 4480,
    BIF: 2850, SLL: 19750, LRD: 188, GMD: 64.50, GNF: 8600,
    CVE: 101.50, STN: 22.60, SBD: 8.35, TOP: 2.36, WST: 2.72,
    VUV: 119, FJD: 2.24, PGK: 3.75, NPG: 3.75, KYD: 0.833
  };

  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error(`Unsupported currency: ${!rates[fromCurrency] ? fromCurrency : toCurrency}`);
  }

  const rate = rates[toCurrency] / rates[fromCurrency];
  return {
    convertedAmount: parseFloat((amount * rate).toFixed(2)),
    rate: parseFloat(rate.toFixed(4))
  };
}
