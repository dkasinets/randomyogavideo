
function show_wait_text() {
    $("#wait_text").fadeIn();
}

function create_query_string(fields) {
    var query_string = "";

    for (idx in fields) {
        query_string += fields[idx].value + "+"
    }
    query_string += "easy";
    return query_string
}

function get_video(url_id) {
    console.log(url_id);
    $("main").html(`<div class="embed-responsive embed-responsive-16by9" style="margin-bottom: 1.5rem;">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${url_id}?rel=0" allowfullscreen></iframe>
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
                            <p class="lead cover-subheading">The purpose is to build strength in both the mind and body.</p>
                        </div>`);
}

// https://www.youtube.com/watch?v=vWl5XcvQBx0
function get_api_data(query_string) {
    // http://127.0.0.1:8000/api-yt-links/?query=
    var endpoint = `https://exercise-video-returner.herokuapp.com/api-yt-links/?query=${query_string}`;
    
    // console.log(endpoint)

    // add loader
    $(".boxLoading").html(`<div class="spinner_wrapper">
                                <div class="spinner-border text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div><span class="looking_text"> Looking for a video...</span><span style="display:none" class="wait_text" id="wait_text"><br>(patience is a virtue)</span>
                            </div>`);
    
    $(".boxLoading").addClass("loader_wrapper");
    $(".boxLoading").show();
    setTimeout(show_wait_text, 3000);
    
    fetch(endpoint)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(function(myJson) {
        
        var url_id = myJson.urls[0];
        get_video(url_id);

        // hide loader
        $(".boxLoading").hide();
    })
    .catch((error) => {
        console.error(error)
        // Error placeholder video 5 MIN STANDING YOGA STRETCH
        var url_id = "NMBuSMxrSaY"
        get_video(url_id);
        
        // hide loader
        $(".boxLoading").hide();
    });
}

// https://api.jquery.com/serializearray/
$( ".form" ).submit(function( event ) {
    event.preventDefault();
    
    var fields = $( this ).serializeArray();
    
    var query_string = create_query_string(fields);
    console.log( query_string );
    get_api_data(query_string);

});