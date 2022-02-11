import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./currency";

$(document).ready(function() {
  $("#userInput").submit(function(event) {
    event.preventDefault();
    const currencyCode = $("#currencyChoice").val();
    const dollarInput = $("#dollarAmount").val();
    $("#currencyChoice").val("");
    $("#dollarAmount").val("");
    let promise = Currency.getRate(currencyCode, dollarInput);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $(".exchangeResults").text('');
      $(".exchangeResults").text(`The amount you entered is equal to ${body.conversion_result.toFixed(2)} ${currencyCode.toUpperCase()}`);
    })
      .catch(function(error) {
        $(".showErrors").text(`There was an error processing your request: ${error}`);
      });
  });
});
