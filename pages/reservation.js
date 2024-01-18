import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Reservation = () => {
  const router = useRouter();
  const [guestData, setGuestData] = useState(null);
  const [searchedGuest, setSearchedGuest] = useState('');
  const [foundGuest, setFoundGuest] = useState(null);
  
  useEffect(() => {
    const { guestList } = router.query;
    const { guestName } = router.query;

    if (guestList && guestName) {
      const data = JSON.parse(guestList);
      setGuestData(data);
      setSearchedGuest(guestName);


      router.replace('/reservation', undefined, { shallow: true });
    }
  }, [router.query]);

  useEffect(() => {
      if(guestData != null) {
          const filteredGuests = guestData.filter(family =>
              family.members.some(member => member.name === searchedGuest)
          );
      
          setFoundGuest(filteredGuests);
      }
  }, foundGuest)

  return (
    <div>
      <h2>Here is your reservation</h2>
       {foundGuest && foundGuest.length > 0 ? (
            <div>
                {foundGuest[0].members.map((member)=> {
                    return (
                        <div>
                            {member.name}
                        </div>
                    )
                })}
            </div>
       ) : (
        "Sorry no reservation was found"
       )}
    </div>
  );
};

export default Reservation;
