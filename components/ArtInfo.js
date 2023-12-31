
import { useState } from 'react';
import Image from 'next/image';
import alternateImage from '../public/images/No_Image_Available-1.jpg';

// Custom function to resolve external image URLs:
// (also, remotePatterns added to package.json to protect from malicious users)
const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


// Receives selected piece of art as argument, fetches that piece of art's information, stores it in state and displays on screen:

export default function ArtInfo ({selectedArt}) {
    const [artTitle, setArtTitle] = useState(null);
    const [artImage, setArtImage] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artDate, setArtDate] = useState('');
    const [artCulture, setArtCulture] = useState('');
    const [artURL, setArtURL] = useState('');

    const favoritesList = [];

    function handleFavoritesClick() {
        favoritesList.push([artTitle, artistName]);
        console.log(favoritesList);
    }


    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedArt}`)
                .then(res => res.json())

                .then(data => {
                    console.log(data)
                    setArtTitle(data.title)
                    setArtImage(data.primaryImageSmall)
                    setArtistName(data.artistDisplayName)
                    setArtDate(data.objectDate)
                    setArtCulture(data.culture)
                    setArtURL(data.objectURL)
                }) 

// conditionally rendering all info, except art title.
// conditionally renders Favorites button if art exists.
// Always renders Favorites list - which needs to be stored in MongoDB. 
// *for now, option to just view art (no login) will simply redirect to original project*

    return (
        <div>
            { selectedArt ? (
                <div>
                    <p>{artTitle}</p>
                    <>
                    {artistName ? (<p>Artist: {artistName}</p>) : (<p>Artist Unknown</p>)}
                    </>

                    <>
                    {artDate ? (<p>Date: {artDate}</p>) : ('')}
                    </>

                    <>
                    {artCulture ? (<p>Culture: {artCulture}</p>) : ('')}
                    </>

                    <>
                    {artURL ? (<p>Museum link: {artURL}</p>) : ('')     }
                    </>

                    <>
                    {
                        artImage ? (
                            <Image 
                            loader={imageLoader}
                            src={artImage} 
                            alt='picture of art'
                            width={300}
                            height={350} />
                            ) : (
                                <Image 
                                src={alternateImage} 
                                alt='no image available'
                                width={300}
                                height={300} />
                        )     
                    }
                    </>

                    <div>
                        <button onClick={handleFavoritesClick}>Add to Favorites</button>
                    </div>
                </div>

            ) : ('')}

            <div>
                {favoritesList.length > 0 ? (<p>yes</p>) : (<p>no Favorites</p>)}
            </div>
        </div>
    )
}