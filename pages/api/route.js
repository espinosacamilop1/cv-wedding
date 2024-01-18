export async function getGuests() {
    const res = await fetch('/api/guests', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }