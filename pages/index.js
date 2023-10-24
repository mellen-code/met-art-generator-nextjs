import { useState } from 'react';
import { useEffect } from 'react';

function Header({ title }) {
    return (
        <h1>{title ? title : 'Default title'}</h1>
    )
}

// TO FIX - get selectedArt data to display!. Got The error message "Objects are not valid as a React child" typically occurs when you try to render a JavaScript object directly as a child of a React component. In your case, it's likely happening because you're trying to render a promise (the result of an asynchronous operation) as a child component. Had to make sure I'm only rendering valid React component/arrays in JSX, not promises. So used useEffect and conditional rendering:
function ArtSearch({selectedArt}) {
    const [artInfo, setArtInfo] = useState(null);

    useEffect(() => {
        const fetchArtInfo = async() => {
            try {
                const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedArt}`)
                const result = await response.json();
                setArtInfo(result);
            } catch(error) {
                console.error('Error getting data', error);
            }
        };

        fetchArtInfo();
    }, []);

    return (
        <div>
            {artInfo ? (
                <p>{artInfo.title}</p>
            ) :
            (
                <p>Loading...</p>
            )}
        </div>
    );
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

            <ArtSearch 
                selectedArt={selectedArt}
            />

        </div>

    )
}



// export default function HomePage() {
//     const [selectedDeptID, setSelectedDeptID] = useState(0);
//     const [selectedArt, setSelectedArt] = useState(null);

//     // using unary plus to change the typeof option value from string to number when storing in state:
//     function handleChange(event) {
//         setSelectedDeptID(+event.target.value);
//     }

//     async function handleClick() {
//         console.log(selectedDeptID);
//         await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${selectedDeptID}&q=art`)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)

//                 let choice = data.objectIDs[Math.floor(Math.random()*(data.objectIDs.length))];
//                 setSelectedArt(choice);
//                 console.log(choice);

//  // TO FIX - get selectedArt data to display!
//                 fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedArt}`)
//                     .then(res => res.json())
    
//                     .then(data => {
//                         console.log(data)
//                     }) 
//             })
//     }

//     return (
//         <div>
//             <Header title='Met Museum Art Generator' />

//             <div>
//                 <select value={selectedDeptID} onChange={handleChange}>
//                     <option value='0'>Select Department</option>
//                     <option value='1'>American Decorative Arts</option>
//                     <option value='3'>Ancient Near Eastern Art</option>
//                     <option value='4'>Arms and Armor</option>

//                 </select>

//             </div>

//             <button onClick={handleClick}>View Art</button>

//         </div>

//     )
// }