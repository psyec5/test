// After install the supabase-js module
import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with database
const supabase = createClient('https://rivlpfbaigqiknwvmkds.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdmxwZmJhaWdxaWtud3Zta2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3Mjg2NDksImV4cCI6MjAzMDMwNDY0OX0.U4fJKuBZFR-HpIdh526VOHYIBkMdTRr2-ZLcCBJF47U')

// Fetch data from the table
async function fetchData() {

    // Get search input
    const regoInput = document.querySelector('.rego').value;
    const makeInput = document.querySelector('.make').value;
    const modelInput = document.querySelector('.model').value;
    const colourInput = document.querySelector('.colour').value;
    const ownerInput = document.querySelector('.owner').value;

    //Get input status tags
    const textContainer = document.getElementById('message');
    const p1 = textContainer.querySelector('p1');
    const p2 = textContainer.querySelector('p2');

    // Returns if any of the input bars are empty
    if (regoInput.trim() == '' || makeInput.trim() == '' || modelInput == '' || colourInput == '' || ownerInput == '') {
        console.log('Error fetching data');
        p1.style.display = 'none';
        p2.style.display = 'block';
        return;
    }


    // Define variables to store results
    let data = [];

    //Check if owner exists
    if (ownerInput.trim() !== '') {
        const { data: ownerData, error: ownerError } = await supabase
            .from('People')
            .select()
            .eq('Name', ownerInput);

        data = ownerData;
    }

    //if owner exists add details to database
    if (data.length != 0){
        console.log("Successfully added:",data[0].PersonID);

        const { addedData, error } = await supabase
        .from('Vehicles')
        .insert({ VehicleID: regoInput, Make: makeInput, Model: modelInput, Colour: colourInput, OwnerID: ownerInput})

        //display status message
        p1.style.display = 'block';
        p2.style.display = 'none';
        return;
    }
    //driver can't be found so prompted to add
    else{
        console.log("Cant find driver");
        p1.style.display = 'none';
        p2.style.display = 'none';

        //increase the height of elements and show add owner container
        const gridContainer = document.querySelector('.container');
        const container = document.getElementById('container');

        const main = gridContainer.querySelector('.main');
        const side = gridContainer.querySelector('.side');
        const addOwner = container.querySelector('.add-owner');
    
        main.style.height = '1100px';
        side.style.height = '1100px';
        addOwner.style.display = 'block';
        
        document.querySelector('#buttonAdd').addEventListener('click', addData);

        return;
    }


    }

//action listner
document.querySelector('#button1').addEventListener('click', fetchData);

//function to add Owner data to database
async function addData(){

    // Get all search input
    const idInput = document.querySelector('.personid1').value;
    const nameInput = document.querySelector('.name1').value;
    const addessInput = document.querySelector('.address1').value;
    const dobInput = document.querySelector('.dob1').value;
    const licenseInput = document.querySelector('.license1').value;
    const expireInput = document.querySelector('.expire1').value;

    const regoInput = document.querySelector('.rego').value;
    const makeInput = document.querySelector('.make').value;
    const modelInput = document.querySelector('.model').value;
    const colourInput = document.querySelector('.colour').value;
    const ownerInput = document.querySelector('.owner').value;

    //Get input status tags
    const textContainer1 = document.getElementById('message');
    const p1 = textContainer1.querySelector('p1');
    const p2 = textContainer1.querySelector('p2');

    // Returns if any of the input bars are empty
    if (idInput.trim() == '' || nameInput.trim() == '' || addessInput == '' || licenseInput == '' || expireInput == '' || dobInput == '') {
        console.log('Error: empty input');
        p1.style.display = 'none';
        p2.style.display = 'block';
        return;
    }
    else if (regoInput.trim() == '' || makeInput.trim() == '' || modelInput == '' || colourInput == '' || ownerInput == '') {
        console.log('Error fetching data');
        p1.style.display = 'none';
        p2.style.display = 'block';
        return;
    }

    //add people data
    const { addedData, error } = await supabase
    .from('People')
    .insert({ PersonID: idInput, Name: nameInput, Address: addessInput, DOB: dobInput, LicenseNumber: licenseInput, ExpiryDate: expireInput})

    //reassign the value of the OwnerID
    const ownerInput1 = idInput;

    //add vehicle data
    const { addData1, error1 } = await supabase
    .from('Vehicles')
    .insert({ VehicleID: regoInput, Make: makeInput, Model: modelInput, Colour: colourInput, OwnerID: ownerInput1})

    p1.style.display = 'block';
    p2.style.display = 'none';

}