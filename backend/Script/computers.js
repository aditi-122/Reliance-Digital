import { baseUrl } from "./baseUrl.js";
let data = fetch(baseUrl +"/computers")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    }
    )
    .catch(error => console.log(error));
    export { data };

    let displaydata = getElemtById ("")
