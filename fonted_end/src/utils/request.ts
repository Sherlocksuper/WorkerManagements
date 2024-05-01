import exp from "constants";



const reque = () => {

    fetch('https://api.github.com/users/github')
        .then(response => response.json())
        .then(data => console.log(data));

}

export default reque