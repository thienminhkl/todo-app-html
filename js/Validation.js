function Validation() {
    this.checkEmpty = function (valueInput, spanId, message) {
        if (valueInput == "") {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;
        }
        document.getElementById(spanId).style.display = "none";
        document.getElementById(spanId).innerHTML = "";
        return true;
    }

}