import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./currency";
import currencySymbols from "./currencySymbols";

$(document).ready(function() {
  $("#userInput").submit(function(event) {
    event.preventDefault();
    const currencyCode = $("#currencyChoice").val().toUpperCase();
    const dollarInput = $("#dollarAmount").val();
    $("#currencyChoice").val("");
    $("#dollarAmount").val("");
    $(".showErrors").text("");
    $(".exchangeResults").text('');
    let promise = Currency.getRate(currencyCode, dollarInput);
    promise
      .then(function (response) {
        const body = JSON.parse(response);
        const symbols = currencySymbols[currencyCode].symbol;
        $(".exchangeResults").text(`$${dollarInput} is equal to ${symbols}${body.conversion_result.toFixed(2)}`);
      })
      .catch(function(error) {
        const object = JSON.parse(error);
        $(".showErrors").text(`There was an error processing your request: ${object['error-type']}`);
      });
  });
});
