export default class Currency {
  static getRate(currencyCode, dollarInput) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/74db065fcbeb4b3b1189cb42/pair/USD/${currencyCode}/${dollarInput}`;
      console.log(url);
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}