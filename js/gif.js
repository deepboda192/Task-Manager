const gitapi = "bxqK6wfJwFjYKxBqoRISkErrvtlfAZlK"
function getGif() {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${gitapi}&limit=20`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let i = 0
            setInterval(() => {
                if (i == 20) {
                    i = 0
                }
                document.getElementById("myImg").src = data.data[i].embed_url;
                i++;
            }, 5000);
        })
}
getGif()