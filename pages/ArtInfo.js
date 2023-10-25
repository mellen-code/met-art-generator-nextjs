import { useState } from 'react';
import alternateImage from '../assets/No_Image_Available-1.jpg';


// Takes in selected piece of art, fetches that piece of art's information, stores it in state and displays in the DOM:

export default function ArtInfo ({selectedArt}) {
    const [artTitle, setArtTitle] = useState(null);
    const [artImage, setArtImage] = useState('');

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedArt}`)
                .then(res => res.json())

                .then(data => {
                    console.log(data)
                    setArtTitle(data.title)
                    setArtImage(data.primaryImageSmall)
                }) 

// went with html image, because there would be an infinite number of url paths to resolve in configuration (package.json file):

    return (
        <div>
            <p>{artTitle}</p>
            <img src={artImage} alt='picture of art' />
        </div>
    )
}