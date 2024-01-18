
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function FindReservation() {
    const [guests, setGuests] = useState(null);
    const [guestName, setGuestName] = useState('');
    const [filteredGuest, setFilteredGuest] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('/api/guests');
                const result = await response.json();
                setGuests(result.guests);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchGuests();
    }, []);


    // async function findGuest(guestName) {
    //     const filteredGuests = guestList.filter(family =>
    //         family.members.some(member => member.name === guestName)
    //     );

    //     setFilteredGuest(filteredGuests);
    // }

    const handleInputChange = (event) => {
        setGuestName(event.target.value);
    };

    const router = useRouter();

    const goToReservation = () => {
        // if(filteredGuest === null) {
        //     findGuest(guestName);
        // }

        // if (filteredGuest && filteredGuest.length > 0) {
        //     const firstFilteredGuest = filteredGuest[0];
        //     const guestObject = JSON.stringify(firstFilteredGuest);

            const guestList = JSON.stringify(guests);
            router.push({
                pathname: '/reservation',
                query: { guestName, guestList },
            });
        // }
    };

    return (
        <div>
            <input type="text" value={guestName} onChange={handleInputChange} />
            <button
                onClick={goToReservation}
            >
                Find Party
            </button>
        </div>
    );
}
