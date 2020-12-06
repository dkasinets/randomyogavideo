

function create_query_string(fields) {
    var query_string = "";

    for (idx in fields) {
        query_string += fields[idx].value + "+"
    }
    query_string += "easy";
    return query_string
}

function get_video(myJson) {
    console.log(myJson.urls);
    $("main").html(`<div class="embed-responsive embed-responsive-16by9" style="margin-bottom: 1.5rem;">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${myJson.urls[0]}?rel=0" allowfullscreen></iframe>
                    </div>
                    <p class="lead">
                        <button type="button" class="btn btn-danger btn-lg" onclick="window.location.reload();">Try again</button>
                    </p>`);
    $(".banner").html(`<img src="./images/celebration.jpg" class="img-fluid celebration" alt="Celebration">
                        <div class="bottom-right">
                            <a class="photo_author btn btn-link" href="https://unsplash.com/@nft" target="_blank">@nft</a>
                        </div>
                        <div class="centered_text">
                            <h1 class="cover-heading">Check it out!</h1>
                            <p class="lead cover-subheading">It's 2020. We're all stuck at home anyway.</p>
                        </div>`);
}

// https://www.youtube.com/watch?v=vWl5XcvQBx0
function get_api_data(query_string) {
    var endpoint = `http://exercise-video-returner.herokuapp.com/api-yt-links/?query=${query_string}`;
    
    console.log(endpoint)

    // add loader
    $(".boxLoading").html(`<div class="spinner_wrapper">
                                <div class="spinner-border text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div><span class="looking_text"> Looking for a video...</span>
                            </div>`);
    
    $(".boxLoading").addClass("loader_wrapper");
    $(".boxLoading").show();
    
    fetch(endpoint)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(function(myJson) {
        console.log(myJson);
        get_video(myJson);

        // hide loader
        $(".boxLoading").hide();
    })
    .catch((error) => {
        console.log(error)

        // hide loader
        $(".boxLoading").hide();
    });
}

// https://api.jquery.com/serializearray/
$( ".form" ).submit(function( event ) {
    event.preventDefault();
    
    var fields = $( this ).serializeArray();
    console.log( fields );
    var query_string = create_query_string(fields);
    console.log( query_string );
    get_api_data(query_string);

});