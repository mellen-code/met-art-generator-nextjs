import { useState } from 'react';

function Header({ title }) {
    return (
        <h1>{title ? title : 'Default title'}</h1>
    )
}

export default function HomePage() {
    const [selectedDept, setSelectedDept] = useState(0);

    function handleChange(event) {
        setSelectedDept(event.target.value);
    }

    function handleClick() {
        console.log(selectedDept);
    }

    return (
        <div>
            <Header title='Met Museum Art Generator' />

            <div>
                <select value={selectedDept} onChange={handleChange}>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="meat">Meat</option>

                </select>
            </div>

            

            <button onClick={handleClick}>Choose Department</button>

        </div>


    )
}