// Environment utility functions

export function isMockMode(): boolean {
  const apiKey = process.env.COURSEDOG_API_KEY;
  const institutionId = process.env.COURSEDOG_INSTITUTION_ID;
  
  return (
    !apiKey ||
    apiKey === 'your_api_key_here' ||
    !institutionId ||
    institutionId === 'your_institution_id'
  );
}
