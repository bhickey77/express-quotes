$(document).ready(function(){
    populateQuotes();
    $('#submitQuote').on('click', function(){ 
        let body = {
            text: $('#quote').val(),
            author: $('#author').val(),
            image: $('#image').val()
        }
        $.ajax({
            method: 'POST',
            url: '/quotes',
            data: body
        })
        $('#quote').val('');
        $('#author').val('');
    });

    $('#refresh').on('click', populateQuotes)
    function populateQuotes(){
        $('#quotes').empty();
        $.ajax({
            method: 'GET',
            url: '/quotes'
        }).then((response) => {
            let quotes = response;
            console.log(quotes);        
            for(quote of quotes){
                $('#quotes').append(
                    `<div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${quote.image}" alt="Card image cap">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${quote.text}</p>
                                <footer class="blockquote-footer">${quote.author}</footer>
                            </blockquote>
                        </div>
                    </div>`
                )
            }
        });
    }


});

