$(document).ready(function(){
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istarcoreMetamodel);
    ui.defineInteractions();

    if (typeof USE_REPOSITORY !== 'undefined' && USE_REPOSITORY !== null && USE_REPOSITORY) {
        $.ajax({
            type: "GET",
            url: PI_STAR_URL + "/version",
            success: function(response) {
                $('#shareModelButton').show();

                var url = new URL(window.location.href);

                if(url.searchParams.has("hash")){
                    var hash = url.searchParams.get("hash");
                    $.ajax({
                        type: "GET",
                        url: PI_STAR_URL + "/model/"+hash,
                        success: function(response) {
                            loadModelJson(response);
                        },
                        error: function(error){
                            console.log(error);
                            alert("Failed to load model. Please, check your URL");
                        }
                    });
                }

                console.log("PiStar Backend Version v"+response);
            },
            error: function(response){
                console.error("Error while retrieving backend informations. ");
                console.error(response)
            }
        });
    }else{
        examples.pistarIntro();
    }

    ui.setupUi();
});
