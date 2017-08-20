$('#get-address-btn').click(function (e) {
    e.preventDefault();

    $.post('/api/account/getAddress')
});

let autocomplete, placeSearch;

let componentForm = {
    sublocality: 'long_name',
    administrative_area: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('google-map-address')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    let place = autocomplete.getPlace();
    let sublocality = '';
    let administrativeArea = '';


    // for (let component in componentForm) {
    //     document.getElementById(component).value = '';
    //     document.getElementById(component).disabled = false;
    // }

    console.log(place);

    for(let i = 0; i< place.address_components.length; i++){
        let postal_code = place.address_components[i].types[0];

        console.log(postal_code);

        if(postal_code=== 'postal_code'){
            $('#postal_code').val(place.address_components[i].long_name)
        }
    }


    // // Get each component of the address from the place details
    // // and fill the corresponding field on the form.
    // for (let i = 0; i < place.address_components.length; i++) {
    //     let addressType = place.address_components[i].types[0];
    //     let sublocalityType = place.address_components[i].types[1];
    //     let curAddress = place.address_components[i]['long_name'] + ' ';
    //
    //     if(sublocalityType === 'sublocality'){
    //         sublocality += curAddress;
    //     }else if(addressType === 'administrative_area_level_1'){
    //         administrativeArea += curAddress;
    //     }else if (sublocalityType === 'country'){
    //         $('#country').val(curAddress)
    //     }else if(sublocalityType === 'postal_code'){
    //         $('#postal_code').val(curAddress);
    //     }
    //     // if (componentForm[addressType]) {
    //     //     let val = place.address_components[i][componentForm[addressType]];
    //     //     document.getElementById(addressType).value = val;
    //     // }
    // }
    //
    // $('#sublocality').val(sublocality.trim());
    // $('#administrative_area').val(administrativeArea.trim());
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            let circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}