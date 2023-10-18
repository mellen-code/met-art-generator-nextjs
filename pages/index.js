import { useState } from 'react';

function Header({ title }) {
    return (
        <h1>{title ? title : 'Default title'}</h1>
    )
}


export default function HomePage() {
    const [selectedDeptID, setSelectedDeptID] = useState(0);
    const [selectedArt, setSelectedArt] = useState(null);

    // using unary plus to change the typeof option value from string to number when storing in state:
    function handleChange(event) {
        setSelectedDeptID(+event.target.value);
    }

    async function handleClick() {
        console.log(selectedDeptID);
        await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${selectedDeptID}&q=art`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                let choice = data.objectIDs[Math.floor(Math.random()*(data.objectIDs.length))];
                setSelectedArt(choice);
                console.log(choice);
                showArt(selectedArt);
            })

    }

// TO FIX - get selectedArt data to display!
    async function showArt(selectedArt) {
        await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedArt}`)
                .then(res => res.json())
    
                .then(data => {
                    console.log(data)
            })
    }

    return (
        <div>
            <Header title='Met Museum Art Generator' />

            <div>
                <select value={selectedDeptID} onChange={handleChange}>
                    <option value='0'>Select Department</option>
                    <option value='1'>American Decorative Arts</option>
                    <option value='3'>Ancient Near Eastern Art</option>
                    <option value='4'>Arms and Armor</option>

                </select>

            </div>

            <button onClick={handleClick}>View Art</button>

        </div>


    )
}