function findEntity(query) {
  const lowerQuery = query.toLowerCase();
  for (const [entity, keywords] of Object.entries(ENTITY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return entity;
      }
    }
  }
  return 'unknown';
}

function findStatus(query) {
  const lowerQuery = query.toLowerCase();
  for (const [status, keywords] of Object.entries(STATUS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return status;
      }
    }
  }
  return undefined;
}

function findBuilding(query) {
  const lowerQuery = query.toLowerCase();
  for (const building of BUILDING_KEYWORDS) {
    if (lowerQuery.includes(building.toLowerCase())) {
      return building.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  const buildingMatch = query.match(/in\s+the?\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(?:building|hall|center)/i);
  if (buildingMatch) {
    return buildingMatch[1];
  }
  return undefined;
}

function findRoom(query) {
  const lowerQuery = query.toLowerCase();
  for (const pattern of ROOM_PATTERNS) {
    const match = lowerQuery.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }
  return undefined;
}

function findTimeRange(query) {
  const lowerQuery = query.toLowerCase();
  const result = {};
  const now = new Date();

  for (const [timeKey, keywords] of Object.entries(TIME_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) {
        switch (timeKey) {
          case 'today':
            result.startDate = now.toISOString().split('T')[0];
            result.endDate = result.startDate;
            break;
          case 'tomorrow':
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            result.startDate = tomorrow.toISOString().split('T')[0];
            result.endDate = result.startDate;
            break;
          case 'thisWeek':
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            result.startDate = startOfWeek.toISOString().split('T')[0];
            result.endDate = endOfWeek.toISOString().split('T')[0];
            break;
          case 'nextWeek':
            const startOfNextWeek = new Date(now);
            startOfNextWeek.setDate(now.getDate() - now.getDay() + 7);
            const endOfNextWeek = new Date(startOfNextWeek);
            endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
            result.startDate = startOfNextWeek.toISOString().split('T')[0];
            result.endDate = endOfNextWeek.toISOString().split('T')[0];
            break;
        }
        return result;
      }
    }
  }
  return result;
}

function calculateConfidence(query, filters, entity) {
  let score = 0;
  let maxScore = 2;
  if (entity !== 'unknown') score += 1;
  if (filters.status) { score += 0.5; maxScore += 0.5; }
  if (filters.building || filters.room) { score += 0.5; maxScore += 0.5; }
  if (filters.startDate || filters.endDate) { score += 0.5; maxScore += 0.5; }
  return Math.min(1, score / maxScore);
}

function parseNaturalLanguageQuery(query, context) {
  const filters = {};
  const detectedEntity = findEntity(query);
  const entity = context && context !== 'unknown' ? context : detectedEntity;

  const status = findStatus(query);
  if (status) filters.status = status;

  const building = findBuilding(query);
  if (building) filters.building = building;

  const room = findRoom(query);
  if (room) filters.room = room;

  const timeRange = findTimeRange(query);
  if (timeRange.startDate) filters.startDate = timeRange.startDate;
  if (timeRange.endDate) filters.endDate = timeRange.endDate;

  if (Object.keys(filters).length === 0 && query.trim()) {
    filters.query = query.trim();
  }

  const confidence = calculateConfidence(query, filters, entity);

  return { filters, entity, confidence };
}
