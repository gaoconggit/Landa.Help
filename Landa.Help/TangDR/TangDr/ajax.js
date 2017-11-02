function loadDoc(url, cFunction) {
    var data = new FormData();
    data.append('user', 'person');
    data.append('pwd', 'password');
    data.append('organization', 'place');
    data.append('requiredkey', 'key');


    var xhttp;
    var params = "lorem=ipsum&name=binny";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("POST", url, true);
    xhttp.send(data);
}
function myFunction(xhttp) {
    alert(xhttp.responseText);   
}