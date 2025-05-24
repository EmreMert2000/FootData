
export const fetchTeamSeasons = async (teamId: string): Promise<number[]> => {
  try {
    const response = await fetch(`https://v3.football.api-sports.io/teams/seasons?team=${teamId}`, {
      headers: {
        'x-apisports-key': 'Api_Key', // API-Football anahtarınızı buraya ekleyin
      },
    });

    if (!response.ok) throw new Error("Sezonlar alınamadı.");

    const data = await response.json();
    return data.response; // [2010, 2011, ...]
  } catch (error) {
    console.error("Sezon verisi hatası:", error);
    throw error;
  }
};